// <copyright file="ProduceResponse.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.App.Models
{
    using System.Collections.Generic;
    using Teakorigin.Domain.Model;

    /// <summary>
    /// Produce response.
    /// </summary>
    /// <seealso cref="Teakorigin.App.Models.Response" />
    public class ProduceResponse : Response
    {
        /// <summary>
        /// Gets the data.
        /// </summary>
        /// <value>
        /// The data.
        /// </value>
        public List<Produce> Data { get; internal set; }
    }
}