using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
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


       return HandleResult(await Mediator.Send(new GetActivitiesDetails.Query { Id = id }));
        // if (activity == null)
        //     return NotFound();

    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto)
    {
        return HandleResult(await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto }));
    }

    [HttpPut]
    public async Task<ActionResult> EditActivity(EditActivityDto activity)
    {
        return HandleResult (await Mediator.Send(new EditActivity.Command { ActivityDto = activity }));
    
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        return HandleResult(await Mediator.Send(new DeleteActitivity.Command { Id = id }));

    }

}
