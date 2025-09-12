using Application.Activities.Queries;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Migrations;
using FluentValidation;
using Application.Activities.Commands;
using Application.Activities.Validators;
using API.Middleware;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddCors();

builder.Services.AddMediatR(x =>
{
    x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
    x.AddOpenBehavior(typeof(ValidationBehavior<,>));

});


builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
//Transient Services. 
builder.Services.AddTransient<ExceptionMiddleware>();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
var app = builder.Build();

// Middlwares. 

app.UseMiddleware<ExceptionMiddleware>();


app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3000", "http://localhost:3000"));

// Configure the HTTP request pipeline.
app.MapControllers();



using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    await DBInitializer.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An Error occured in Migration");

}

app.Run();
