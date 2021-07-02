// <copyright file="UserController.cs" company="PlaceholderCompany">
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
    [Route("api/v1/user/")]
    [ApiExplorerSettings(GroupName = @"User")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ISubscriptionService subscriptionService;

        /// <summary>
        /// Initializes a new instance of the <see cref="UserController"/> class.
        /// </summary>
        /// <param name="subscriptionService">The subscription service.</param>
        public UserController(ISubscriptionService subscriptionService)
        {
            this.subscriptionService = subscriptionService;
        }

        /// <summary>
        /// Accepts the email for the subscribe action.
        /// </summary>
        /// <param name="email">The email.</param>
        /// <returns>
        /// Returns the content from brightspot CMS.
        /// </returns>
        [HttpPost("subscribe")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        [ProducesResponseType(404)]
        [ProducesResponseType(422)]
        [Produces("application/json")]
        public async Task<ActionResult> Subscribe([FromBody] string email)
        {
            var output = await this.subscriptionService.Subscribe(email).ConfigureAwait(false);
            if (output.StatusCode == System.Net.HttpStatusCode.Accepted)
            {
                return new JsonResult(true);
            }

            return new UnprocessableEntityResult();
        }
    }
}
