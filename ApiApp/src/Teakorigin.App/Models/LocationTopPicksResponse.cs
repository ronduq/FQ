// <copyright file="LocationTopPicksResponse.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.App.Models
{
    /// <summary>
    /// Scan data response.
    /// </summary>
    /// <seealso cref="Teakorigin.App.Models.Response" />
    public class LocationTopPicksResponse : Response
    {
        /// <summary>
        /// Gets the data.
        /// </summary>
        /// <value>
        /// The data.
        /// </value>
        public LocationTopPicks Data { get; internal set; }
    }
}