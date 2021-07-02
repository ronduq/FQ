// <copyright file="PeriodRetailerData.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>
namespace Teakorigin.App.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using Newtonsoft.Json.Linq;
    using Teakorigin.Domain.Model;

    /// <summary>
    /// Graph data for a period.
    /// </summary>
    public class PeriodRetailerData
    {
        /// <summary>
        /// Gets or sets the ending period.
        /// </summary>
        /// <value>
        /// The ending period.
        /// </value>
        public DateTimeOffset PeriodEndDate { get; set; }

        /// <summary>
        /// Gets or sets the type of the trend.
        /// </summary>
        /// <value>
        /// The type of the trend.
        /// </value>
        public TrendType TrendType { get; set; }

        /// <summary>
        /// Gets the retailer ranks.
        /// </summary>
        /// <value>
        /// The retailer ranks.
        /// </value>
        public List<RetailerRanks> RetailerRanks { get; internal set; }

        /// <summary>
        /// Gets the graph data.
        /// </summary>
        /// <value>
        /// The graph data.
        /// </value>
        public JObject GraphData
        {
            get
            {
                if (!this.RetailerRanks.Any())
                {
                    return null;
                }

                var sb = new StringBuilder("{" + $"timestamp: {this.PeriodEndDate.ToUnixTimeMilliseconds()},");

                // Order by quality average so the result is more accurate.
                var data = this.RetailerRanks.OrderByDescending(x => x.QualAvg);

                if (this.TrendType == TrendType.Value)
                {
                    data = this.RetailerRanks.OrderBy(x => x.Value);
                }

                foreach (var retailer in data)
                {
                    var retailerCode = retailer.RetailerCode;
                    if (this.TrendType == TrendType.Quality)
                    {
                        int? locakVal = retailer.Quality;
                        if (locakVal.HasValue)
                        {
                            sb.Append($"\"{retailerCode}\":{locakVal},");
                        }
                        else
                        {
                            sb.Append($"\"{retailerCode}\":null,");
                        }
                    }
                    else if (this.TrendType == TrendType.Value)
                    {
                        long? locakVal = retailer.Value;
                        if (locakVal.HasValue)
                        {
                            sb.Append($"\"{retailerCode}\":{locakVal},");
                        }
                        else
                        {
                            sb.Append($"\"{retailerCode}\":null,");
                        }
                    }
                }

                sb.Append("}");

                return JObject.Parse(sb.ToString());
            }
        }
    }
}
