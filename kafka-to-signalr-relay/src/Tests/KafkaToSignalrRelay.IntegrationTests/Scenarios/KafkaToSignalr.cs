using System;
using System.Linq;
using System.Threading.Tasks;
using KafkaToSignalrRelay.IntegrationTests.Infrastructure;
using Xunit;

namespace KafkaToSignalrRelay.IntegrationTests.Scenarios
{
    public class KafkaToSignalr
    {
        private SignalrClient _signalrClient;
        private KafkaProducer _kafkaProducer;

        [Fact]
        public async Task KafkaToSignalrRecipe()
        {
                    GivenASignalrClient();
                    AndAKafkaProducer();
            await   WhenEventIsEmittedOnKafkaTopic();
            await   ThenTheEventIsPublishedOnSignalr();
        }

        private void GivenASignalrClient()
        {
            _signalrClient = new SignalrClient(new Uri("http://localhost:5000/events/signalr-hub"));
        }

        private void AndAKafkaProducer()
        {
            _kafkaProducer = new KafkaProducer("127.0.0.1:9092");
        }

        private async Task WhenEventIsEmittedOnKafkaTopic()
        {
            await _kafkaProducer.ProduceAsync("key","value");
        }

        private async Task ThenTheEventIsPublishedOnSignalr()
        {
            var events = await TimeElapsed.DoForTimespanOrNotNull(
                timeSpan:TimeSpan.FromSeconds(3),
                function:async () => 
                    _signalrClient.Events.Any() ? 
                        _signalrClient.Events : 
                        null
            );

            Assert.NotEmpty(events);
        }
    }
}