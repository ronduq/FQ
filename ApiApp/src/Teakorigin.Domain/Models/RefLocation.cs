﻿// <copyright file="RefLocation.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// <autogenerated />
// </copyright>
// <autogenerated />

namespace Teakorigin.Domain.Model
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class RefLocation
    {
        [Column("loc_id")]
        [Key]
        public long loc_id { get; set; }

        [Column("loc_entity")]
        public string loc_entity { get; set; }

        [Column("loc_entity_id")]
        public string loc_entity_id { get; set; }

        [Column("loc_location_type")]
        public string loc_location_type { get; set; }

        [Column("loc_location_format")]
        public string loc_location_format { get; set; }

        [Column("loc_address_1")]
        public string loc_address_1 { get; set; }

        [Column("loc_address_2")]
        public string loc_address_2 { get; set; }

        [Column("loc_zip_code")]
        public string loc_zip_code { get; set; }

        [Column("loc_city")]
        public string loc_city { get; set; }

        [Column("loc_state")]
        public string loc_state { get; set; }

        [Column("loc_province")]
        public string loc_province { get; set; }

        [Column("loc_country")]
        public string loc_country { get; set; }

        [Column("loc_code")]
        public string loc_code { get; set; }

        [Column("loc_name")]
        public string loc_name { get; set; }
    }
}
