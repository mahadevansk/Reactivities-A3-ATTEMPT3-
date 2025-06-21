using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        // ? means optional 

        private IMediator? _mediator;

        // ?? means if this left _mediator is null then whatever we get from the right side assignthat to _mediator

        protected IMediator Mediator => _mediator ??=
         HttpContext.RequestServices.GetService<IMediator>()
         ?? throw new InvalidOperationException("IMediator service is unavailable");
    }
}
