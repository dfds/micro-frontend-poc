using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace KafkaToSignalrRelay.RestApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventsController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> AddEvent([FromBody] object @event)
        {
            Console.WriteLine(@event);

            return Ok(@event);
        }
    }
}