using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using KafkaToSignalrRelay.Domain.Features.Events;
namespace KafkaToSignalrRelay.RestApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly IEventSink _enventSink;

        public EventsController(IEventSink enventSink)
        {
            _enventSink = enventSink;
        }

        [HttpPost]
        public async Task<ActionResult> AddEvent([FromBody] object @event)
        {
            await _enventSink.ReceiveEvent(@event);
            return Ok(@event);
        }
    }
}