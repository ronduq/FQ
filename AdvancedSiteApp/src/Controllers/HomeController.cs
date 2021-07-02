// <copyright file="HomeController.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Teakorigin.Advanced.App.Models;
using Teakorigin.Domain.Models;

namespace Teakorigin.Advanced.App.Controllers
{
    /// <summary>
    /// Advance site controller.
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Controller" />
    [Authorize]
    public class HomeController : Controller
    {
        private readonly AppSettings appSettings;

        /// <summary>
        /// Initializes a new instance of the <see cref="HomeController"/> class.
        /// </summary>
        /// <param name="appSettings">The application settings.</param>
        public HomeController(AppSettings appSettings)
        {
            this.appSettings = appSettings;
        }

        /// <summary>
        /// Indexes this instance.
        /// </summary>
        /// <returns>Returns the view for advance site.</returns>
        public IActionResult Index()
        {
            return this.View(new AdvanceSiteViewModel { AdvancedSiteLink = this.appSettings.AdvancedSiteUrl });
        }
    }
}