using System.Threading.Tasks;

namespace KafkaToSignalrRelay.Domain.Features.Events
{
    public interface IEventSink
    {
        Task ReceiveEventAsync(object @event);
    }
}