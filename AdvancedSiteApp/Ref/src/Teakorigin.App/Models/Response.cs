// <copyright file="Response.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.App.Models
{
    /// <summary>
    /// Abstract class for response object.
    /// </summary>
    /// <seealso cref="Teakorigin.App.Models.IResponse" />
    public abstract class Response : IResponse
    {
        /// <summary>
        /// Gets or sets the criteria.
        /// </summary>
        /// <value>
        /// The criteria.
        /// </value>
        public Criteria Criteria { get; set; }

        /// <summary>
        /// Gets or sets the message.
        /// </summary>
        /// <value>
        /// The message.
        /// </value>
        public string Message { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether [did error].
        /// </summary>
        /// <value>
        ///   <c>true</c> if [did error]; otherwise, <c>false</c>.
        /// </value>
        public bool DidError { get; set; }

        /// <summary>
        /// Gets or sets the error.
        /// </summary>
        /// <value>
        /// The error.
        /// </value>
        public ErrorDetails ErrorDetails { get; set; }
    }
}