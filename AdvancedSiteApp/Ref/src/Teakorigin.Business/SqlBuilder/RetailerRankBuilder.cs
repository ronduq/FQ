// <copyright file="RetailerRankBuilder.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.Business.SqlBuilder
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Text;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using Teakorigin.DataAccess;
    using Teakorigin.Domain.Model;

    /// <summary>
    /// Retailer rank query builder.
    /// </summary>
    public class RetailerRankBuilder
    {
        private readonly TeakOriginContext context;
        private readonly StringBuilder baseQuery;

        /// <summary>
        /// Initializes a new instance of the <see cref="RetailerRankBuilder" /> class.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="location">The location.</param>
        /// <param name="fromDate">From date.</param>
        /// <param name="toDate">To date.</param>
        /// <param name="produceCodes">The produce codes.</param>
        public RetailerRankBuilder(TeakOriginContext context, string location, DateTime fromDate, DateTime toDate, string produceCodes = null)
        {
            var from = fromDate.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);
            var to = toDate.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);
            var produceCodesCsv = string.Empty;
            if (produceCodes != null)
            {
                var produceCodeCsv = new StringBuilder();

                var produceCodeList = produceCodes?.Split(',', StringSplitOptions.RemoveEmptyEntries);

                foreach (var produce in produceCodeList)
                {
                    produceCodeCsv.Append("'" + produce + "',");
                }

                produceCodeCsv.Remove(produceCodeCsv.Length - 1, 1);

                produceCodesCsv = produceCodeCsv.ToString();
            }

            this.context = context;
            this.baseQuery = new StringBuilder(@"SELECT prodRetail.[md_Supplier] AS RetailerCode, AVG(QualAvg) AS QualAvg, SUM(ValueRank) AS TotalValueRank, RANK() OVER (ORDER BY SUM(ValueRank) ASC) ActualValueRank, prodRetail.md_LocationCode as LocationCode, PerceptionScore
                    FROM   (SELECT [md_Supplier], [md_ProduceCode], Avg([s_overall]) AS QualAvg, AVG([md_value]) AS ValueAvg, md_LocationCode, RANK() OVER (PARTITION BY [md_ProduceCode]
                                 ORDER BY AVG(md_value) DESC) ValueRank
                    FROM  [ScanData]
                    WHERE [ScanData].[md_LocationCode] = '" + location + @"' AND [md_ScanDate] BETWEEN '" + from + @"' AND '" + to + @"' AND md_scan_type = 'guide'");
            if (produceCodes != null)
            {
                this.baseQuery.Append(@" AND md_ProduceCode in (" + produceCodesCsv + @")");
            }
        }

        /// <summary>
        /// Finalises this instance.
        /// </summary>
        /// <returns>Returns finalised query.</returns>
        public RetailerRankBuilder Finalise()
        {
            this.baseQuery.Append(@" GROUP BY md_LocationCode, [md_ProduceCode], [md_Supplier]) prodRetail, [CustomerPerception] CustomerPerception
                    where prodRetail.md_LocationCode = CustomerPerception.LocationCode AND
                    prodRetail.md_Supplier = CustomerPerception.RetailerCode
                    GROUP BY prodRetail.md_LocationCode, prodRetail.[md_Supplier], PerceptionScore");

            return this;
        }

        /// <summary>
        /// Gets the retailer ranks.
        /// </summary>
        /// <returns>Returns the retailer ranks.</returns>
        public async Task<List<RetailerRanks>> GetRetailerRanks()
        {
            var scans = await this.context.RetailerRanks.FromSql(this.baseQuery.ToString()).AsNoTracking().ToListAsync().ConfigureAwait(false);
            return scans;
        }
    }
}
