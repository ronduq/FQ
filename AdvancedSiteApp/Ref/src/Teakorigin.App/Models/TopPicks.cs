// <copyright file="TopPicks.cs" company="PlaceholderCompany">
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
    /// Top picks class.
    /// </summary>
    public class TopPicks
    {
        /// <summary>
        /// Gets or sets the produce code.
        /// </summary>
        /// <value>
        /// The produce code.
        /// </value>
        public string ProduceCode { get; set; }

        /// <summary>
        /// Gets or sets the retailer code.
        /// </summary>
        /// <value>
        /// The retailer code.
        /// </value>
        public string RetailerCode { get; set; }

        /// <summary>
        /// Gets or sets the quality.
        /// </summary>
        /// <value>
        /// The quality.
        /// </value>
        public int Quality { get; set; }

        /// <summary>
        /// Gets or sets the qual average.
        /// </summary>
        /// <value>
        /// The qual average.
        /// </value>
        public double QualAvg { get; set; }

        /// <summary>
        /// Gets or sets the value.
        /// </summary>
        /// <value>
        /// The value.
        /// </value>
        public long Value { get; set; }

        /// <summary>
        /// Gets or sets the perception score.
        /// </summary>
        /// <value>
        /// The perception score.
        /// </value>
        public int PerceptionScore { get; set; }

        /// <summary>
        /// Gets or sets the relevant scan data.
        /// </summary>
        /// <value>
        /// The relevant scan data.
        /// </value>
        [JsonIgnore]
        public IEnumerable<ScanData> RelevantScanData { get; set; }

        /// <summary>
        /// Gets or sets the analyte uom.
        /// </summary>
        /// <value>
        /// The analyte uom.
        /// </value>
        [JsonIgnore]
        public IEnumerable<AnalyteUom> AnalyteUom { get; set; }

        /// <summary>
        /// Gets the countries of origin.
        /// </summary>
        /// <value>
        /// The countries of origin.
        /// </value>
        public List<CountryOfOrigin> CountriesOfOrigin
        {
            get
            {
                return this.RelevantScanData.Where(x => !string.IsNullOrEmpty(x.CountryOfOrigin)).GroupBy(x => new { x.CountryOfOrigin, x.IsOrganic }).Select(x => new CountryOfOrigin { CountryName = x.Key.CountryOfOrigin, IsOrganic = x.Key.IsOrganic }).ToList();
            }
        }

        /// <summary>
        /// Gets the scan date time.
        /// </summary>
        /// <value>
        /// The scan date time.
        /// </value>
        public DateTime? ScanDateTime
        {
            get
            {
                return this.RelevantScanData.MaxBy(x => x.MdScanDate).FirstOrDefault()?.MdScanDate;
            }
        }

        /// <summary>
        /// Gets the scan date.
        /// </summary>
        /// <value>
        /// The scan date.
        /// </value>
        public string ScanDate
        {
            get
            {
                if (this.ScanDateTime != null)
                {
                    return this.ScanDateTime.Value.ToString("MM/dd/yyyy", CultureInfo.InvariantCulture);
                }

                return string.Empty;
            }
        }

        /// <summary>
        /// Gets the scan time.
        /// </summary>
        /// <value>
        /// The scan time.
        /// </value>
        public string ScanTime
        {
            get
            {
                if (this.ScanDateTime != null)
                {
                    return this.ScanDateTime.Value.ToString("hh:mm tt", CultureInfo.InvariantCulture);
                }

                return string.Empty;
            }
        }
    }
}