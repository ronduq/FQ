// <copyright file="IContentService.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>
namespace Teakorigin.Domain.Interfaces
{
    using System.Net.Http;
    using System.Threading.Tasks;

    /// <summary>
    /// Content Service.
    /// </summary>
    public interface IContentService
    {
        /// <summary>
        /// Gets the data.
        /// </summary>
        /// <param name="relativePath">The relative path.</param>
        /// <returns>
        /// Returns data.
        /// </returns>
        Task<HttpResponseMessage> GetData(string relativePath);
    }
}
