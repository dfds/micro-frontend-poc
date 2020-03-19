using KafkaToSignalrRelay.KafkaClient;
using KafkaToSignalrRelay.RestApi;
using KafkaToSignalrRelay.SignalrHub;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace KafkaToSignalrRelay
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddRestApi();

            services.AddSignalrHub();

            var shouldStartKafkaConsumerHostedService =
                Configuration["KAFKA_TO_SIGNALR_RELAY_START_KAFKA_CONSUMER"] != "false";

            if (shouldStartKafkaConsumerHostedService)
            {
                services.AddKafkaClient();
            }

            services.AddCors(options => options.AddPolicy("CorsPolicy",
                builder =>
                {
                    builder.AllowAnyMethod().AllowAnyHeader()
                        .WithOrigins("http://127.0.0.1:8080")
                        .AllowCredentials();
                }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.AddRestApi(env);

            app.AddSignalrHub();
        }
    }
}