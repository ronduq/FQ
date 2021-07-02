// <copyright file="HomeController.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.App.Controllers
{
    using System.Diagnostics;
    using Microsoft.AspNetCore.Mvc;
    using Teakorigin.App.Models;
    using Teakorigin.Domain.Models;

    /// <summary>
    /// Home xontroller.
    /// </summary>
    [Route("/")]
    public class HomeController : Controller
    {
        private readonly AppSettings appSettings;

        /// <summary>
        /// Initializes a new instance of the <see cref="HomeController" /> class.
        /// </summary>
        /// <param name="appSettings">The application settings.</param>
        public HomeController(AppSettings appSettings)
        {
            this.appSettings = appSettings;
        }

        /// <summary>
        /// Indexes this instance.
        /// </summary>
        /// <returns>Redirects to swagger.</returns>
        public IActionResult Index()
        {
            return this.RedirectPermanent(this.appSettings.BaseUrl);
        }

        /// <summary>
        /// Privacies this instance.
        /// </summary>
        /// <returns>Privacy view.</returns>
        [Route("privacy")]
        public IActionResult Privacy()
        {
            return this.View();
        }

        /// <summary>
        /// Errors this instance.
        /// </summary>
        /// <returns>Returns error view.</returns>
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        [Route("error")]
        public IActionResult Error()
        {
            return this.View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? this.HttpContext.TraceIdentifier });
        }
    }
}
