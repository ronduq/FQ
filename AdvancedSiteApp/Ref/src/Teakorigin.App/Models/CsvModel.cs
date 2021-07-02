﻿// <copyright file="CsvModel.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// <autogenerated />
// </copyright>
namespace Teakorigin.App.Models
{
    using CsvHelper.Configuration;
    using System;

    /// <summary>
    /// Csv model
    /// </summary>
    public class CsvModel
    {
        public string md_row_id { get; set; }
        public string md_processing_code { get; set; }
        public string md_scan_type { get; set; }
        public string md_barcode { get; set; }
        public string md_scan_date { get; set; }
        public string md_collection_id { get; set; }
        public string md_receipt_ref { get; set; }
        public string md_image_ref { get; set; }
        public string md_external_ref { get; set; }
        public long? md_location_id { get; set; }
        public string md_loc_name { get; set; }
        public string md_food_type { get; set; }
        public string md_food_subtype { get; set; }
        public string md_cultivar { get; set; }
        public string md_food_score_type { get; set; }
        public string md_purch_currency { get; set; }
        public double? md_purch_price { get; set; }
        public string md_price_by { get; set; }
        public string md_package_type { get; set; }
        public string md_quantity { get; set; }
        public double? md_weight { get; set; }
        public string md_weight_uom { get; set; }
        public string md_sell_by_date { get; set; }
        public string md_brand_1 { get; set; }
        public string md_brand_2 { get; set; }
        public string md_origin_region { get; set; }
        public string md_origin_sub_region { get; set; }
        public string md_organic { get; set; }
        public string d_instrument { get; set; }
        public string d_model_version { get; set; }
        public string d_transfer_function { get; set; }
        public int? d_scans_averaged { get; set; }
        public string d_scan_type { get; set; }
        public string d_operator_id { get; set; }
        public string p_classifier { get; set; }
        public string p_defect_indicator { get; set; }
        public string p_defect_percent { get; set; }
        public double? p_sucrose { get; set; }
        public double? p_fructose { get; set; }
        public double? p_glucose { get; set; }
        public double? p_vit_c { get; set; }
        public double? p_moisture { get; set; }
        public double? p_anthocyanins { get; set; }
        public double? p_antioxidants { get; set; }
        public double? p_citric_acid { get; set; }
        public double? p_malic_acid { get; set; }
        public double? p_oxalic_acid { get; set; }
        public double? p_tartaric { get; set; }
        public double? p_oil_total { get; set; }
        public double? p_oleic { get; set; }
        public double? p_linoleic { get; set; }
        public double? p_palmitic { get; set; }
        public double? p_palmitoleic { get; set; }
        public double? p_lycopene { get; set; }
        public double? p_carotenoids { get; set; }
        public double? p_lutein { get; set; }
        public double? p_potassium { get; set; }
        public string s_sucrose { get; set; }
        public string s_fructose { get; set; }
        public string s_glucose { get; set; }
        public string s_vit_c { get; set; }
        public string s_moisture { get; set; }
        public string s_anthocyanins { get; set; }
        public string s_antioxidants { get; set; }
        public string s_citric_acid { get; set; }
        public string s_malic_acid { get; set; }
        public string s_oxalic_acid { get; set; }
        public string s_tartaric { get; set; }
        public string s_oil_total { get; set; }
        public string s_oleic { get; set; }
        public string s_linoleic { get; set; }
        public string s_palmitic { get; set; }
        public string s_palmitoleic { get; set; }
        public string s_lycopene { get; set; }
        public string s_carotenoids { get; set; }
        public string s_lutein { get; set; }
        public string s_potassium { get; set; }
        public string s_overall { get; set; }
        public double? md_price { get; set; }
        public double? md_value { get; set; }

    }
    public class ModelClassMap : ClassMap<CsvModel>
    {
        public ModelClassMap()
        {
            Map(m => m.md_row_id).Name("md_row_id");
            Map(m => m.md_processing_code).Name("md_processing_code");
            Map(m => m.md_scan_type).Name("md_scan_type");
            Map(m => m.md_barcode).Name("md_barcode");
            Map(m => m.md_scan_date).Name("md_scan_date");
            Map(m => m.md_collection_id).Name("md_collection_id");
            Map(m => m.md_receipt_ref).Name("md_receipt_ref");
            Map(m => m.md_image_ref).Name("md_image_ref");
            Map(m => m.md_external_ref).Name("md_external_ref");
            Map(m => m.md_location_id).Name("md_location_id");
            Map(m => m.md_loc_name).Name("md_loc_name");
            Map(m => m.md_food_type).Name("md_food_type");
            Map(m => m.md_food_subtype).Name("md_food_subtype");
            Map(m => m.md_cultivar).Name("md_cultivar");
            Map(m => m.md_purch_currency).Name("md_purch_currency");
            Map(m => m.md_purch_price).Name("md_purch_price");
            Map(m => m.md_price_by).Name("md_price_by");
            Map(m => m.md_package_type).Name("md_package_type");
            Map(m => m.md_quantity).Name("md_quantity");
            Map(m => m.md_weight).Name("md_weight");
            Map(m => m.md_weight_uom).Name("md_weight_uom");
            Map(m => m.md_sell_by_date).Name("md_sell_by_date");
            Map(m => m.md_brand_1).Name("md_brand_1");
            Map(m => m.md_brand_2).Name("md_brand_2");
            Map(m => m.md_origin_region).Name("md_origin_region");
            Map(m => m.md_origin_sub_region).Name("md_origin_sub_region");
            Map(m => m.md_organic).Name("md_organic");
            Map(m => m.d_instrument).Name("d_instrument");
            Map(m => m.d_model_version).Name("d_model_version");
            Map(m => m.d_transfer_function).Name("d_transfer_function");
            Map(m => m.d_scans_averaged).Name("d_scans_averaged");
            Map(m => m.d_scan_type).Name("d_scan_type");
            Map(m => m.d_operator_id).Name("d_operator_id");
            Map(m => m.p_classifier).Name("p_classifier");
            Map(m => m.p_defect_indicator).Name("p_defect_indicator");
            Map(m => m.p_defect_percent).Name("p_defect_percent");
            Map(m => m.p_sucrose).Name("p_sucrose");
            Map(m => m.p_fructose).Name("p_fructose");
            Map(m => m.p_glucose).Name("p_glucose");
            Map(m => m.p_vit_c).Name("p_vit_c");
            Map(m => m.p_moisture).Name("p_moisture");
            Map(m => m.p_anthocyanins).Name("p_anthocyanins");
            Map(m => m.p_antioxidants).Name("p_antioxidants");
            Map(m => m.p_citric_acid).Name("p_citric_acid");
            Map(m => m.p_malic_acid).Name("p_malic_acid");
            Map(m => m.p_oxalic_acid).Name("p_oxalic_acid");
            Map(m => m.p_tartaric).Name("p_tartaric");
            Map(m => m.p_oil_total).Name("p_oil_total");
            Map(m => m.p_oleic).Name("p_oleic");
            Map(m => m.p_linoleic).Name("p_linoleic");
            Map(m => m.p_palmitic).Name("p_palmitic");
            Map(m => m.p_palmitoleic).Name("p_palmitoleic");
            Map(m => m.p_lycopene).Name("p_lycopene");
            Map(m => m.p_carotenoids).Name("p_carotenoids");
            Map(m => m.p_lutein).Name("p_lutein");
            Map(m => m.s_sucrose).Name("s_sucrose");
            Map(m => m.s_fructose).Name("s_fructose");
            Map(m => m.s_glucose).Name("s_glucose");
            Map(m => m.s_vit_c).Name("s_vit_c");
            Map(m => m.s_moisture).Name("s_moisture");
            Map(m => m.s_anthocyanins).Name("s_anthocyanins");
            Map(m => m.s_antioxidants).Name("s_antioxidants");
            Map(m => m.s_citric_acid).Name("s_citric_acid");
            Map(m => m.s_malic_acid).Name("s_malic_acid");
            Map(m => m.s_oxalic_acid).Name("s_oxalic_acid");
            Map(m => m.s_tartaric).Name("s_tartaric");
            Map(m => m.s_oil_total).Name("s_oil_total");
            Map(m => m.s_oleic).Name("s_oleic");
            Map(m => m.s_linoleic).Name("s_linoleic");
            Map(m => m.s_palmitic).Name("s_palmitic");
            Map(m => m.s_palmitoleic).Name("s_palmitoleic");
            Map(m => m.s_lycopene).Name("s_lycopene");
            Map(m => m.s_carotenoids).Name("s_carotenoids");
            Map(m => m.s_lutein).Name("s_lutein");
            Map(m => m.s_overall).Name("s_overall");
            Map(m => m.md_price).Name("md_price");
            Map(m => m.md_value).Name("md_value");
            Map(m => m.p_potassium).Name("p_potassium");
            Map(m => m.s_potassium).Name("s_potassium");
            Map(m => m.md_food_score_type).Name("md_food_score_type");

        }
    }
}
