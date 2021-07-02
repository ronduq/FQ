// <copyright file="PeriodProduceData.cs" company="PlaceholderCompany">
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
    public class PeriodProduceData
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
        public Dictionary<string, RetailerRanks> RetailerRanksPerProduce { get; internal set; }

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
                if (!this.RetailerRanksPerProduce.Any())
                {
                    return null;
                }

                var sb = new StringBuilder("{" + $"timestamp: {this.PeriodEndDate.ToUnixTimeMilliseconds()},");

                // Order by quality average so the result is more accurate.
                var data = this.RetailerRanksPerProduce.OrderByDescending(x => x.Value.QualAvg);

                if (this.TrendType == TrendType.Value)
                {
                    data = this.RetailerRanksPerProduce.OrderBy(x => x.Value.Value);
                }

                foreach (var retailer in data)
                {
                    if (this.TrendType == TrendType.Quality)
                    {
                        int? locakVal = retailer.Value?.Quality;
                        if (locakVal.HasValue)
                        {
                            sb.Append($"\"{retailer.Key}\":{locakVal},");
                        }
                        else
                        {
                            sb.Append($"\"{retailer.Key}\":null,");
                        }
                    }
                    else if (this.TrendType == TrendType.Value)
                    {
                        long? locakVal = retailer.Value?.Value;
                        if (locakVal.HasValue)
                        {
                            sb.Append($"\"{retailer.Key}\":{locakVal},");
                        }
                        else
                        {
                            sb.Append($"\"{retailer.Key}\":null,");
                        }
                    }
                }

                sb.Append("}");
                var json = JObject.Parse(sb.ToString());

                return json;
            }
        }
    }
}
