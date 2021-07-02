// <copyright file="TopPicksDetailsResponse.cs" company="PlaceholderCompany">
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
    /// Top picks details.
    /// </summary>
    /// <seealso cref="Teakorigin.App.Models.Response" />
    public class TopPicksDetailsResponse : Response
    {
        /// <summary>
        /// Gets the data.
        /// </summary>
        /// <value>
        /// The data.
        /// </value>
        public List<TopPicksDetails> Data { get; internal set; }
    }
}