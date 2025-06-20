using System;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActitivity
{
    public class Command : IRequest
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.Id], cancellationToken) ??
            throw new Exception("Cannot Find Activity");
            context.Remove(activity);
            await context.SaveChangesAsync(cancellationToken);
        }
    }

}
