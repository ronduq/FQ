// <copyright file="ContextExtentions.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>
namespace Teakorigin.App.Extentions
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Caching.Distributed;
    using Microsoft.Extensions.Caching.Memory;
    using MoreLinq;
    using Teakorigin.App.Constants;
    using Teakorigin.App.Extensions;
    using Teakorigin.Business.SqlBuilder;
    using Teakorigin.DataAccess;
    using Teakorigin.Domain.Model;

    /// <summary>
    /// Context Extentions.
    /// </summary>
    public static class ContextExtentions
    {
        /// <summary>
        /// Gets the scan data.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="location">The location.</param>
        /// <param name="produceCodes">The produce codes.</param>
        /// <param name="fromDate">From date.</param>
        /// <param name="toDate">To date.</param>
        /// <param name="cache">The cache.</param>
        /// <returns>Retailer ranks. Also cached if required.</returns>
        public static async Task<List<RetailerRanks>> GetScanData(this TeakOriginContext context, string location, string produceCodes, DateTime fromDate, DateTime toDate, IDistributedCache cache)
        {
            var cacheKey = $"scandata-{location}-{produceCodes}-{fromDate.ToLongDateString()}-{toDate.ToLongDateString()}";

            var cacheMaxdate = await cache.GetAsync<List<RetailerRanks>>(cacheKey).ConfigureAwait(false);

            if (cacheMaxdate == null)
            {
                var scans = await new RetailerRankBuilder(context, location, fromDate, toDate, produceCodes).Finalise().GetRetailerRanks().ConfigureAwait(false);

                cacheMaxdate = await cache.GetOrCreateAsync(cacheKey, scans).ConfigureAwait(false);
            }

            return cacheMaxdate;
        }

        /// <summary>
        /// Gets the maximum scan date weekend.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="location">The location.</param>
        /// <param name="cache">The cache.</param>
        /// <returns>
        /// Returns Weekend of the Maximum scan date.
        /// </returns>
        public static DateTime GetMaxScanDateWeekend(this TeakOriginContext context, string location, IDistributedCache cache)
        {
            var cacheKey = CacheKeys.MaxDate + location;

            var cacheMaxdate = cache.GetString(cacheKey);

            if (cacheMaxdate == null)
            {
                var maxDate = context.ScanData.Where(x => x.MdLocationCode == location).MaxBy(x => x.MdScanDate).FirstOrDefault().MdScanDate;

                if (maxDate.DayOfWeek == DayOfWeek.Friday)
                {
                    maxDate = maxDate.AddDays(1);
                }

                var maxWeekend = DateTime.Now.GetNextWeekday(DayOfWeek.Friday, maxDate);

                var maxWeekendDateString = maxWeekend.ToString("yyyy-MM-dd hh:mm:ss", CultureInfo.InvariantCulture);

                cache.SetStringAsync(cacheKey, maxWeekendDateString).ConfigureAwait(false);

                cache.UpdateCahceKeys(cacheKey).ConfigureAwait(false);

                return maxWeekend;
            }

            return DateTime.ParseExact(cacheMaxdate, "yyyy-MM-dd hh:mm:ss", CultureInfo.InvariantCulture);
        }

        /// <summary>
        /// Sanitises the and order produce codes.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="location">The location.</param>
        /// <param name="produceCodes">The produce codes.</param>
        /// <param name="cache">The cache.</param>
        /// <returns>
        /// Sanitised produce codes.
        /// </returns>
        /// <exception cref="NullReferenceException">Null reference.</exception>
        public static async Task<string> SanitiseAndOrderProduceCodes(this TeakOriginContext context, string location, string produceCodes, IDistributedCache cache)
        {
            if (context == null)
            {
                throw new NullReferenceException();
            }

            var commonCodes = string.Empty;

            // get a list of all produce from location
            var key = $"{location}-produce-code";

            var absoluteExpiration = DateTime.Now.GetNextWeekday(DayOfWeek.Friday, DateTime.Now).Date;

            var output = await context.LocationProduce.AsNoTracking().Where(x => x.LocationCode == location && !x.Produce.IsParent).Select(x => x.Produce.ProduceCode).ToListAsync().ConfigureAwait(false);

            var locationProduceCodes = await cache.GetOrCreateAsync(key, output).ConfigureAwait(false);

            if (produceCodes == null || produceCodes == "all")
            {
                produceCodes = string.Join(',', locationProduceCodes);
                commonCodes = produceCodes;
            }
            else
            {
                // find the common of input and master codes.
                var inputList = produceCodes.Split(',');
                commonCodes = string.Join(',', inputList.Intersect(locationProduceCodes).OrderBy(x => x));
                if (produceCodes.Equals("empty", StringComparison.OrdinalIgnoreCase))
                {
                    commonCodes = "empty";
                }
            }

            return commonCodes;
        }

        /// <summary>
        /// Sanitises the and order produce codes.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="location">The location.</param>
        /// <param name="retailerCodes">The retailer codes.</param>
        /// <param name="cache">The cache.</param>
        /// <returns>
        /// Sanitised produce codes.
        /// </returns>
        /// <exception cref="NullReferenceException">Null reference exception.</exception>
        public static async Task<string> SanitiseAndOrderRetailerCodes(this TeakOriginContext context, string location, string retailerCodes, IDistributedCache cache)
        {
            if (context == null)
            {
                throw new NullReferenceException();
            }

            var commonCodes = string.Empty;

            var key = $"{location}-retailers-code";

            var output = await context.LocationRetailer.AsNoTracking().Where(x => x.LocationCode == location).Select(x => x.RetailerCodeNavigation.RetailerCode).ToListAsync().ConfigureAwait(false);

            var locationRetailerCodes = await cache.GetOrCreateAsync(key, output).ConfigureAwait(false);

            if (retailerCodes == null || retailerCodes == "all")
            {
                retailerCodes = string.Join(',', locationRetailerCodes);
                commonCodes = retailerCodes;
            }
            else
            {
                // find the common of input and master codes.
                var inputList = retailerCodes.Split(',');
                commonCodes = string.Join(',', inputList.Intersect(locationRetailerCodes).OrderBy(x => x));
                if (retailerCodes.Equals("empty", StringComparison.OrdinalIgnoreCase))
                {
                    commonCodes = "empty";
                }
            }

            return commonCodes;
        }

        /// <summary>
        /// Gets the valid produce codes.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <returns>Extention method for getting valid produce.</returns>
        public static async Task<IList<LocationProduce>> GetValidProduceCodes(this TeakOriginContext context)
        {
            return await context.LocationProduce.Where(x => !x.Produce.IsParent).ToListAsync().ConfigureAwait(false);
        }
    }
}
