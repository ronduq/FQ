// <copyright file="RetailerController.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.App.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Caching.Distributed;
    using MoreLinq;
    using Newtonsoft.Json.Linq;
    using Teakorigin.App.Extensions;
    using Teakorigin.App.Extentions;
    using Teakorigin.App.Models;
    using Teakorigin.DataAccess;
    using Teakorigin.Domain.Model;

    /// <summary>
    /// Controller that deals with Retailers.
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.ControllerBase" />
    [Route("api/v1/{location}/")]
    [ApiExplorerSettings(GroupName = @"Retailer Information by Location")]
    [ApiController]
    public class RetailerController : ControllerBase
    {
        private readonly TeakOriginContext context;
        private readonly IDistributedCache cache;

        /// <summary>
        /// Initializes a new instance of the <see cref="RetailerController" /> class.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="cache">The cache.</param>
        public RetailerController(TeakOriginContext context, IDistributedCache cache)
        {
            this.context = context;
            this.cache = cache;
        }

        /// <summary>
        /// Gets all the retailers for a given location(e.g. 'boston', 'los-angeles' etc.) in the URL path.
        /// </summary>
        /// <param name="location">The location.</param>
        /// <param name="sortDirection">The sort direction.</param>
        /// <returns>
        /// A <see cref="Task" /> representing the asynchronous operation.
        /// </returns>
        [HttpGet("retailers")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        [Produces("application/json")]
        public async Task<RetailerResponse> GetRetailer(string location, SortDirection sortDirection = SortDirection.ASC)
        {
            var locationRetailers = await this.GetLocationRetailers(location).ConfigureAwait(false);
            var response = new RetailerResponse
            {
                Criteria = new Criteria { LocationCode = location, SortDirection = sortDirection },

                Data = locationRetailers,
            };

            return response;
        }

        /// <summary>
        /// Gets a retailer by RetailerCode ('walmart', 'target' etc.) for a given location(e.g. 'boston', 'los-angeles' etc.) in URL path.
        /// </summary>
        /// <param name="location">The location.</param>
        /// <param name="retailerCode">The retailer code.</param>
        /// <returns>
        /// A <see cref="Task" /> representing the asynchronous operation.
        /// </returns>
        [HttpGet("retailers/{retailerCode}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        [ProducesResponseType(404)]
        [Produces("application/json")]
        public async Task<RetailerResponse> GetRetailerBycode(string location, string retailerCode)
        {
            var locationRetailer = await this.GetLocationRetailers(location).ConfigureAwait(false);
            var response = new RetailerResponse
            {
                Criteria = new Criteria { LocationCode = location, },
                Data = locationRetailer.Where(x => x.RetailerCode == retailerCode).ToList(),
            };

            return response;
        }

        /// <summary>
        /// Gets the ranks for retailers for a given location(e.g. 'boston', 'los-angeles' etc.) and a given set of produceCodes.
        /// </summary>
        /// <param name="location">The location.</param>
        /// <param name="produceCodes">The produce codes.</param>
        /// <param name="retailerCodes">The retailer codes wanted for the view. If no retailerCodes provided, then all the retailers would be returned.</param>
        /// <param name="sortBy">The sort by.</param>
        /// <param name="sortDirection">The sort direction.</param>
        /// <returns>
        /// A <see cref="Task" /> representing the asynchronous operation.
        /// </returns>
        [HttpGet("retailers/rank")]
        [ProducesResponseType(typeof(ScanDataResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public async Task<IActionResult> GetRanksForRetailers(string location, string produceCodes, string retailerCodes, SortBy sortBy = SortBy.Quality, SortDirection sortDirection = SortDirection.DSC)
        {
            var produceCodeList = await this.context.SanitiseAndOrderProduceCodes(location, produceCodes, this.cache);
            var produceCodesCsv = string.Join(',', produceCodeList);
            var retailerCodesList = await this.context.SanitiseAndOrderRetailerCodes(location, retailerCodes, this.cache);

            var criteria = new Criteria { LocationCode = location, SortBy = sortBy, SortDirection = sortDirection };

            var maxScandate = this.context.GetMaxScanDateWeekend(location, this.cache);

            var listPeriod = DateTime.Now.GetLastNWeeks(maxScandate, 1).ToArray();

            if (string.IsNullOrEmpty(produceCodesCsv))
            {
                var emptyResponse = new ScanDataResponse
                {
                    Criteria = criteria,
                    Data = new List<RetailerRanks>(),
                };

                return emptyResponse.ToHttpResponse();
            }

            var scans = await this.context.GetScanData(location, produceCodesCsv, listPeriod[1], listPeriod[0], this.cache).ConfigureAwait(false);

            if (scans.Count > 0)
            {
                scans.MinBy(x => x.PerceptionScore).FirstOrDefault().PerceptionChampion = true;
                scans.MaxBy(x => x.QualAvg).FirstOrDefault().QualityChampion = true;
                scans.MinBy(x => x.ActualValueRank).ForEach(x => x.ValueChampion = true);

                scans = scans.OrderByDescending(x => x.Quality).ToList();
                if (retailerCodesList?.Length > 0)
                {
                    scans = scans.Where(x => retailerCodesList.Contains(x.RetailerCode, StringComparison.OrdinalIgnoreCase)).ToList();
                }
            }

            System.Reflection.PropertyInfo prop = typeof(RetailerRanks).GetProperty(sortBy.ToString());

            var response = new ScanDataResponse
            {
                Criteria = criteria,
                Data = sortDirection == SortDirection.DSC ? scans.OrderByDescending(x => prop.GetValue(x, null)).ThenByDescending(x => x.QualAvg).ToList() : scans.OrderBy(x => prop.GetValue(x, null)).ThenBy(x => x.QualAvg).ToList(),
            };

            return response.ToHttpResponse();
        }

        /// <summary>
        /// Gets the rank for single retailer.
        /// </summary>
        /// <param name="location">The location.</param>
        /// <param name="produceCodes">The produce codes.</param>
        /// <param name="retailerCode">The retailer code.</param>
        /// <returns>
        /// Returns the rank data for a single retailer.
        /// </returns>
        [HttpGet("retailer/{retailerCode}/rank")]
        [ProducesResponseType(typeof(ScanDataResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public async Task<IActionResult> GetRankForSingleRetailer(string location, string produceCodes, string retailerCode)
        {
            return await this.GetRanksForRetailers(location, produceCodes, retailerCode).ConfigureAwait(false);
        }

        /// <summary>
        /// Gets the top picks for retailer.
        /// </summary>
        /// <param name="location">The location.</param>
        /// <param name="produceCodes">The produce codes.</param>
        /// <param name="retailerCode">The retailer code.</param>
        /// <param name="sortBy">The sort by.</param>
        /// <param name="sortDirection">The sort direction.</param>
        /// <returns>Top picks for retailer for a location.</returns>
        [HttpGet("retailer/{retailerCode}/picks")]
        [ProducesResponseType(typeof(ScanDataResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public async Task<IActionResult> GetTopPicksForRetailer(string location, string produceCodes, string retailerCode, SortBy sortBy = SortBy.Quality, SortDirection sortDirection = SortDirection.DSC)
        {
            if (produceCodes == null || produceCodes == "all")
            {
                // get a list of all produce from location
                var locationProduceCodes = await this.context.LocationProduce.AsNoTracking().Where(x => x.LocationCode == location).Select(x => x.Produce.ProduceCode).ToListAsync().ConfigureAwait(false);
                produceCodes = string.Join(',', locationProduceCodes);
            }

            var maxScandate = this.context.GetMaxScanDateWeekend(location, this.cache);

            var topPicksList = new List<TopPicks>();
            var listPeriodDates = DateTime.Now.GetLastNWeeks(maxScandate, 1);

            // For each produce code bring in the rank data.
            foreach (var produceCode in produceCodes.Split(','))
            {
                var rankData = await this.context.GetScanData(location, produceCode, listPeriodDates[1], listPeriodDates[0], this.cache).ConfigureAwait(false);
                var retailerDataforProduce = rankData.Where(x => x.RetailerCode == retailerCode).FirstOrDefault();
                if (retailerDataforProduce == null)
                {
                    continue;
                }

                var relevantScanData = await this.context.ScanData.Where(x => x.MdLocationCode == location && x.MdProduceCode == produceCode && x.MdSupplier == retailerCode && x.MdScanDate > listPeriodDates[1] && x.MdScanDate < listPeriodDates[0]).OrderBy(x => x.CountryOfOrigin).ToListAsync().ConfigureAwait(false);

                var topPick = new TopPicks { ProduceCode = produceCode, QualAvg = retailerDataforProduce.QualAvg, Quality = retailerDataforProduce.Quality, Value = retailerDataforProduce.ActualValueRank, PerceptionScore = retailerDataforProduce.PerceptionScore, RelevantScanData = relevantScanData };

                topPicksList.Add(topPick);
            }

            if (sortBy == SortBy.Quality)
            {
                if (sortDirection == SortDirection.DSC)
                {
                    topPicksList = topPicksList.OrderByDescending(x => x.QualAvg).ToList();
                }
                else
                {
                    topPicksList = topPicksList.OrderBy(x => x.QualAvg).ToList();
                }
            }
            else if (sortBy == SortBy.Value)
            {
                if (sortDirection == SortDirection.DSC)
                {
                    topPicksList = topPicksList.OrderByDescending(x => x.Value).ToList();
                }
                else
                {
                    topPicksList = topPicksList.OrderBy(x => x.Value).ToList();
                }
            }

            var scanDataResponse = new TopPicksResponse
            {
                Criteria = new Criteria { LocationCode = location, ProduceCodes = produceCodes.Split(',').ToList(), RetailerCodes = new List<string> { retailerCode }, SortBy = sortBy, SortDirection = sortDirection },
                Data = topPicksList,
            };

            return scanDataResponse.ToHttpResponse();
        }

        /// <summary>
        /// Gets the analyte detail for a given produce for a given location and retailer.
        /// </summary>
        /// <param name="location">The location.</param>
        /// <param name="retailerCode">The retailer code.</param>
        /// <param name="produceCode">The produce code.</param>
        /// <param name="sortBy">The sort by.</param>
        /// <param name="sortDirection">The sort direction.</param>
        /// <returns>
        /// Top picks for retailer for a location.
        /// </returns>
        [HttpGet("retailer/{retailerCode}/picks/{produceCode}")]
        [ProducesResponseType(typeof(ScanDataResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetTopPickDetailsForRetailer(string location, string retailerCode, string produceCode, SortBy sortBy = SortBy.Quality, SortDirection sortDirection = SortDirection.DSC)
        {
            var topPicksList = new List<TopPicksDetails>();
            var maxScandate = this.context.GetMaxScanDateWeekend(location, this.cache);

            var listPeriodDates = DateTime.Now.GetLastNWeeks(maxScandate, 1);

            var rankData = await this.context.GetScanData(location, produceCode, listPeriodDates[1], listPeriodDates[0], this.cache).ConfigureAwait(false);
            var retailerDataforProduce = rankData.Where(x => x.RetailerCode == retailerCode).FirstOrDefault();
            if (retailerDataforProduce == null)
            {
                return new NotFoundResult();
            }

            var analyteUoms = await this.context.AnalyteUom.ToListAsync();
            var produceUsdadata = this.context.Produce.Where(x => x.ProduceCode == produceCode).FirstOrDefault();
            var relevantScanData = await this.context.ScanData.Where(x => x.MdLocationCode == location && x.MdProduceCode == produceCode && x.MdSupplier == retailerCode && x.MdScanDate > listPeriodDates[1] && x.MdScanDate < listPeriodDates[0]).OrderBy(x => x.CountryOfOrigin).ToListAsync().ConfigureAwait(false);
            var topPick = new TopPicksDetails(analyteUoms) { ProduceCode = produceCode, Quality = retailerDataforProduce.Quality, Value = retailerDataforProduce.ActualValueRank, PerceptionScore = retailerDataforProduce.PerceptionScore, RelevantScanData = relevantScanData, ProduceUsdaData = produceUsdadata };
            topPicksList.Add(topPick);

            var scanDataResponse = new TopPicksDetailsResponse
            {
                Criteria = new Criteria { LocationCode = location, ProduceCodes = new List<string> { produceCode }, RetailerCodes = new List<string> { retailerCode }, SortBy = sortBy, SortDirection = sortDirection },
                Data = sortDirection == SortDirection.DSC ? topPicksList.OrderByDescending(x => x.Quality).ToList() : topPicksList.OrderBy(x => x.Quality).ToList(),
            };

            return scanDataResponse.ToHttpResponse();
        }

        /// <summary>
        /// Gets the produce trends for the Retailer Trends page.
        /// </summary>
        /// <param name="location">The location.</param>
        /// <param name="retailerCode">The retailer code.</param>
        /// <param name="produceCodes">The produce codes.</param>
        /// <param name="trendType">Type of the trend.</param>
        /// <param name="trendFrequency">The trend frequency.</param>
        /// <param name="periodCount">The period count.</param>
        /// <returns>
        /// Returns the produce trends for a defined period.
        /// </returns>
        [HttpGet("retailer/{retailerCode}/producetrends")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        [Produces("application/json")]
        public async Task<IActionResult> GetProduceTrends(string location, string retailerCode, string produceCodes, TrendType trendType = TrendType.Quality, TrendFrequency trendFrequency = TrendFrequency.Weekly, int periodCount = 10)
        {
            var listProduceCodes = new List<string>();
            if (produceCodes == "all" || produceCodes == null)
            {
                listProduceCodes = await this.context.LocationProduce.AsNoTracking().Where(x => x.LocationCode == location).Select(x => x.Produce.ProduceCode).OrderBy(x => x).ToListAsync().ConfigureAwait(false);
            }
            else
            {
                listProduceCodes = produceCodes.Split(',').ToList().OrderBy(x => x).ToList();
            }

            var lastPeriodsStartDates = new List<DateTime>();
            var maxScandate = this.context.GetMaxScanDateWeekend(location, this.cache);

            if (trendFrequency == TrendFrequency.Weekly)
            {
                lastPeriodsStartDates = DateTime.Now.GetLastNWeeks(maxScandate, 25);
            }
            else if (trendFrequency == TrendFrequency.Monthly)
            {
                lastPeriodsStartDates = DateTime.Now.GetLastNMonths(periodCount);
            }

            var lastPeriodsStartDatesArray = lastPeriodsStartDates.ToArray();

            var listPeriodData = new List<JObject>();
            for (var i = 0; i < lastPeriodsStartDatesArray.Length - 1; i++)
            {
                var dictionaryProduceRankings = new Dictionary<string, RetailerRanks>();
                foreach (var produceCode in listProduceCodes)
                {
                    var singleProduceRankings = await this.context.GetScanData(location, produceCode, lastPeriodsStartDatesArray[i + 1], lastPeriodsStartDatesArray[i], this.cache).ConfigureAwait(false);

                    if (singleProduceRankings.Any(x => x.RetailerCode == retailerCode))
                    {
                        dictionaryProduceRankings.Add(produceCode, singleProduceRankings.FirstOrDefault(x => x.RetailerCode == retailerCode));
                    }
                }

                var periodData = new PeriodProduceData() { PeriodEndDate = lastPeriodsStartDatesArray[i], RetailerRanksPerProduce = dictionaryProduceRankings, TrendType = trendType };
                if (periodData.GraphData != null)
                {
                    listPeriodData.Add(periodData.GraphData);
                }
            }

            listPeriodData.Reverse();

            // What we are doing here is taking the last 10 records
            var data = listPeriodData.Skip(Math.Max(0, listPeriodData.Count - periodCount)).ToList();

            var graphDataResponse = new GraphDataResponse
            {
                Criteria = new Criteria { LocationCode = location, },
                Data = data,
            };

            return graphDataResponse.ToHttpResponse();
        }

        private async Task<List<Retailer>> GetLocationRetailers(string location)
        {
            var key = $"{location}-retailers";
            var retailers = await this.context.LocationRetailer.AsNoTracking()
            .Where(x => x.LocationCode.Equals(location, StringComparison.OrdinalIgnoreCase))
            .Select(x => x.RetailerCodeNavigation).OrderBy(x => x.RetailerCode).ToListAsync().ConfigureAwait(false);

            var locationRetailers = await this.cache.GetOrCreateAsync<List<Retailer>>(key, retailers);

            return locationRetailers;
        }
    }
}
