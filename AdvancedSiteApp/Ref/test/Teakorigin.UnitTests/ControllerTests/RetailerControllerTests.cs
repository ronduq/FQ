// <copyright file="RetailerControllerTests.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.UnitTests.ControllerTests
{
    using AutoFixture.Xunit2;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Caching.Distributed;
    using Microsoft.Extensions.Caching.Memory;
    using Microsoft.Extensions.Options;
    using Snapper;
    using Snapper.Attributes;
    using Teakorigin.App.Controllers;
    using Teakorigin.App.Models;
    using Teakorigin.DataAccess;
    using Teakorigin.UnitTests.Attributes;
    using Teakorigin.UnitTests.Fixures;
    using Xunit;

    /// <summary>
    /// Tests for Location produces controller.
    /// </summary>
    [Collection("Database collection")]
    public class RetailerControllerTests
    {
        private TeakOriginContextFixure teakOriginContextFixure;

        /// <summary>
        /// Initializes a new instance of the <see cref="RetailerControllerTests" /> class.
        /// </summary>
        /// <param name="fixture">The fixture.</param>
        public RetailerControllerTests(TeakOriginContextFixure fixture)
        {
            this.teakOriginContextFixure = fixture;
        }

        /// <summary>
        /// Shoulds the return all produce by location.
        /// </summary>
        /// <param name="location">The location.</param>
        /// <param name="cachce">The cachce.</param>
        [Theory]
        [InlineAutoMoqData("boston")]
        [InlineAutoMoqData("los-angeles")]
        public async void GetRetailerTest(string location, MemoryDistributedCache cachce)
        {
            var options = new DbContextOptionsBuilder<TeakOriginContext>()
                    .UseSqlite(this.teakOriginContextFixure.Connection)
                    .Options;

            // Run the test against one instance of the context
            using (var context = new TeakOriginContext(options))
            {
                var sut = new RetailerController(context, cachce);
                var op = await sut.GetRetailer(location);
                op.ShouldMatchChildSnapshot($"child_{location}");
            }
        }

        /// <summary>
        /// Shoulds the return all produce by location.
        /// </summary>
        /// <param name="location">The location.</param>
        /// <param name="retailerCode">The retailer code.</param>
        /// <param name="cachce">The cachce.</param>
        [Theory]
        [InlineAutoMoqData("boston", "aldi")]
        [InlineAutoMoqData("boston", "wegmans")]
        [InlineAutoMoqData("boston", "all")]
        [InlineAutoMoqData("los-angeles", "walmart")]
        [InlineAutoMoqData("los-angeles", null)]
        [InlineAutoMoqData("los-angeles", "trader-joes")]
        public async void GetRetailerBycodeTest(string location, string retailerCode, MemoryDistributedCache cachce)
        {
            var options = new DbContextOptionsBuilder<TeakOriginContext>()
                    .UseSqlite(this.teakOriginContextFixure.Connection)
                    .Options;

            // Run the test against one instance of the context
            using (var context = new TeakOriginContext(options))
            {
                var sut = new RetailerController(context, cachce);
                var op = await sut.GetRetailerBycode(location, retailerCode);
                op.ShouldMatchChildSnapshot($"child_{location}_{retailerCode}");
            }
        }

        /// <summary>
        /// Shoulds the return all produce by location.
        /// </summary>
        /// <param name="location">The location.</param>
        /// <param name="retailerCodes">The retailer codes.</param>
        /// <param name="produceCodes">The produce codes.</param>
        /// <param name="sortBy">The sort by.</param>
        /// <param name="sortDirection">The sort direction.</param>
        /// <param name="cachce">The cachce.</param>
        [Theory]
        [InlineAutoMoqData("boston", "aldi", "apple-gala", SortBy.Quality, SortDirection.DSC)]
        [InlineAutoMoqData("boston", "wegmans", "apple-gala", SortBy.Value, SortDirection.ASC)]
        [InlineAutoMoqData("boston", "all", "apple-gala", SortBy.Perception, SortDirection.DSC)]
        [InlineAutoMoqData("los-angeles", "walmart", "apple-gala", SortBy.Quality, SortDirection.DSC)]
        [InlineAutoMoqData("los-angeles", null, "apple-gala", SortBy.Value, SortDirection.DSC)]
        [InlineAutoMoqData("los-angeles", "trader-joes", "apple-gala", SortBy.Perception, SortDirection.DSC)]
        public async void GetRanksForRetailersTest(string location, string retailerCodes, string produceCodes, SortBy sortBy, SortDirection sortDirection, MemoryDistributedCache cachce)
        {
            var options = new DbContextOptionsBuilder<TeakOriginContext>()
                    .UseSqlite(this.teakOriginContextFixure.Connection)
                    .Options;

            // Run the test against one instance of the context
            using (var context = new TeakOriginContext(options))
            {
                var sut = new RetailerController(context, cachce);
                var op = await sut.GetRanksForRetailers(location, produceCodes, retailerCodes, sortBy, sortDirection);
                op.ShouldMatchChildSnapshot($"child_{location}_{retailerCodes}_{produceCodes}_{sortDirection}");
            }
        }

        /// <summary>
        /// Shoulds the return all produce by location.
        /// </summary>
        /// <param name="location">The location.</param>
        /// <param name="produceCodes">The produce codes.</param>
        /// <param name="retailerCode">The retailer code.</param>
        /// <param name="cachce">The cachce.</param>
        [Theory]
        [InlineAutoMoqData("boston", "apple-gala", "aldi")]
        [InlineAutoMoqData("boston", "apple-fuji", "wegmans")]
        [InlineAutoMoqData("boston", "all", "walmart")]
        [InlineAutoMoqData("los-angeles", "strawberry", "trader-joes")]
        [InlineAutoMoqData("los-angeles", null, "stop-n-shop")]
        [InlineAutoMoqData("los-angeles", "avocado", "target")]
        public async void GetRankForSingleRetailer(string location, string produceCodes, string retailerCode, MemoryDistributedCache cachce)
        {
            var options = new DbContextOptionsBuilder<TeakOriginContext>()
                    .UseSqlite(this.teakOriginContextFixure.Connection)
                    .Options;

            // Run the test against one instance of the context
            using (var context = new TeakOriginContext(options))
            {
                var sut = new RetailerController(context, cachce);
                var op = await sut.GetRankForSingleRetailer(location, produceCodes, retailerCode);
                op.ShouldMatchChildSnapshot($"child_{location}_{produceCodes}_{retailerCode}");
            }
        }
    }
}
