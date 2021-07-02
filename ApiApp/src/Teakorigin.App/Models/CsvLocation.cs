﻿// <copyright file="CsvLocation.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>
// <autogenerated />

namespace Teakorigin.App.Models
{
    using System;
    using CsvHelper.Configuration;

    public class CsvLocationModel
    {
        public int loc_id { get; set; }
        public string loc_entity { get; set; }
        public string loc_name { get; set; }
        public int? loc_entity_id { get; set; }
        public string loc_code { get; set; }
        public string loc_location_type { get; set; }
        public string loc_location_format { get; set; }
        public string loc_address_1 { get; set; }
        public string loc_address_2 { get; set; }
        public string loc_zip_code { get; set; }
        public string loc_city { get; set; }
        public string loc_state { get; set; }
        public string loc_province { get; set; }
        public string loc_country { get; set; }
    }

    public class ModelClassMapLocation : ClassMap<CsvLocationModel>
    {
        public ModelClassMapLocation()
        {
            this.Map(m => m.loc_id).Name("loc_id");
            this.Map(m => m.loc_entity).Name("loc_entity");
            this.Map(m => m.loc_name).Name("loc_name");
            this.Map(m => m.loc_entity_id).Name("loc_entity_id");
            this.Map(m => m.loc_code).Name("loc_code");
            this.Map(m => m.loc_location_type).Name("loc_location_type");
            this.Map(m => m.loc_location_format).Name("loc_location_format");
            this.Map(m => m.loc_address_1).Name("loc_address_1");
            this.Map(m => m.loc_address_2).Name("loc_address_2");
            this.Map(m => m.loc_zip_code).Name("loc_zip_code");
            this.Map(m => m.loc_city).Name("loc_city");
            this.Map(m => m.loc_state).Name("loc_state");
            this.Map(m => m.loc_province).Name("loc_province");
            this.Map(m => m.loc_country).Name("loc_country");
        }
    }

}
