using System;
using System.Collections.Generic;
using System.Linq;
using Confluent.Kafka;
using Microsoft.Extensions.Configuration;

namespace KafkaToSignalrRelay.KafkaClient.Infrastructure
{
    public class KafkaConfiguration
    {
        private const string KEY_PREFIX = "KAFKA_TO_SIGNALR_RELAY_KAFKA_";
        private readonly IConfiguration _configuration;

        public KafkaConfiguration(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public ConsumerConfig GetConsumerConfiguration()
        {
            var configurations = GetConsumerConfigFromEnvironment();
            configurations.Add("request.timeout.ms", "3000");

            return new ConsumerConfig(configurations);
        }

        public Dictionary<string, string> GetConsumerConfigFromEnvironment()
        {
            var configurationKeys = new[]
            {
                "group.id",
                "enable.auto.commit",
                "bootstrap.servers",
                "broker.version.fallback",
                "api.version.fallback.ms",
                "ssl.ca.location",
                "sasl.username",
                "sasl.password",
                "sasl.mechanisms",
                "security.protocol",
            };

            var configurations = configurationKeys
                .Select(key => GetConfiguration(key))
                .Where(pair => pair != null)
                .Select(pair => new KeyValuePair<string, string>(pair.Item1, pair.Item2))
                .ToList();


            return new Dictionary<string, string>(configurations);
        }

        private Tuple<string, string> GetConfiguration(string keyName)
        {
            var combinedKeyName = KEY_PREFIX + keyName.ToUpper().Replace('.', '_');
            var value = _configuration[combinedKeyName];

            return string.IsNullOrWhiteSpace(value) ? null : Tuple.Create<string, string>(keyName, value);
        }
    }
}