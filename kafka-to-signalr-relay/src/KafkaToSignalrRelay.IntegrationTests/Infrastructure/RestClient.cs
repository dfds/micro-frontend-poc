using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace KafkaToSignalrRelay.IntegrationTests.Infrastructure
{
    public class RestClient
    {
        private readonly Uri _restBaseUrl;

        public RestClient(Uri restBaseUrl)
        {
            _restBaseUrl = restBaseUrl;
        }

        public async Task PostEventAsync(object @event)
        {
            var httpClient = new HttpClient();
            httpClient.BaseAddress = _restBaseUrl;
                
            var payload = JsonConvert.SerializeObject(@event);

            var content = new StringContent(
                payload,
                Encoding.UTF8,
                "application/json"
            );

            await httpClient.PostAsync(
                new Uri("/events", UriKind.Relative),
                content
            );
        }
    }
}