// <copyright file="CacheController.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.Advanced.App.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Azure.Storage;
    using Microsoft.Azure.Storage.Blob;
    using Microsoft.Extensions.Caching.Distributed;
    using Microsoft.Extensions.Logging;
    using Teakorigin.Advanced.App.Constants;
    using Teakorigin.Advanced.App.Extensions;
    using Teakorigin.Advanced.App.Models;
    using Teakorigin.DataAccess;
    using Teakorigin.Domain.Models;

    /// <summary>
    /// The Cache Controller.
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Controller" />
    [Authorize("Ingestion")]
    public class CacheController : Controller
    {
        private readonly IDistributedCache cache;
        private readonly ILogger<CacheController> logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="CacheController" /> class.
        /// </summary>
        /// <param name="cache">The cache.</param>
        /// <param name="logger">The logger.</param>
        public CacheController(IDistributedCache cache, ILogger<CacheController> logger)
        {
            this.cache = cache;
            this.logger = logger;
        }

        /// <summary>
        /// Indexes this instance.
        /// </summary>
        /// <returns>
        /// Returns the view.
        /// </returns>
        public async Task<IActionResult> Index()
        {
             var cacheKeyList = await this.cache.GetAsync<List<string>>(CacheKeys.CacheColectionKey);

             return this.View(new CacheViewModel() { CacheList = cacheKeyList });
        }

        /// <summary>
        /// Indexes this instance.
        /// </summary>
        /// <returns>Return the view.</returns>
        [HttpPost]
        public async Task<IActionResult> Process()
        {
            var model = new CacheViewModel();

            try
            {
                await this.cache.ClearCache(CacheKeys.CacheColectionKey);

                this.logger.LogTrace($"Cache sucessufly cleared by admin!");
                model.SuccessMessage = "Cache sucessufly cleared!";
            }
            catch (Exception ex)
            {
                model.ErrorMessage = "Problem clearing the cache:  \r\n" + ex.Message;
                this.logger.LogWarning("Problem clearing the cache: ", ex);
                return this.View(model);
            }

            model.CacheList = await this.cache.GetAsync<List<string>>(CacheKeys.CacheColectionKey);

            return this.View("Index", model);
        }
    }
}
