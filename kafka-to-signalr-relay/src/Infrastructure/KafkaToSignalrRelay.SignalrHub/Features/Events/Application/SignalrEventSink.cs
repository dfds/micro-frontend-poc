using System.Threading.Tasks;
using KafkaToSignalrRelay.Domain.Features.Events;
using KafkaToSignalrRelay.SignalrHub.Features.Events.Infrastructure;
using Microsoft.AspNetCore.SignalR;

namespace KafkaToSignalrRelay.SignalrHub.Features.Events.Application
{
    public class SignalrEventSink : IEventSink
    {
        private readonly IHubContext<EventsHub> _hubContext;

        public SignalrEventSink(IHubContext<EventsHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task ReceiveEventAsync(object @event)
        {
            await _hubContext.Clients.All.SendAsync("ReceiveMessage", @event);
        }
    }
}