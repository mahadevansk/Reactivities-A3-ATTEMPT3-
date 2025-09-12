using System;
using MediatR;
using Persistence;
using Application.Core;

namespace Application.Activities.Commands;

public class DeleteActitivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.Id], cancellationToken);

            if (activity is null) return Result<Unit>.Failure("Activity Not Found", 404);


            context.Remove(activity);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failure to delete the activity", 400);

            return Result<Unit>.Success(Unit.Value);
            
        }
    }

}
