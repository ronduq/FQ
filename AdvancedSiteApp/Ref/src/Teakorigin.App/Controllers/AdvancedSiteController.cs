﻿// <copyright file="AdvancedSiteController.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.App.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Teakorigin.App.Models;
    using Teakorigin.Domain.Models;

    /// <summary>
    /// Advance site controller.
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Controller" />
    [Authorize]
    public class AdvancedSiteController : Controller
    {
        private readonly AppSettings appSettings;

        /// <summary>
        /// Initializes a new instance of the <see cref="AdvancedSiteController"/> class.
        /// </summary>
        /// <param name="appSettings">The application settings.</param>
        public AdvancedSiteController(AppSettings appSettings)
        {
            this.appSettings = appSettings;
        }

        /// <summary>
        /// Indexes this instance.
        /// </summary>
        /// <returns>Returns the view for advance site.</returns>
        [Route("advanced/home/")]
        public IActionResult Index()
        {
            return this.View(new AdvanceSiteViewModel { AdvancedSiteLink = this.appSettings.AdvancedSiteUrl });
        }
    }
}