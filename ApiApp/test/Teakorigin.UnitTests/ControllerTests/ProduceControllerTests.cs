// <copyright file="ProduceControllerTests.cs" company="PlaceholderCompany">
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
    public class ProduceControllerTests
    {
        private TeakOriginContextFixure teakOriginContextFixure;

        /// <summary>
        /// Initializes a new instance of the <see cref="ProduceControllerTests"/> class.
        /// </summary>
        /// <param name="fixture">The fixture.</param>
        public ProduceControllerTests(TeakOriginContextFixure fixture)
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
        public async void GetLocationProduceTest(string location, [Frozen]IDistributedCache cachce)
        {
            var options = new DbContextOptionsBuilder<TeakOriginContext>()
                    .UseSqlite(this.teakOriginContextFixure.Connection)
                    .Options;

            // Run the test against one instance of the context
            using (var context = new TeakOriginContext(options))
            {
                var sut = new ProduceController(context, cachce);
                var op = await sut.GetLocationProduce(location);
                op.ShouldMatchChildSnapshot($"child_{location}");
            }
        }

        /// <summary>
        /// Shoulds the return all produce by location.
        /// </summary>
        /// <param name="location">The location.</param>
        /// <param name="produceCode">The produce code.</param>
        /// <param name="cachce">The cachce.</param>
        [Theory]
        [InlineAutoMoqData("boston", "apple")]
        [InlineAutoMoqData("boston", "empty")]
        [InlineAutoMoqData("boston", "all")]
        [InlineAutoMoqData("boston", "apple-fuji")]
        [InlineAutoMoqData("los-angeles", null)]
        [InlineAutoMoqData("los-angeles", "avocado")]
        public async void GetLocationProduceBycodeTest(string location, string produceCode, [Frozen]IDistributedCache cachce)
        {
            var options = new DbContextOptionsBuilder<TeakOriginContext>()
                    .UseSqlite(this.teakOriginContextFixure.Connection)
                    .Options;

            // Run the test against one instance of the context
            using (var context = new TeakOriginContext(options))
            {
                var sut = new ProduceController(context, cachce);
                var op = await sut.GetLocationProduceBycode(location, produceCode);
                op.ShouldMatchChildSnapshot($"child_{location}_{produceCode}");
            }
        }

        /// <summary>
        /// Shoulds the return all produce by location.
        /// </summary>
        /// <param name="location">The location.</param>
        /// <param name="produceCodes">The produce codes.</param>
        /// <param name="retailerCodes">The retailer codes.</param>
        /// <param name="sortBy">The sort by.</param>
        /// <param name="cachce">The cachce.</param>
        [Theory]
        [InlineAutoMoqData("boston", "apple,strawberry", "wegmans,aldi", SortBy.Quality)]
        [InlineAutoMoqData("boston", "empty", "empty", SortBy.Perception)]
        [InlineAutoMoqData("boston", "all", "all", SortBy.Value)]
        [InlineAutoMoqData("boston", "apple-fuji", "walmart,stop-n-shop")]
        [InlineAutoMoqData("los-angeles", "avocado", "aldi", SortBy.Quality)]
        public async void GetTopPicksForLocationTest(string location, string produceCodes, string retailerCodes, SortBy sortBy, MemoryDistributedCache cachce)
        {
            var options = new DbContextOptionsBuilder<TeakOriginContext>()
                    .UseSqlite(this.teakOriginContextFixure.Connection)
                    .Options;

            // Run the test against one instance of the context
            using (var context = new TeakOriginContext(options))
            {
                var sut = new ProduceController(context, cachce);
                var op = await sut.GetTopPicksForLocation(location, produceCodes, retailerCodes, sortBy);
                op.ShouldMatchChildSnapshot($"child_{location}_{produceCodes}_{retailerCodes}_{sortBy}");
            }
        }
    }
}
