// <copyright file="LocationTopPicks.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.App.Models
{
    using System.Collections.Generic;

    /// <summary>
    /// Scan data response.
    /// </summary>
    /// <seealso cref="Teakorigin.App.Models.Response" />
    public class LocationTopPicks
    {
        /// <summary>
        /// Gets the top produce.
        /// </summary>
        /// <value>
        /// The top produce.
        /// </value>
        public List<TopPicks> TopPicks { get; internal set; }

        /// <summary>
        /// Gets the retailer top picks.
        /// </summary>
        /// <value>
        /// The retailer top picks.
        /// </value>
        public List<RetailerPicks> RetailerTopPicks { get; internal set; }
    }
}