using System;
using System.Runtime.CompilerServices;
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateActivityDto ActivityDto { get; set; }


    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<String>>
    {

    
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            
            var activity = mapper.Map<Activity>(request.ActivityDto);

            context.Activities.Add(activity);
            var result = await context.SaveChangesAsync(cancellationToken) > 0 ;
            // If we didn't 

            if (!result) return Result<string>.Failure("Failure to Create the activity", 400);

            return Result<string>.Success(activity.Id);
        }
    }

}
