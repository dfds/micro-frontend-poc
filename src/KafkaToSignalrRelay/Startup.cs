using KafkaToSignalrRelay.KafkaClient;
using KafkaToSignalrRelay.RestApi;
using KafkaToSignalrRelay.SignalrHub;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
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
            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddRestApi();

            services.AddSignalrHub();

            var shouldStartKafkaConsumerHostedService =
                Configuration["KAFKA_TO_SIGNALR_RELAY_START_KAFKA_CONSUMER"] != "false";

            if (shouldStartKafkaConsumerHostedService)
            {
                services.AddKafkaClient();
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseCors(builder =>
            {
                builder.WithOrigins("http://127.0.0.1:8080")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();

                builder.WithOrigins("http://localhost:9011")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();

                builder.WithOrigins("http://localhost:9876")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
                
                builder.WithOrigins("http://localhost:3000")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
                
                builder.WithOrigins("https://backstage.dfds.cloud")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });

            app.AddRestApi(env);
            app.AddSignalrHub();
        }
    }
}