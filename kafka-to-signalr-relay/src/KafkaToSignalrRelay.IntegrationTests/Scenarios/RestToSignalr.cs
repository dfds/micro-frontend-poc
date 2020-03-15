using Xunit;

namespace KafkaToSignalrRelay.IntegrationTests.Scenarios
{
    public class RestToSignalr
    {
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
            throw new System.NotImplementedException();
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