using System;
using System.Threading.Tasks;
using KafkaToSignalrRelay.Domain.Features.Events;

namespace KafkaToSignalrRelay
{
    public class ConsoleEventSink : IEventSink
    {
        public Task ReceiveEventAsync(object @event)
        {
            Console.WriteLine(@event);
            
            return Task.CompletedTask;
        }
    }
}