// <copyright file="Retailer.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>
// <autogenerated />

namespace Teakorigin.Domain.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using Newtonsoft.Json;

    [Serializable]
    public partial class Retailer
    {
        public Retailer()
        {
            this.LocationRetailer = new HashSet<LocationRetailer>();
        }

        public string RetailerCode { get; set; }

        [JsonIgnore]
        public long Id { get; set; }

        public string RetailerName { get; set; }

        [JsonIgnore]
        public virtual ICollection<LocationRetailer> LocationRetailer { get; set; }

        [MaxLength(10)]
        public string Colour { get; set; }

        /// <summary>
        /// Gets the identifier. Only required for frontend. Same as Retailer Code.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>
        [NotMapped]
        [JsonProperty("id")]
        public string ProduceId
        {
            get
            {
                return this.RetailerCode;
            }
        }
    }
}
