// <copyright file="CustomerPerception.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.Domain.Model
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Class for customer perception.
    /// </summary>
    public partial class CustomerPerception
    {
        /// <summary>
        /// Gets or sets the perception identifier.
        /// </summary>
        /// <value>
        /// The perception identifier.
        /// </value>
        public int PerceptionId { get; set; }

        /// <summary>
        /// Gets or sets the location code.
        /// </summary>
        /// <value>
        /// The location code.
        /// </value>
        public string LocationCode { get; set; }

        /// <summary>
        /// Gets or sets the retailer code.
        /// </summary>
        /// <value>
        /// The retailer code.
        /// </value>
        public string RetailerCode { get; set; }

        /// <summary>
        /// Gets or sets the perception score.
        /// </summary>
        /// <value>
        /// The perception score.
        /// </value>
        public int PerceptionScore { get; set; }
    }
}
