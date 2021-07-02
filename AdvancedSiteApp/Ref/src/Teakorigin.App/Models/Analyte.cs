// <copyright file="Analyte.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.App.Models
{
    using System.Globalization;
    using Newtonsoft.Json;

    /// <summary>
    /// The class for analyte.
    /// </summary>
    public class Analyte
    {
        /// <summary>
        /// Gets or sets the score.
        /// </summary>
        /// <value>
        /// The score.
        /// </value>
        public double? Score { get; set; }

        /// <summary>
        /// Gets or sets the recent scan.
        /// </summary>
        /// <value>
        /// The recent scan.
        /// </value>
        [JsonIgnore]
        public double? RecentScan { get; set; }

        /// <summary>
        /// Gets or sets the usda.
        /// </summary>
        /// <value>
        /// The usda.
        /// </value>
        [JsonIgnore]
        public double? Usda { get; set; }

        /// <summary>
        /// Gets the recent scan.
        /// </summary>
        /// <value>
        /// The recent scan.
        /// </value>
        [JsonProperty("recentScan")]
        public string RecentScanFormatted
        {
            get
            {
                return string.Format(CultureInfo.CurrentCulture, "{0:0.00}", this.RecentScan);
            }
        }

        /// <summary>
        /// Gets the usda.
        /// </summary>
        /// <value>
        /// The usda.
        /// </value>
        [JsonProperty("usda")]
        public string UsdaFormatted
        {
            get
            {
                return string.Format(CultureInfo.CurrentCulture, "{0:0.00}", this.Usda);
            }
        }

        /// <summary>
        /// Gets the status.
        /// </summary>
        /// <value>
        /// The status.
        /// </value>
        public Status Status
        {
            get
            {
                return this.Score >= 89.5 ? Status.Green : this.Score >= 69.5 ? Status.Yellow : Status.Red;
            }
        }

        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>
        public string Id
        {
            get; set;
        }

        /// <summary>
        /// Gets a value indicating whether [should add].
        /// </summary>
        /// <value>
        ///   <c>true</c> if [should add]; otherwise, <c>false</c>.
        /// </value>
        public bool ShouldAdd
        {
            get
            {
                return this.Usda.HasValue && this.Usda > 0;
            }
        }

        /// <summary>
        /// Gets or sets the uom.
        /// </summary>
        /// <value>
        /// The uom.
        /// </value>
        public string Uom
        {
            get; set;
        }
    }
}