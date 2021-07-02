// <copyright file="CacheViewModel.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.Advanced.App.Models
{
    using System.Collections.Generic;

    /// <summary>
    /// Cache view model class.
    /// </summary>
    public class CacheViewModel
    {
        /// <summary>
        /// Gets the file blobs.
        /// </summary>
        /// <value>
        /// The file blobs.
        /// </value>
        public List<string> CacheList { get; internal set; }

        /// <summary>
        /// Gets or sets the error message.
        /// </summary>
        /// <value>
        /// The error message.
        /// </value>
        public string ErrorMessage { get; set; }

        /// <summary>
        /// Gets the upload success message.
        /// </summary>
        /// <value>
        /// The upload success message.
        /// </value>
        public string SuccessMessage { get; internal set; }
    }
}
