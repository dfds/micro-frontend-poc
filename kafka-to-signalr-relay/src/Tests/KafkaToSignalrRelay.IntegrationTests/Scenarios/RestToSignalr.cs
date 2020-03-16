using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using KafkaToSignalrRelay.IntegrationTests.Infrastructure;
using Xunit;

namespace KafkaToSignalrRelay.IntegrationTests.Scenarios
{
    public class RestToSignalr
    {
        private SignalrClient _signalrClient;
        private RestClient _restClient;

        [Fact]
        public async Task RestToSignalrRecipe()
        {
                  GivenASignalrClient();
                  AndARestClient();
            await WhenAEventIsPostedToTheRestEndpoint(); 
            await ThenTheEventIsPublishedOnSignalr();
        }

        private void GivenASignalrClient()
        {
            _signalrClient = new SignalrClient(new Uri("http://localhost:5000/events/signalr-hub"));
        }

        private void AndARestClient()
        {
            _restClient = new RestClient(new Uri("http://localhost:5000/"));
        }

        private async Task WhenAEventIsPostedToTheRestEndpoint()
        {
            var @event = new
            {
                Time = DateTime.Now.ToString("s")
            };
            await _restClient.PostEventAsync(@event);
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