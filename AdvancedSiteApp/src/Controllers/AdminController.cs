// <copyright file="AdminController.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.Advanced.App.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    /// <summary>
    /// Admin controller.
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Controller" />
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}