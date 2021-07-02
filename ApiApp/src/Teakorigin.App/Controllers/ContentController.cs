// <copyright file="ContentController.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.App.Controllers
{
    using System.Net.Http;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Teakorigin.Domain.Interfaces;

    /// <summary>
    /// Content redirect controller.
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.ControllerBase" />
    [Route("api/v1/content/")]
    [ApiExplorerSettings(GroupName = @"Content")]
    [ApiController]
    public class ContentController : ControllerBase
    {
        private readonly IContentService contentService;

        /// <summary>
        /// Initializes a new instance of the <see cref="ContentController" /> class.
        /// </summary>
        /// <param name="contentService">The content service.</param>
        public ContentController(IContentService contentService)
        {
            this.contentService = contentService;
        }

        /// <summary>
        /// Gets the content from underlying CMS.
        /// </summary>
        /// <param name="keys">The comma separated keys for the collections for which content is needed. Default value is produce,locations,retailers.</param>
        /// <returns>
        /// Returns the content from brightspot CMS.
        /// </returns>
        [HttpGet]
        public async Task<dynamic> Get(string keys = "produce,locations,retailers")
        {
            var response = await this.contentService.GetData(keys).ConfigureAwait(false);
            var content = await response.Content.ReadAsAsync<dynamic>().ConfigureAwait(false);
            return content;
        }
    }
}
