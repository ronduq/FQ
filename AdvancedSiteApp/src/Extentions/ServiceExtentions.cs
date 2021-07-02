// <copyright file="ServiceExtentions.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>
namespace Teakorigin.Advanced.App.Extentions
{
    using System;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Options;
    using Teakorigin.Domain.Models;
    using static Teakorigin.Domain.Models.AppSettings;

    /// <summary>
    /// Service Extentions.
    /// </summary>
    public static class ServiceExtentions
    {
        /// <summary>
        /// The configure poco.
        /// </summary>
        /// <typeparam name="TConfig">The type of the configuration.</typeparam>
        /// <param name="services">The services.</param>
        /// <param name="configuration">The configuration.</param>
        /// <param name="pocoProvider">The poco provider.</param>
        /// <returns>returns poco from config.
        /// </returns>
        /// <exception cref="System.ArgumentNullException">
        /// services
        /// or
        /// configuration
        /// or
        /// pocoProvider.
        /// </exception>
        /// <exception cref="ArgumentNullException"> returns exception.</exception>
        public static TConfig ConfigurePoco<TConfig>(this IServiceCollection services, IConfiguration configuration, Func<TConfig> pocoProvider)
            where TConfig : class
        {
            if (services == null)
            {
                throw new ArgumentNullException(nameof(services));
            }

            if (configuration == null)
            {
                throw new ArgumentNullException(nameof(configuration));
            }

            if (pocoProvider == null)
            {
                throw new ArgumentNullException(nameof(pocoProvider));
            }

            var config = pocoProvider();
            configuration.Bind(config);
            services.AddSingleton(config);
            return config;
        }

        /// <summary>
        /// Configures the distributed cache.
        /// </summary>
        /// <param name="services">The services.</param>
        /// <param name="appSettingsOptions">The application settings options.</param>
        /// <param name="connectionStringOptions">The connection string options.</param>
        /// <exception cref="ArgumentNullException">services or appSettingsOptions.</exception>
        public static void AddDistributedCache(
            this IServiceCollection services,
            Action<AppSettings> appSettingsOptions,
            Action<ConnectionString> connectionStringOptions)
        {
            if (services == null)
            {
                throw new ArgumentNullException(nameof(services));
            }

            if (appSettingsOptions == null)
            {
                throw new ArgumentNullException(nameof(appSettingsOptions));
            }

            services.Configure<ConnectionString>(connectionStringOptions);
            var connectionString = services.BuildServiceProvider().GetService<IOptionsMonitor<ConnectionString>>();

            services.Configure<AppSettings>(appSettingsOptions);
            var appSettings = services.BuildServiceProvider().GetService<IOptionsMonitor<AppSettings>>();

            // UseDistributedSqlServerCache if enable
            if (appSettings.CurrentValue.CacheConfig.UseDistributedSqlServerCache)
            {
                services.AddDistributedSqlServerCache(o =>
                {
                    o.ConnectionString = connectionString.CurrentValue.DefaultConnection;
                    o.SchemaName = "dbo";
                    o.TableName = appSettings.CurrentValue.CacheConfig.DbCacheTable;
                });
            }
            else
            {
                services.AddDistributedMemoryCache();
            }
        }
    }
}
