using System;
using Xunit;

namespace KafkaToSignalrRelay.IntegrationTests.Scenarios
{
    public class RestToSignalr
    {
        private SignalrClient.SignalrClient _signalrClient;

        [Fact]
        public void RestToSignalrRecipe()
        {
            GivenASignalrClient();
            AndARestClient();
            WhenAEventIsPostedToTheRestEndpoint();
            ThenTheEventIsPublishedOnSignalr();
        }

        private void GivenASignalrClient()
        {
            _signalrClient = new SignalrClient.SignalrClient(new Uri("http://localhost:5000/events/signalr-hub"));
        }

        private void AndARestClient()
        {
            throw new System.NotImplementedException();
        }

        private void WhenAEventIsPostedToTheRestEndpoint()
        {
            throw new System.NotImplementedException();
        }

        private void ThenTheEventIsPublishedOnSignalr()
        {
            throw new System.NotImplementedException();
        }
    }
}