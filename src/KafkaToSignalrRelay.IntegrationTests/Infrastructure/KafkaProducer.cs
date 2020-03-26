using System;
using System.Threading.Tasks;
using Confluent.Kafka;

namespace KafkaToSignalrRelay.IntegrationTests.Infrastructure
{
    public class KafkaProducer
    {
        private readonly string _bootstrapServerUrl;
        private const string TOPIC_NAME = "CAPABILITY_SERVICE_KAFKA_TOPIC_CAPABILITY";

        public KafkaProducer(string bootstrapServerUrl)
        {
            _bootstrapServerUrl = bootstrapServerUrl;
        }

        public async Task ProduceAsync(string key, string value)
        {
            var config = new ProducerConfig {BootstrapServers = _bootstrapServerUrl};
            var builder = new ProducerBuilder<string, string>(config);
            builder.SetErrorHandler((producer, error) => throw new Exception(error.Reason));

            using (var producer = builder.Build())
            {
                await producer.ProduceAsync(
                        topic: TOPIC_NAME,
                        message: new Message<string, string>
                        {
                            Key = key,
                            Value = value
                        }
                    );
            }
        }
    }
}