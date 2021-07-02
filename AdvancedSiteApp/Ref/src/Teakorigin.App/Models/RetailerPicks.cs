// <copyright file="RetailerPicks.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.App.Models
{
    using System.Collections.Generic;

    /// <summary>
    /// Top picks response class.
    /// </summary>
    /// <seealso cref="Teakorigin.App.Models.Response" />
    public class RetailerPicks
    {
        /// <summary>
        /// Gets or sets the retailer code.
        /// </summary>
        /// <value>
        /// The retailer code.
        /// </value>
        public string RetailerCode { get; set; }

        /// <summary>
        /// Gets or sets the quality average.
        /// </summary>
        /// <value>
        /// The quality average.
        /// </value>
        public string Score { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this instance is score value.
        /// </summary>
        /// <value>
        ///   <c>true</c> if this instance is score value; otherwise, <c>false</c>.
        /// </value>
        public bool IsSameRankValue { get; set; }

        /// <summary>
        /// Gets the data.
        /// </summary>
        /// <value>
        /// The data.
        /// </value>
        public List<TopPicks> TopPicks { get; internal set; }
    }
}