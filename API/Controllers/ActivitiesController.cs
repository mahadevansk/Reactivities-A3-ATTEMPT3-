using System;
using Application.Activities.Commands;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    // private readonly AppDbContext context;

    // public ActivitiesController////(AppDbContext context)
    // {
    // this.context = context;
    //   }

    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        // return //await context.Activities.ToListAsync();
        return await Mediator.Send(new GetActivityList.Query());

    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Domain.Activity>> GetActivityDetail(string id)
    {
        //var activity = await context.Activities.FindAsync(id);

        var activity = await Mediator.Send(new GetActivitiesDetails.Query { Id = id });
        // if (activity == null)
        //     return NotFound();

        return activity;

    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(Activity activity)
    {
        return await Mediator.Send(new CreateActivity.Command { Activity = activity });
    }

    [HttpPut]
    public async Task<ActionResult> EditActivity(Activity activity)
    {
        await Mediator.Send(new EditActivity.Command { Activity = activity });
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        await Mediator.Send(new DeleteActitivity.Command { Id = id });
        return Ok();
    }

}
