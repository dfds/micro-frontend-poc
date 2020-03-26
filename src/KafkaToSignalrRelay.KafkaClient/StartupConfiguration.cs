using KafkaToSignalrRelay.KafkaClient.Infrastructure;
using Microsoft.Extensions.DependencyInjection;

namespace KafkaToSignalrRelay.KafkaClient
{
    public static class StartupConfiguration
    {
        public static void AddKafkaClient(this IServiceCollection services)
        {
            services.AddHostedService<KafkaConsumerHostedService>();
            services.AddTransient<KafkaConfiguration>();
            services.AddTransient<KafkaConsumerFactory>();
        }
    }
}