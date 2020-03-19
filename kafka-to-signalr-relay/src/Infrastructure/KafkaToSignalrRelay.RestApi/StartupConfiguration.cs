using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace KafkaToSignalrRelay.RestApi
{
    public static class StartupConfiguration
    {
        public static void AddRestApi(this IServiceCollection services)
        {
            services.AddControllers();
        }
        
        public static void AddRestApi(this IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseRouting();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}