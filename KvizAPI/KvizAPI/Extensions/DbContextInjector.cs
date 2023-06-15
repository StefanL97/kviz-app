using KvizAPI.Context;
using KvizAPI.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace KvizAPI.Extensions
{
    public static class DbContextInjector
    {
        public static IServiceCollection InjectDbContext(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContext<QuizDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")))
                .AddIdentityCore<ApplicationUser>(options =>
                {
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireDigit = false;
                })
                .AddEntityFrameworkStores<QuizDbContext>();
            return services;
        }
    }
}
