// <copyright file="LocationUploadController.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.App.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using CsvHelper;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Azure.Storage;
    using Microsoft.Azure.Storage.Blob;
    using Microsoft.Extensions.Caching.Distributed;
    using Microsoft.Extensions.Logging;
    using Teakorigin.App.Constants;
    using Teakorigin.App.Extensions;
    using Teakorigin.App.Models;
    using Teakorigin.DataAccess;
    using Teakorigin.Domain.Model;
    using Teakorigin.Domain.Models;

    /// <summary>
    /// Class for retailers.
    /// </summary>
    [Microsoft.AspNetCore.Authorization.Authorize]
    public class LocationUploadController : Controller
    {
        private readonly TeakOriginContext context;
        private readonly AppSettings appSettings;
        private readonly IDistributedCache cache;
        private readonly ILogger<LocationUploadController> logger;
        private readonly CloudBlobContainer cloudBlobContainer;

        /// <summary>
        /// Initializes a new instance of the <see cref="LocationUploadController" /> class.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="appSettings">The application settings.</param>
        /// <param name="cache">The cache.</param>
        /// <param name="logger">The logger.</param>
        /// <exception cref="Exception">Storage string exception.</exception>
        public LocationUploadController(TeakOriginContext context, AppSettings appSettings, IDistributedCache cache, ILogger<LocationUploadController> logger)
        {
            this.context = context;
            this.appSettings = appSettings;
            this.cache = cache;
            this.logger = logger;

            // Check whether the connection string can be parsed.
            if (!CloudStorageAccount.TryParse(appSettings?.AuthConfig.BlobStorageConnectionString, out CloudStorageAccount storageAccount))
            {
                throw new Exception();
            }

            // Create the CloudBlobClient that represents the.
            // Blob storage endpoint for the storage account.
            CloudBlobClient cloudBlobClient = storageAccount.CreateCloudBlobClient();
            this.cloudBlobContainer = cloudBlobClient.GetContainerReference(this.appSettings.AuthConfig.IngestContainerName);
            this.cloudBlobContainer.CreateIfNotExistsAsync().ConfigureAwait(false);
        }

        /// <summary>
        /// Indexes this instance.
        /// </summary>
        /// <returns>Returns the view.</returns>
        public IActionResult Index()
        {
            if (!this.User.Claims.Any(x => x.Type == "groups" && x.Value == this.appSettings.AuthConfig.IngestorGroupId))
            {
                return new StatusCodeResult(StatusCodes.Status401Unauthorized);
            }

            var viewModel = new UploadViewModel();

            return this.View(viewModel);
        }

        /// <summary>
        /// Indexes the specified file.
        /// </summary>
        /// <param name="file">The file.</param>
        /// <returns>Returns message if file sucessfully uploaded.</returns>
        [HttpPost]
        public async Task<IActionResult> Index(IFormFile file)
        {
            if (!this.User.Claims.Any(x => x.Type == "groups" && x.Value == this.appSettings.AuthConfig.IngestorGroupId))
            {
                return new StatusCodeResult(StatusCodes.Status401Unauthorized);
            }

            var listBlobItem = new List<IListBlobItem>();

            // List the blobs in the container.
            BlobContinuationToken blobContinuationToken = null;
            do
            {
                var results = await this.cloudBlobContainer.ListBlobsSegmentedAsync(null, blobContinuationToken).ConfigureAwait(false);

                // Get the value of the continuation token returned by the listing call.
                blobContinuationToken = results.ContinuationToken;
                foreach (IListBlobItem item in results.Results)
                {
                    listBlobItem.Add(item);
                    if (listBlobItem.Count > 19)
                    {
                        break;
                    }
                }
            }
            while (blobContinuationToken != null && listBlobItem.Count < 20); // Loop while the continuation token is not null.

            var viewModel = new UploadViewModel { FileBlobs = listBlobItem };

            if (file == null || !file.FileName.EndsWith(".csv", true, CultureInfo.InvariantCulture) || file.Length < 1)
            {
                var vm = new UploadViewModel { FileBlobs = listBlobItem };
                vm.UploadSuccess = false;
                vm.ErrorMessage = "Invalid file. Empty or non CSV files are not allowed.";
                return this.View(vm);
            }

            if (viewModel.FileItems.Any(x => x.FileName == file.FileName))
            {
                viewModel.UploadSuccess = false;
                viewModel.ErrorMessage = "File with this name already exists.";
                return this.View(viewModel);
            }

            try
            {
                if (await this.Process(file).ConfigureAwait(false))
                {
                    this.logger.LogTrace($"File successfully uploaded! File name: {file.FileName}");
                    viewModel.UploadSuccessMessage = "File successfully uploaded";
                }
            }
            catch (Exception ex)
            {
                viewModel.UploadSuccess = false;
                viewModel.ErrorMessage = "Your file was not processed. There was an error parsing the csv file. Following are the specific details. \r\n" + ex.Message;
                this.logger.LogWarning("Upload location data file was not processed", ex);
                return this.View(viewModel);
            }

            return this.View(viewModel);
        }

        /// <summary>
        /// Processes this instance.
        /// </summary>
        /// <returns>rETURNS TRUE OR FALSE.</returns>
        private async Task<bool> Process(IFormFile file)
        {
            var newLocationList = new List<RefLocation>();

            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                using (var csv = new CsvReader(reader))
                {
                    var records = csv.GetRecords<CsvLocationModel>().Where(x => x.loc_id > 0).ToList();

                    foreach (var csvRecord in records)
                    {
                        try
                        {
                            var record = new RefLocation
                            {
                                loc_id = csvRecord.loc_id,
                                loc_entity = csvRecord.loc_entity,
                                loc_entity_id = csvRecord.loc_entity_id.ToString(),
                                loc_location_type = csvRecord.loc_location_type,
                                loc_location_format = csvRecord.loc_location_format,
                                loc_address_1 = csvRecord.loc_address_1,
                                loc_address_2 = csvRecord.loc_address_2,
                                loc_zip_code = csvRecord.loc_zip_code,
                                loc_state = csvRecord.loc_state,
                                loc_province = csvRecord.loc_province,
                                loc_code = csvRecord.loc_code,
                                loc_name = csvRecord.loc_name,
                            };

                            newLocationList.Add(record);
                        }
                        catch (Exception ex)
                        {
                            this.logger.LogError("Error processing file", ex);
                            throw;
                        }
                    }

                    // Get a reference to the blob address, then upload the file to the blob.
                    // Use the value of localFileName for the blob name.
                    CloudBlockBlob cloudBlockBlob = this.cloudBlobContainer.GetBlockBlobReference(file.FileName);
                    await cloudBlockBlob.UploadFromStreamAsync(file.OpenReadStream()).ConfigureAwait(false);
                }
            }

            // remove old and update with new records
            this.context.RefLocation.RemoveRange(this.context.RefLocation.ToList());
            this.context.RefLocation.AddRange(newLocationList);
            this.context.SaveChanges();

            // Purge the cache
            await this.cache.ClearCache(CacheKeys.CacheColectionKey);
            this.logger.LogTrace("Cache cleared trigged by data file upload");

            return true;
        }
    }
}