// <copyright file="UploadController.cs" company="PlaceholderCompany">
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
    using EFCore.BulkExtensions;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Azure.Storage;
    using Microsoft.Azure.Storage.Blob;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Caching.Distributed;
    using Microsoft.Extensions.Logging;
    using Teakorigin.App.Constants;
    using Teakorigin.App.Extensions;
    using Teakorigin.App.Extentions;
    using Teakorigin.App.Models;
    using Teakorigin.DataAccess;
    using Teakorigin.Domain.Model;
    using Teakorigin.Domain.Models;

    /// <summary>
    /// Class for retailers.
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Controller" />
    [Authorize("Ingestion")]
    public class UploadController : Controller
    {
        private readonly TeakOriginContext context;
        private readonly AppSettings appSettings;
        private readonly IDistributedCache cache;
        private readonly ILogger<UploadController> logger;
        private readonly CloudBlobContainer cloudBlobContainer;

        /// <summary>
        /// Initializes a new instance of the <see cref="UploadController" /> class.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="appSettings">The application settings.</param>
        /// <param name="cache">The cache.</param>
        /// <param name="logger">The logger.</param>
        /// <exception cref="Exception">Storage string exception.</exception>
        public UploadController(TeakOriginContext context, AppSettings appSettings, IDistributedCache cache, ILogger<UploadController> logger)
        {
            this.context = context;
            this.appSettings = appSettings;
            this.cache = cache;
            this.logger = logger;

            // Check whether the connection string can be parsed.
            if (CloudStorageAccount.TryParse(appSettings?.AuthConfig?.BlobStorageConnectionString, out CloudStorageAccount storageAccount))
            {
                // Create the CloudBlobClient that represents the.
                // Blob storage endpoint for the storage account.
                CloudBlobClient cloudBlobClient = storageAccount.CreateCloudBlobClient();
                this.cloudBlobContainer = cloudBlobClient.GetContainerReference(this.appSettings.AuthConfig.IngestContainerName);
                this.cloudBlobContainer.CreateIfNotExistsAsync().ConfigureAwait(false);
            }
        }

        /// <summary>
        /// Indexes this instance.
        /// </summary>
        /// <returns>
        /// Returns the view.
        /// </returns>
        public async Task<IActionResult> Index()
        {
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
                }
            }
            while (blobContinuationToken != null); // Loop while the continuation token is not null.

            var viewModel = new UploadViewModel { FileBlobs = listBlobItem };

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
                if (await this.Process(file))
                {
                    // Purge the cache
                    await this.cache.ClearCache(CacheKeys.CacheColectionKey);
                    this.logger.LogTrace("Cache cleared trigged by location data file upload");

                    // Get a reference to the blob address, then upload the file to the blob.
                    // Use the value of localFileName for the blob name.
                    CloudBlockBlob cloudBlockBlob = this.cloudBlobContainer.GetBlockBlobReference(file.FileName);
                    await cloudBlockBlob.UploadFromStreamAsync(file.OpenReadStream()).ConfigureAwait(false);

                    this.logger.LogTrace($"File successfully uploaded! File name: {file.FileName}");
                    viewModel.UploadSuccessMessage = "File successfully uploaded";
                }
            }
            catch (Exception ex)
            {
                viewModel.UploadSuccess = false;
                viewModel.ErrorMessage = "Your file was not processed. There was an error parsing the csv file. Following are the specific details. \r\n" + ex.Message;
                this.logger.LogWarning("Upload data file was not processed", ex);
                return this.View(viewModel);
            }

            return this.View(viewModel);
        }

        /// <summary>
        /// Processes the specified file.
        /// </summary>
        /// <param name="file">The file.</param>
        /// <returns>Returned process file.</returns>
        public async Task<bool> Process(IFormFile file)
        {
            var scandataList = new List<ScanData>();
            using (var reader = new StreamReader(file?.OpenReadStream()))
            {
                using (var csv = new CsvReader(reader))
                {
                    var locations = await this.context.RefLocation.Where(x => 1 == 1).ToListAsync().ConfigureAwait(false);
                    var records = csv.GetRecords<CsvModel>();
                    foreach (var csvRecord in records.Where(x => x.md_location_id.HasValue))
                    {
                        // ScanData scanData = null; // this.context.ScanData.Find(csvRecord.md_row_id);
                        var location = locations.FirstOrDefault(x => x.loc_id == csvRecord.md_location_id);
                        try
                        {
                            var scanDataRecord = new ScanData
                            {
                                d_instrument = csvRecord.d_instrument,
                                d_model_version = csvRecord.d_model_version,
                                d_operator_id = csvRecord.d_operator_id,
                                d_scans_averaged = csvRecord.d_scans_averaged,
                                d_scan_type = csvRecord.d_scan_type,
                                d_transfer_function = csvRecord.d_transfer_function,

                                // Location code.
                                MdLocationCode = location.loc_code,
                                MdProduceCode = string.IsNullOrEmpty(csvRecord.md_food_subtype) ? csvRecord.md_food_type.Replace(" ", "-", StringComparison.OrdinalIgnoreCase).ToLowerInvariant() : (csvRecord.md_food_type + "-" + csvRecord.md_food_subtype).Replace(" ", "-", StringComparison.OrdinalIgnoreCase).ToLowerInvariant(),
                                MdScanDate = DateTime.ParseExact(csvRecord.md_scan_date, "yyyy/MM/dd HH:mm:ss", CultureInfo.InvariantCulture),
                                MdSupplier = location.loc_entity,
                                md_barcode = csvRecord.md_barcode,
                                md_brand_1 = csvRecord.md_brand_1,
                                md_brand_2 = csvRecord.md_brand_2,
                                md_row_id = csvRecord.md_row_id,
                                md_scan_date = DateTime.ParseExact(csvRecord.md_scan_date, "yyyy/MM/dd HH:mm:ss", CultureInfo.InvariantCulture).ToString("yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture),
                                md_collection_id = csvRecord.md_collection_id,
                                md_cultivar = csvRecord.md_cultivar,
                                md_external_ref = csvRecord.md_external_ref,
                                md_food_subtype = csvRecord.md_food_subtype,
                                md_food_type = csvRecord.md_food_type,
                                md_image_ref = csvRecord.md_image_ref,
                                md_location_id = csvRecord.md_location_id.Value,
                                md_loc_name = csvRecord.md_loc_name,
                                md_organic = csvRecord.md_organic,
                                md_origin_region = csvRecord.md_origin_region,
                                md_origin_sub_region = csvRecord.md_origin_sub_region,
                                md_package_type = csvRecord.md_package_type,
                                md_price = csvRecord.md_price,
                                md_price_by = csvRecord.md_price_by,
                                md_processing_code = csvRecord.md_processing_code,
                                md_purch_currency = csvRecord.md_purch_currency,
                                md_purch_price = csvRecord.md_purch_price,
                                md_quantity = csvRecord.md_quantity,
                                md_receipt_ref = csvRecord.md_receipt_ref,
                                md_scan_type = csvRecord.md_scan_type,
                                md_sell_by_date = DateTime.TryParseExact(csvRecord.md_sell_by_date, "yyyy/MM/dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime hD) ? hD : DateTime.MinValue,
                                md_value = csvRecord.md_value,
                                md_weight = csvRecord.md_weight,
                                md_weight_uom = csvRecord.md_weight_uom,
                                p_anthocyanins = csvRecord.p_anthocyanins,
                                p_antioxidants = csvRecord.p_antioxidants,
                                p_carotenoids = csvRecord.p_carotenoids,
                                p_citric_acid = csvRecord.p_citric_acid,
                                p_classifier = csvRecord.p_classifier,
                                p_defect_indicator = csvRecord.p_defect_indicator,
                                p_defect_percent = csvRecord.p_defect_percent.PercentToDouble(),
                                p_fructose = csvRecord.p_fructose,
                                p_glucose = csvRecord.p_glucose,
                                p_linoleic = csvRecord.p_linoleic,
                                p_lutein = csvRecord.p_lutein,
                                p_lycopene = csvRecord.p_lycopene,
                                p_malic_acid = csvRecord.p_malic_acid,
                                p_moisture = csvRecord.p_moisture,
                                p_oil_total = csvRecord.p_oil_total,
                                p_oleic = csvRecord.p_oleic,
                                p_oxalic_acid = csvRecord.p_oxalic_acid,
                                p_palmitic = csvRecord.p_palmitic,
                                p_palmitoleic = csvRecord.p_palmitoleic,
                                p_sucrose = csvRecord.p_sucrose,
                                p_vit_c = csvRecord.p_vit_c,
                                p_tartaric = csvRecord.p_tartaric,
                                s_anthocyanins = csvRecord.s_anthocyanins.PercentToDouble(),
                                s_antioxidants = csvRecord.s_antioxidants.PercentToDouble(),
                                s_carotenoids = csvRecord.s_carotenoids.PercentToDouble(),
                                s_citric_acid = csvRecord.s_citric_acid.PercentToDouble(),
                                s_fructose = csvRecord.s_fructose.PercentToDouble(),
                                s_glucose = csvRecord.s_glucose.PercentToDouble(),
                                s_linoleic = csvRecord.s_linoleic.PercentToDouble(),
                                s_lutein = csvRecord.s_lutein.PercentToDouble(),
                                s_lycopene = csvRecord.s_lycopene.PercentToDouble(),
                                s_malic_acid = csvRecord.s_malic_acid.PercentToDouble(),
                                s_moisture = csvRecord.s_moisture.PercentToDouble(),
                                s_oil_total = csvRecord.s_oil_total.PercentToDouble(),
                                s_oleic = csvRecord.s_oleic.PercentToDouble(),
                                s_overall = csvRecord.s_overall.PercentToDouble(),
                                s_oxalic_acid = csvRecord.s_oxalic_acid.PercentToDouble(),
                                s_palmitic = csvRecord.s_palmitic.PercentToDouble(),
                                s_palmitoleic = csvRecord.s_palmitoleic.PercentToDouble(),
                                s_sucrose = csvRecord.s_sucrose.PercentToDouble(),
                                s_tartaric = csvRecord.s_tartaric.PercentToDouble(),
                                s_vit_c = csvRecord.s_vit_c.PercentToDouble(),
                                p_potassium = csvRecord.p_potassium,
                                s_potassium = csvRecord.s_potassium.PercentToDouble(),
                                md_food_score_type = csvRecord.md_food_score_type,
                            };

                            scandataList.Add(scanDataRecord);
                        }
                        catch (Exception ex)
                        {
                            this.logger.LogError("Error processing file", ex);
                            throw;
                        }
                    }
                }
            }

            this.context.BulkInsertOrUpdate<ScanData>(scandataList);
            return true;
        }
    }
}
