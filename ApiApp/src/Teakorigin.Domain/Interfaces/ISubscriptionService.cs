// <copyright file="ISubscriptionService.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>
namespace Teakorigin.Domain.Interfaces
{
    using System.Net.Http;
    using System.Threading.Tasks;

    /// <summary>
    /// Content Service.
    /// </summary>
    public interface ISubscriptionService
    {
        /// <summary>
        /// Gets the data.
        /// </summary>
        /// <param name="email">The email.</param>
        /// <returns>
        /// Returns data.
        /// </returns>
        Task<HttpResponseMessage> Subscribe(string email);
    }
}
