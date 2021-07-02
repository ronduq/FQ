// <copyright file="GraphDataResponse.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.App.Models
{
    using System.Collections.Generic;
    using Newtonsoft.Json.Linq;

    /// <summary>
    /// Graph data model.
    /// </summary>
    /// <seealso cref="Teakorigin.App.Models.Response" />
    public class GraphDataResponse : Response
    {
        /// <summary>
        /// Gets the data.
        /// </summary>
        /// <value>
        /// The data.
        /// </value>
        public List<JObject> Data { get; internal set; }
    }
}