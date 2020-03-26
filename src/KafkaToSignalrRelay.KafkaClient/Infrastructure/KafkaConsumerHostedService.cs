using System;
using System.Threading;
using System.Threading.Tasks;
using Confluent.Kafka;
using KafkaToSignalrRelay.Domain.Features.Events;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace KafkaToSignalrRelay.KafkaClient.Infrastructure
{
    public class KafkaConsumerHostedService : IHostedService
    {
        private CancellationTokenSource _cancellationTokenSource;
        private readonly ILogger<KafkaConsumerHostedService> _logger;
        private readonly KafkaConsumerFactory _consumerFactory;
        private readonly IServiceProvider _serviceProvider;
        private readonly string[] topicNames;

        private Task _executingTask;

        public KafkaConsumerHostedService(
            ILogger<KafkaConsumerHostedService> logger,
            IServiceProvider serviceProvider,
            KafkaConsumerFactory kafkaConsumerFactory)
        {
            _logger = logger;
            _consumerFactory = kafkaConsumerFactory;
            _serviceProvider = serviceProvider;

            topicNames = new[] {"CAPABILITY_SERVICE_KAFKA_TOPIC_CAPABILITY"};
        }

        private async Task ConsumeKafkaMessages(CancellationToken cancellationToken)

        {
            IConsumer<string, string> consumer;

            try
            {
                consumer = _consumerFactory.Create();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to create kafka event consumer");
                return;
            }


            _logger.LogInformation(
                $"Event consumer started. Listening to topics: {string.Join(",", topicNames)}");

            consumer.Subscribe(topicNames);

            // consume loop
            while (cancellationToken.IsCancellationRequested == false)
            {
                ConsumeResult<string, string> msg;
                try
                {
                    msg = consumer.Consume(cancellationToken);
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Consumption of event failed, reason: {ex}");
                    continue;
                }

                using (var scope = _serviceProvider.CreateScope())
                {
                    _logger.LogInformation(
                        $"Received event: Topic: {msg.Topic} Partition: {msg.Partition}, Offset: {msg.Offset} {msg.Value}");

                    try
                    {
                        var eventSink =
                            scope.ServiceProvider.GetRequiredService<IEventSink>();

                        await eventSink.ReceiveEventAsync(msg.Value);
                        await Task.Run(() => consumer.Commit(msg), cancellationToken);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error consuming event.");
                    }
                }
            }
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _cancellationTokenSource = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
            _logger.LogInformation("Kafka event consumer starting");


            _executingTask = Task.Factory.StartNew(async () =>
                {
                    await ConsumeKafkaMessages(_cancellationTokenSource.Token);
                },
                _cancellationTokenSource.Token, 
                TaskCreationOptions.LongRunning, 
                TaskScheduler.Default
            )
            .ContinueWith(task =>
            {
                if (task.IsFaulted)
                {
                    _logger.LogError(task.Exception, "Event loop crashed");
                }
            }, cancellationToken);

            return Task.CompletedTask;
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            try
            {
                _cancellationTokenSource.Cancel();
            }
            finally
            {
                await Task.WhenAny(_executingTask, Task.Delay(-1, cancellationToken));
            }

            _cancellationTokenSource.Dispose();
        }
    }
}