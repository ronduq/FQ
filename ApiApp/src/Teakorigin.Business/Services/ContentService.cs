// <copyright file="ContentService.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.Business.Services
{
    using System;
    using System.Globalization;
    using System.Net.Http;
    using System.Threading.Tasks;
    using Teakorigin.Domain.Interfaces;
    using Teakorigin.Domain.Models;

    /// <summary>
    /// Content service.
    /// </summary>
    /// <seealso cref="Teakorigin.Domain.Interfaces.IContentService" />
    public class ContentService : IContentService
    {
        private readonly HttpClient contentClient;
        private readonly AppSettings appSettings;

        /// <summary>
        /// Initializes a new instance of the <see cref="ContentService" /> class.
        /// </summary>
        /// <param name="contentClient">The content client.</param>
        /// <param name="appSettings">The application settings.</param>
        public ContentService(HttpClient contentClient, AppSettings appSettings)
        {
            this.contentClient = contentClient;
            this.appSettings = appSettings;
        }

        /// <summary>
        /// Gets the data.
        /// </summary>
        /// <param name="keys">The keys.</param>
        /// <returns>
        /// Returns data.
        /// </returns>
        public async Task<HttpResponseMessage> GetData(string keys)
        {
            var butterCMSLink = this.appSettings.ContentServiceConfig.ApiBaseAddressUrl;

            var response = await this.contentClient.GetAsync(string.Format(CultureInfo.InvariantCulture, butterCMSLink, keys)).ConfigureAwait(false);
            return response;
        }
    }
}
