// <copyright file="SendgridSubscriptionService.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.Business.Services
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.IO;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Text;
    using System.Threading.Tasks;
    using Newtonsoft.Json;
    using Teakorigin.Domain.Interfaces;
    using Teakorigin.Domain.Models;
    using Teakorigin.Domain.Models.Payloads;

    /// <summary>
    /// Content service.
    /// </summary>
    /// <seealso cref="Teakorigin.Domain.Interfaces.IContentService" />
    public class SendgridSubscriptionService : ISubscriptionService
    {
        private readonly HttpClient subscriptionClient;
        private readonly AppSettings appSettings;

        /// <summary>
        /// Initializes a new instance of the <see cref="SendgridSubscriptionService"/> class.
        /// </summary>
        /// <param name="subscriptionClient">The subscription client.</param>
        /// <param name="appSettings">The application settings.</param>
        public SendgridSubscriptionService(HttpClient subscriptionClient, AppSettings appSettings)
        {
            this.subscriptionClient = subscriptionClient;
            this.appSettings = appSettings;
        }

        /// <summary>
        /// Gets the data.
        /// </summary>
        /// <param name="email">The email.</param>
        /// <returns>
        /// Returns data.
        /// </returns>
        /// <exception cref="Exception">Subscription service config incorrect.</exception>
        public async Task<HttpResponseMessage> Subscribe(string email)
        {
            var subscriptionLink = this.appSettings.SubscriptionServiceUrl;
            this.subscriptionClient.DefaultRequestHeaders.Authorization = AuthenticationHeaderValue.Parse(this.appSettings.SubscriptionToken);

            if (string.IsNullOrEmpty(subscriptionLink))
            {
                throw new Exception(Domain.Constants.StringConstants.ConfigError);
            }

            var subscriptionPayload = new SubscriptionPayload() { ListIds = new List<string> { this.appSettings.SubscriptionListId }, Contacts = new List<Contact> { new Contact { Email = email } } };

            // Wrap our JSON inside a StringContent which then can be used by the HttpClient class
            using (var httpContent = new StringContent(JsonConvert.SerializeObject(subscriptionPayload), Encoding.UTF8, "application/json"))
            {
                httpContent.Headers.ContentType.CharSet = string.Empty;
                var response = await this.subscriptionClient.PutAsync(new Uri(subscriptionLink), httpContent).ConfigureAwait(false);
                return response;
            }
        }
    }
}
