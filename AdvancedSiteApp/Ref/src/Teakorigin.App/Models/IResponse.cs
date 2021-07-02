﻿// <copyright file="IResponse.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>
// <autogenerated />

namespace Teakorigin.App.Models
{
    /// <summary>
    /// Response interface.
    /// </summary>
    public interface IResponse
    {
        /// <summary>
        /// Gets or sets the criteria.
        /// </summary>
        /// <value>
        /// The criteria.
        /// </value>
        Criteria Criteria { get; set; }

        /// <summary>
        /// Gets or sets the message.
        /// </summary>
        /// <value>
        /// The message.
        /// </value>
        string Message { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether [did error].
        /// </summary>
        /// <value>
        ///   <c>true</c> if [did error]; otherwise, <c>false</c>.
        /// </value>
        bool DidError { get; set; }

        /// <summary>
        /// Gets or sets the error.
        /// </summary>
        /// <value>
        /// The error.
        /// </value>
        ErrorDetails ErrorDetails { get; set; }
    }

    public enum Status
    {
        Red,
        Green,
        Yellow
    }

    public enum SortDirection
    {
        ASC,
        DSC
    }

    public enum TrendType
    {
        Quality,
        Value
    }

    public enum TrendFrequency
    {
        Weekly,
        Monthly
    }

    public enum SortBy
    {
        Quality,
        Value,
        Perception,
    }
}