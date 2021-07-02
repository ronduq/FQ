// <copyright file="SitemapController.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.App.Controllers
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using MoreLinq;
    using Teakorigin.App.Extentions;
    using Teakorigin.Business.Builder;
    using Teakorigin.DataAccess;
    using Teakorigin.Domain.Models;

    /// <summary>
    /// Sitemap file.
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Controller" />
    public class SitemapController : Controller
    {
        private readonly TeakOriginContext context;
        private readonly AppSettings appSettings;

        /// <summary>
        /// Initializes a new instance of the <see cref="SitemapController"/> class.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="appSettings">The application settings.</param>
        public SitemapController(TeakOriginContext context, AppSettings appSettings)
        {
            this.context = context;
            this.appSettings = appSettings;
        }

        /// <summary>
        /// Indexes this instance.
        /// </summary>
        /// <returns>Returns view.</returns>
        public IActionResult Index()
        {
            return this.View();
        }

        /// <summary>
        /// Sitemaps the asynchronous.
        /// </summary>
        /// <returns>Return sitemap.</returns>
        [Route("sitemap")]
        public async Task<ActionResult> SitemapAsync()
        {
            // Get the dataset
            var distListOfLocation = await this.context.Location.GroupBy(x => x.LocationCode)
                   .Select(grp => grp.Key)
                   .ToListAsync();

            var defaultModified = this.context.ScanData.MaxBy(x => x.MdScanDate).FirstOrDefault()?.MdScanDate;

            if (defaultModified == null)
            {
                defaultModified = DateTime.UtcNow;
            }

            var locationProducers = await this.context.GetValidProduceCodes();
            var locationRetailers = await this.context.LocationRetailer.ToListAsync();

            var sitemapBuilder = new SitemapBuilder();

            // default priorities and update frequency
            var defaultChangeFrequency = ChangeFrequency.Weekly;
            var defaultPriority = 0.7;

            // Add the statics URLS
            sitemapBuilder.AddUrl($"{this.appSettings.BaseUrl}", modified: defaultModified, defaultChangeFrequency, priority: 1.0);
            sitemapBuilder.AddUrl($"{this.appSettings.BaseUrl}/content/terms.html", modified: defaultModified, defaultChangeFrequency, 0.5);
            sitemapBuilder.AddUrl($"{this.appSettings.BaseUrl}/content/privacy.html", modified: defaultModified, defaultChangeFrequency, 0.5);

            // Add the dynamic content
            foreach (var locationCode in distListOfLocation)
            {
                // Produces
                sitemapBuilder.AddUrl($"{this.appSettings.BaseUrl}/{locationCode}/produce", modified: defaultModified, defaultChangeFrequency, defaultPriority);

                // Retailers ranked
                sitemapBuilder.AddUrl($"{this.appSettings.BaseUrl}/{locationCode}/retailers", modified: defaultModified, defaultChangeFrequency, priority: 1.0);

                // Best picks
                sitemapBuilder.AddUrl($"{this.appSettings.BaseUrl}/{locationCode}/produce/best-picks", modified: defaultModified, defaultChangeFrequency, priority: 1.0);

                foreach (var producerByLocation in locationProducers.Where(x => x.LocationCode == locationCode))
                {
                    // Trends over time (Produce)
                    sitemapBuilder.AddUrl($"{this.appSettings.BaseUrl}/{producerByLocation.LocationCode}/produce/{producerByLocation.ProduceCode}/trends", modified: defaultModified, defaultChangeFrequency, defaultPriority);

                    foreach (var retailerByLocation in locationRetailers.Where(x => x.LocationCode == locationCode))
                    {
                        // Produce profile
                        sitemapBuilder.AddUrl($"{this.appSettings.BaseUrl}/{locationCode}/produce/{producerByLocation.ProduceCode}/{retailerByLocation.RetailerCode}", modified: defaultModified, defaultChangeFrequency, priority: 1.0);

                        // Single Store Profile
                        sitemapBuilder.AddUrl($"{this.appSettings.BaseUrl}/{locationCode}/retailers/{retailerByLocation.RetailerCode}", modified: defaultModified, defaultChangeFrequency, defaultPriority);

                        // Trends over time (Retailer)
                        sitemapBuilder.AddUrl($"{this.appSettings.BaseUrl}/{locationCode}/retailers/{retailerByLocation.RetailerCode}/trends", modified: defaultModified, defaultChangeFrequency, defaultPriority);
                    }
                }
            }

            // generate the sitemap xml
            string xml = sitemapBuilder.ToString();
            return this.Content(xml, "text/xml");
        }
    }
}
