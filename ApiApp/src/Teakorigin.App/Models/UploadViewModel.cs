// <copyright file="UploadViewModel.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.App.Models
{
    using System.Collections.Generic;
    using Microsoft.Azure.Storage.Blob;

    /// <summary>
    /// Upload view model class.
    /// </summary>
    public class UploadViewModel
    {
        /// <summary>
        /// Gets the file blobs.
        /// </summary>
        /// <value>
        /// The file blobs.
        /// </value>
        public List<IListBlobItem> FileBlobs { get; internal set; }

        /// <summary>
        /// Gets or sets a value indicating whether [upload success].
        /// </summary>
        /// <value>
        ///   <c>true</c> if [upload success]; otherwise, <c>false</c>.
        /// </value>
        public bool UploadSuccess { get; set; }

        /// <summary>
        /// Gets or sets the error message.
        /// </summary>
        /// <value>
        /// The error message.
        /// </value>
        public string ErrorMessage { get; set; }

        /// <summary>
        /// Gets the file items.
        /// </summary>
        /// <value>
        /// The file items.
        /// </value>
        public List<FileItem> FileItems
        {
            get
            {
                var listFileItem = new List<FileItem>();
                foreach (var blobItem in this.FileBlobs)
                {
                    var urlSplit = blobItem.Uri.AbsoluteUri.Split('/');
                    var fileName = urlSplit[urlSplit.Length - 1];
                    listFileItem.Add(new FileItem { FileLink = blobItem.Uri, FileName = fileName });
                }

                return listFileItem;
            }
        }

        /// <summary>
        /// Gets the upload success message.
        /// </summary>
        /// <value>
        /// The upload success message.
        /// </value>
        public string UploadSuccessMessage { get; internal set; }
    }
}
