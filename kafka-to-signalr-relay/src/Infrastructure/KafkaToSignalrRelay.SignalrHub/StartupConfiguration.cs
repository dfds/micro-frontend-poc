using KafkaToSignalrRelay.SignalrHub.Features.Events.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace KafkaToSignalrRelay.SignalrHub
{
    public static class StartupConfiguration
    {
        public static void AddSignalrHub(this IServiceCollection services)
        {
            services.AddSignalR();
        }
        
        public static void AddSignalrHub(this IApplicationBuilder app)
        {
            app.UseEndpoints(endpoints => { endpoints.MapHub<EventsHub>("/events/signalr-hub"); });
        }
    }
}