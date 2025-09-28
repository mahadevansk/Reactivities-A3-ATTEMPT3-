using System;
using System.Text.Json;
using Application.Core;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;

namespace API.Middleware;

public class ExceptionMiddleware(ILogger<ExceptionMiddleware> logger, IHostEnvironment env) 
    : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            await HandleValidationException(context, ex);

        }

        catch (Exception ex)
        {
            await HandleException(context, ex);
            
        }
    }

    private async Task HandleException(HttpContext context, Exception ex)
    {
        logger.LogError(ex, ex.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;

        var response = env.IsDevelopment()
            ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace)
            : new AppException(context.Response.StatusCode, ex.Message, null);

        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

        var json = JsonSerializer.Serialize(response, options);

        await context.Response.WriteAsync(json);


    }

    private static async Task HandleValidationException(HttpContext context, ValidationException ex)
    {
        var validtionError = new Dictionary<string, string[]>();

        if (ex.Errors is not null)
        {
            foreach (var error in ex.Errors)
            {
                if (validtionError.TryGetValue(error.PropertyName, out var existingErrors))
                {
                    validtionError[error.PropertyName] = [.. existingErrors, error.PropertyName];
                }
                else
                {
                    validtionError[error.PropertyName] = [error.ErrorMessage]; // collection expression
                }
            }
        }

        context.Response.StatusCode = StatusCodes.Status400BadRequest;

        var validatonProblemDetails = new ValidationProblemDetails(validtionError)
        {
            Status = StatusCodes.Status400BadRequest,
            Type = "ValidationFailure",
            Title = "Validation Error",
            Detail = "One or more Validation erros has occured"


        };

        await context.Response.WriteAsJsonAsync(validatonProblemDetails);



    }
}
