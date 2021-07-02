// <copyright file="FileItem.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>
namespace Teakorigin.App.Models
{
    using System;

    /// <summary>
    /// File item.
    /// </summary>
    public class FileItem
    {
        /// <summary>
        /// Gets the name of the file.
        /// </summary>
        /// <value>
        /// The name of the file.
        /// </value>
        public string FileName { get; internal set; }

        /// <summary>
        /// Gets the file URL.
        /// </summary>
        /// <value>
        /// The file URL.
        /// </value>
        public Uri FileLink { get; internal set; }
    }
}
