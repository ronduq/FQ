// <copyright file="Criteria.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.App.Models
{
    using System.Collections.Generic;

    /// <summary>
    /// The criteria.
    /// </summary>
    public class Criteria
    {
        /// <summary>
        /// Gets or sets the location code.
        /// </summary>
        /// <value>
        /// The location code.
        /// </value>
        public string LocationCode { get; set; }

        /// <summary>
        /// Gets or sets the sort by.
        /// </summary>
        /// <value>
        /// The sort by.
        /// </value>
        public SortBy SortBy { get; set; }

        /// <summary>
        /// Gets or sets the sort direction.
        /// </summary>
        /// <value>
        /// The sort direction.
        /// </value>
        public SortDirection SortDirection { get; set; }

        /// <summary>
        /// Gets the produce codes.
        /// </summary>
        /// <value>
        /// The produce codes.
        /// </value>
        public List<string> ProduceCodes { get; internal set; }

        /// <summary>
        /// Gets the retailer codes.
        /// </summary>
        /// <value>
        /// The retailer codes.
        /// </value>
        public List<string> RetailerCodes { get; internal set; }
    }
}