// <copyright file="RetailerResponse.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.App.Models
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using MoreLinq;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;
    using Teakorigin.Domain.Model;

    /// <summary>
    /// Retailer response model.
    /// </summary>
    /// <seealso cref="Teakorigin.App.Models.Response" />
    public class RetailerResponse : Response
    {
        /// <summary>
        /// Gets the data.
        /// </summary>
        /// <value>
        /// The data.
        /// </value>
        public List<Retailer> Data { get; internal set; }
    }
}