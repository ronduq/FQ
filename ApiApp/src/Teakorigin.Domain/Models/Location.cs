﻿// <copyright file="Location.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>
// <autogenerated />

namespace Teakorigin.Domain.Model
{
    using System;
    using System.Collections.Generic;
    using Newtonsoft.Json;

    public partial class Location
    {
        public Location()
        {
            this.LocationProduce = new HashSet<LocationProduce>();
            this.LocationRetailer = new HashSet<LocationRetailer>();
        }

        public string LocationCode { get; set; }

        public long Id { get; set; }

        public string LocationName { get; set; }

        [JsonIgnore]
        public virtual ICollection<LocationProduce> LocationProduce { get; set; }

        [JsonIgnore]
        public virtual ICollection<LocationRetailer> LocationRetailer { get; set; }
    }
}
