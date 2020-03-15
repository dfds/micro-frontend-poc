using System.Threading.Tasks;

namespace KafkaToSignalrRelay.Domain.Features.Events
{
    public interface IEventSink
    {
        Task ReceiveEvent(object @event);
    }
}