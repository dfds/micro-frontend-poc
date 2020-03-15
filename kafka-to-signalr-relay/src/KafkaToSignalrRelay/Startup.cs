using KafkaToSignalrRelay.Domain.Features.Events;
using KafkaToSignalrRelay.RestApi;
using KafkaToSignalrRelay.SignalrHub;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace KafkaToSignalrRelay
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddRestApi();
            
            services.AddSignalrHub();

            services.AddSingleton<IEventSink>(new ConsoleEventSink());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.AddRestApi(env);

            app.AddSignalrHub();
        }
    }
}