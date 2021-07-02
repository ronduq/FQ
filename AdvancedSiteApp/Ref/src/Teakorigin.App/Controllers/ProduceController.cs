// <copyright file="ProduceController.cs" company="PlaceholderCompany">
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
    using Microsoft.Extensions.Caching.Memory;
    using MoreLinq;
    using Newtonsoft.Json.Linq;
    using Teakorigin.App.Extentions;
    using Teakorigin.App.Models;
    using Teakorigin.DataAccess;
    using Teakorigin.Domain.Model;

    /// <summary>
    /// Gets the Produce by Location.
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.ControllerBase" />
    [Route("api/v1/{location}/")]
    [ApiExplorerSettings(GroupName = @"Produce by Location")]
    [ApiController]
    public class ProduceController : ControllerBase
    {
        private readonly TeakOriginContext context;
        private readonly IDistributedCache cache;

        /// <summary>
        /// Initializes a new instance of the <see cref="ProduceController" /> class.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="cache">The cache.</param>
        public ProduceController(TeakOriginContext context, IDistributedCache cache)
        {
            this.context = context;
            this.cache = cache;
        }

        /// <summary>
        /// Gets the produce for the given location in URL path.
        /// </summary>
        /// <param name="location">The location.</param>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpGet("produce")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        [Produces("application/json")]
        public async Task<ProduceResponse> GetLocationProduce(string location)
        {
            var response = new ProduceResponse
            {
                Criteria = new Criteria { LocationCode = location, },

                Data = await this.context.LocationProduce.AsNoTracking().Where(x => x.LocationCode == location).Select(x => x.Produce).OrderBy(x => x.ProduceCode).ToListAsync().ConfigureAwait(false),
            };

            return response;
        }

        /// <summary>
        /// Gets the produce by ProduceCode [like 'apple', 'grapes' etc.] for a given location in the URL path.
        /// </summary>
        /// <param name="location">The location.</param>
        /// <param name="produceCode">The produce code.</param>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpGet("produce/{produceCode}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        [ProducesResponseType(404)]
        [Produces("application/json")]
        public async Task<ProduceResponse> GetLocationProduceBycode(string location, string produceCode)
        {
            var response = new ProduceResponse
            {
                Data = await this.context.LocationProduce.AsNoTracking().Where(x => x.LocationCode == location && x.ProduceCode == produceCode).Select(x => x.Produce).ToListAsync().ConfigureAwait(false),
            };

            return response;
        }

        /// <summary>
        /// Gets the top produce picks for a location and retailers these picks belong to.
        /// </summary>
        /// <param name="location">The location.</param>
        /// <param name="produceCodes">The produce codes.</param>
        /// <param name="retailerCodes">The retailer codes.</param>
        /// <param name="sortBy">The sort by.</param>
        /// <returns>
        /// Top picks for retailer for a location.
        /// </returns>
        [HttpGet("produce/picks")]
        [ProducesResponseType(typeof(LocationTopPicksResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public async Task<IActionResult> GetTopPicksForLocation(string location, string produceCodes, string retailerCodes, SortBy sortBy = SortBy.Quality)
        {
            if (!Enum.IsDefined(typeof(SortBy), sortBy))
            {
                return new BadRequestResult();
            }

            produceCodes = await this.context.SanitiseAndOrderProduceCodes(location, produceCodes, this.cache).ConfigureAwait(false);

            retailerCodes = await this.context.SanitiseAndOrderRetailerCodes(location, retailerCodes, this.cache).ConfigureAwait(false);

            var retcodeList = retailerCodes.Split(',');
            var prodcodelist = produceCodes.Split(',');

            var maxScandate = this.context.GetMaxScanDateWeekend(location, this.cache);

            var topPicksList = new List<TopPicks>();
            var listPeriodDates = DateTime.Now.GetLastNWeeks(maxScandate, 1);

            var produceDictionary = new Dictionary<string, List<RetailerRanks>>();

            var overAllScanData = new List<RetailerRanks>();

            // For each produce find the retailer ranks
            foreach (var produceCode in prodcodelist)
            {
                var rankData = await this.context.GetScanData(location, produceCode, listPeriodDates[1], listPeriodDates[0], this.cache).ConfigureAwait(false);
                var relRankData = rankData.Where(x => retcodeList.Contains(x.RetailerCode));
                var maxOrMin = sortBy == SortBy.Quality ? relRankData.MaxBy(x => x.QualAvg).FirstOrDefault() : relRankData.MinBy(x => x.Value).FirstOrDefault();
                if (maxOrMin == null)
                {
                    continue;
                }

                overAllScanData.AddRange(relRankData);

                var relevantScanData = await this.context.ScanData
                    .Where(x => x.MdLocationCode == location && x.MdProduceCode == produceCode && x.MdSupplier == maxOrMin.RetailerCode && x.MdScanDate > listPeriodDates[1] && x.MdScanDate < listPeriodDates[0])
                    .OrderBy(x => x.CountryOfOrigin)
                    .ToListAsync()
                    .ConfigureAwait(false);

                var topPick = new TopPicks
                {
                    RetailerCode = maxOrMin.RetailerCode,
                    ProduceCode = produceCode,
                    QualAvg = maxOrMin.QualAvg,
                    Quality = maxOrMin.Quality,
                    Value = maxOrMin.ActualValueRank,
                    PerceptionScore = maxOrMin.PerceptionScore,
                    RelevantScanData = relevantScanData,
                };

                if (retcodeList.Contains(maxOrMin.RetailerCode))
                {
                    topPicksList.Add(topPick);
                }

                produceDictionary.Add(produceCode, relRankData.ToList());
            }

            var topTwoRetailers = new List<RetailerPicks>();

            // get top two retailers by criteria.
            var retailerRanks = await this.context.GetScanData(location, produceCodes, listPeriodDates[1], listPeriodDates[0], this.cache).ConfigureAwait(false);
            var toptworetailerRanks = sortBy == SortBy.Quality ? retailerRanks.Where(x => retcodeList.Contains(x.RetailerCode)).OrderByDescending(x => x.QualAvg).Take(2) : retailerRanks.Where(x => retcodeList.Contains(x.RetailerCode)).OrderBy(x => x.Value).Take(2);

            foreach (var retailerRank in toptworetailerRanks)
            {
                var toppicksRetailer = new List<TopPicks>();
                foreach (var produceCode in prodcodelist)
                {
                    // get the relevant retailer rank from dictionary
                    if (produceDictionary.TryGetValue(produceCode, out List<RetailerRanks> prodRanks))
                    {
                        var prodRank = prodRanks.Where(x => x.RetailerCode == retailerRank.RetailerCode).FirstOrDefault();

                        var relevantScanData = await this.context.ScanData
                            .Where(x => x.MdLocationCode == location && x.MdProduceCode == produceCode && x.MdSupplier == retailerRank.RetailerCode && x.MdScanDate > listPeriodDates[1] && x.MdScanDate < listPeriodDates[0])
                            .OrderBy(x => x.CountryOfOrigin)
                            .ToListAsync()
                            .ConfigureAwait(false);

                        if (relevantScanData.Any())
                        {
                            var topPick = new TopPicks { RetailerCode = prodRank.RetailerCode, ProduceCode = produceCode, QualAvg = prodRank.QualAvg, Quality = prodRank.Quality, Value = prodRank.ActualValueRank, PerceptionScore = prodRank.PerceptionScore, RelevantScanData = relevantScanData };

                            toppicksRetailer.Add(topPick);
                        }
                    }
                }

                if (sortBy == SortBy.Quality)
                {
                    toppicksRetailer = toppicksRetailer.OrderByDescending(x => x.QualAvg).ToList();
                }
                else if (sortBy == SortBy.Value)
                {
                    toppicksRetailer = toppicksRetailer.OrderBy(x => x.Value).ToList();
                }

                if (sortBy == SortBy.Quality)
                {
                    topTwoRetailers.Add(new RetailerPicks { RetailerCode = retailerRank.RetailerCode, Score = $"{retailerRank.Quality}", TopPicks = toppicksRetailer });
                }
                else if (sortBy == SortBy.Value)
                {
                    topTwoRetailers.Add(new RetailerPicks { RetailerCode = retailerRank.RetailerCode, Score = $"{retailerRank.Value}", TopPicks = toppicksRetailer });
                }
            }

            if (sortBy == SortBy.Value)
            {
                var first = topTwoRetailers.FirstOrDefault()?.Score;
                var second = topTwoRetailers.Skip(1).FirstOrDefault()?.Score;

                if (first == second)
                {
                    topTwoRetailers.ForEach(x => { x.IsSameRankValue = true; });
                }
            }

            if (sortBy == SortBy.Quality)
            {
                topPicksList = topPicksList.OrderByDescending(x => x.QualAvg).ToList();
            }
            else if (sortBy == SortBy.Value)
            {
                topPicksList = topPicksList.OrderBy(x => x.Value).ToList();
            }

            var scanDataResponse = new LocationTopPicksResponse
            {
                Criteria = new Criteria { LocationCode = location, ProduceCodes = produceCodes.Split(',').ToList(), RetailerCodes = new List<string> { retailerCodes }, SortBy = sortBy },
                Data = new LocationTopPicks { TopPicks = topPicksList, RetailerTopPicks = topTwoRetailers, },
            };

            return scanDataResponse.ToHttpResponse();
        }

        /// <summary>
        /// Gets the retailer trends for the Produce Trends page.
        /// </summary>
        /// <param name="location">The location.</param>
        /// <param name="produceCode">The produce codes.</param>
        /// <param name="trendType">Type of the trend.</param>
        /// <param name="trendFrequency">The trend frequency.</param>
        /// <param name="periodCount">The period count.</param>
        /// <returns>
        /// Returns the trends data for retailers.
        /// </returns>
        [HttpGet("produce/{produceCode}/retailertrends")]
        [ProducesResponseType(typeof(GraphDataResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public async Task<IActionResult> GetTrendsForRetailers(string location, string produceCode, TrendType trendType = TrendType.Quality, TrendFrequency trendFrequency = TrendFrequency.Weekly, int periodCount = 10)
        {
            var lastPeriodsStartDates = new List<DateTime>();
            var maxScandate = this.context.GetMaxScanDateWeekend(location, this.cache);

            if (trendFrequency == TrendFrequency.Weekly)
            {
                lastPeriodsStartDates = DateTime.Now.GetLastNWeeks(maxScandate, 50);
            }
            else if (trendFrequency == TrendFrequency.Monthly)
            {
                lastPeriodsStartDates = DateTime.Now.GetLastNMonths(periodCount);
            }

            var lastPeriodsStartDatesArray = lastPeriodsStartDates.ToArray();

            var listPeriodData = new List<JObject>();

            for (var i = 0; i < lastPeriodsStartDatesArray.Length - 1; i++)
            {
                var scans = await this.context.GetScanData(location, produceCode, lastPeriodsStartDatesArray[i + 1], lastPeriodsStartDatesArray[i], this.cache).ConfigureAwait(false);
                var periodData = new PeriodRetailerData { PeriodEndDate = lastPeriodsStartDatesArray[i], RetailerRanks = scans, TrendType = trendType };
                if (periodData.GraphData != null)
                {
                    listPeriodData.Add(periodData.GraphData);
                }
            }

            listPeriodData.Reverse();
            var graphDataResponse = new GraphDataResponse
            {
                Criteria = new Criteria { LocationCode = location, },
                Data = listPeriodData,
            };

            return graphDataResponse.ToHttpResponse();
        }
    }
}
