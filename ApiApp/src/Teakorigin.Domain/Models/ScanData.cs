﻿// <autogenerated />

namespace Teakorigin.Domain.Model
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using Newtonsoft.Json;

    public partial class ScanData
    {
        public DateTime MdScanDate { get; set; }

        [JsonIgnore]
        public string MdProduceCode { get; set; }

        [JsonIgnore]
        public string MdLocationCode { get; set; }

        [JsonProperty]
        public string MdSupplier { get; set; }

        [JsonIgnore]
        public double? s_overall { get; set; }

        [JsonIgnore]
        public double? md_value { get; set; }

        /// <summary>
        /// Gets or sets the country of origin.
        /// </summary>
        /// <value>
        /// The country of origin.
        /// </value>
        [NotMapped]
        public string CountryOfOrigin { 
            get
            {
                return this.md_origin_region;
            }

        }

        /// <summary>
        /// Gets or sets a value indicating whether this instance is organic.
        /// </summary>
        /// <value>
        ///   <c>true</c> if this instance is organic; otherwise, <c>false</c>.
        /// </value>
        [NotMapped]
        public bool IsOrganic { get { return this.md_organic.ToUpperInvariant() == "YES"; } }

        [Column("md_row_id")]
        [Key]
        [MaxLength(100)]
        public string md_row_id { get; set; }
        [Column("md_processing_code")] [MaxLength(100)] [JsonIgnore] public string md_processing_code { get; set; }
        [Column("md_scan_type")] [MaxLength(100)] [JsonIgnore] public string md_scan_type { get; set; }
        [Column("md_barcode")] [MaxLength(100)] [JsonIgnore] public string md_barcode { get; set; }
        [Column("md_scan_date")] [MaxLength(100)] [JsonIgnore] public string md_scan_date { get; set; }
        [Column("md_collection_id")] [MaxLength(100)] [JsonIgnore] public string md_collection_id { get; set; }
        [Column("md_receipt_ref")] [MaxLength(1000)] [JsonIgnore] public string md_receipt_ref { get; set; }
        [Column("md_image_ref")] [MaxLength(1000)] [JsonIgnore] public string md_image_ref { get; set; }
        [Column("md_external_ref")] [MaxLength(1000)] [JsonIgnore] public string md_external_ref { get; set; }
        [Column("md_location_id")] [MaxLength(100)] [JsonIgnore] public long md_location_id { get; set; }
        [Column("md_loc_name")] [MaxLength(100)] [JsonIgnore] public string md_loc_name { get; set; }
        [Column("md_food_type")] [MaxLength(100)] [JsonIgnore] public string md_food_type { get; set; }
        [Column("md_food_subtype")] [MaxLength(100)] [JsonIgnore] public string md_food_subtype { get; set; }
        [Column("md_cultivar")] [MaxLength(100)] [JsonIgnore] public string md_cultivar { get; set; }
        [Column("md_purch_currency")] [MaxLength(100)] [JsonIgnore] public string md_purch_currency { get; set; }
        [Column("md_purch_price")] [MaxLength(100)] [JsonIgnore] public double? md_purch_price { get; set; }
        [Column("md_price_by")] [MaxLength(100)] [JsonIgnore] public string md_price_by { get; set; }
        [Column("md_package_type")] [MaxLength(100)] [JsonIgnore] public string md_package_type { get; set; }
        [Column("md_quantity")] [MaxLength(100)] [JsonIgnore] public string md_quantity { get; set; }
        [Column("md_weight")] [MaxLength(100)] [JsonIgnore] public double? md_weight { get; set; }
        [Column("md_weight_uom")] [MaxLength(100)] [JsonIgnore] public string md_weight_uom { get; set; }
        [Column("md_sell_by_date")] [MaxLength(100)] [JsonIgnore] public DateTime? md_sell_by_date { get; set; }
        [Column("md_brand_1")] [MaxLength(100)] [JsonIgnore] public string md_brand_1 { get; set; }
        [Column("md_brand_2")] [MaxLength(100)] [JsonIgnore] public string md_brand_2 { get; set; }
        [Column("md_origin_region")] [MaxLength(100)] [JsonIgnore] public string md_origin_region { get; set; }
        [Column("md_origin_sub_region")] [MaxLength(100)] [JsonIgnore] public string md_origin_sub_region { get; set; }
        [Column("md_organic")] [MaxLength(100)] [JsonIgnore] public string md_organic { get; set; }
        [Column("d_instrument")] [MaxLength(100)] [JsonIgnore] public string d_instrument { get; set; }
        [Column("d_model_version")] [MaxLength(100)] [JsonIgnore] public string d_model_version { get; set; }
        [Column("d_transfer_function")] [MaxLength(100)] [JsonIgnore] public string d_transfer_function { get; set; }
        [Column("d_scans_averaged")] [MaxLength(100)] [JsonIgnore] public int? d_scans_averaged { get; set; }
        [Column("d_scan_type")] [MaxLength(100)] [JsonIgnore] public string d_scan_type { get; set; }
        [Column("d_operator_id")] [MaxLength(100)] [JsonIgnore] public string d_operator_id { get; set; }
        [Column("p_classifier")] [MaxLength(100)] [JsonIgnore] public string p_classifier { get; set; }
        [Column("p_defect_indicator")] [MaxLength(100)] [JsonIgnore] public string p_defect_indicator { get; set; }
        [Column("p_defect_percent")] [MaxLength(100)] [JsonIgnore] public double? p_defect_percent { get; set; }
        [Column("p_sucrose")] [MaxLength(100)] [JsonIgnore] public double? p_sucrose { get; set; }
        [Column("p_fructose")] [MaxLength(100)] [JsonIgnore] public double? p_fructose { get; set; }
        [Column("p_glucose")] [MaxLength(100)] [JsonIgnore] public double? p_glucose { get; set; }
        [Column("p_vit_c")] [MaxLength(100)] [JsonIgnore] public double? p_vit_c { get; set; }
        [Column("p_moisture")] [MaxLength(100)] [JsonIgnore] public double? p_moisture { get; set; }
        [Column("p_anthocyanins")] [MaxLength(100)] [JsonIgnore] public double? p_anthocyanins { get; set; }
        [Column("p_antioxidants")] [MaxLength(100)] [JsonIgnore] public double? p_antioxidants { get; set; }
        [Column("p_citric_acid")] [MaxLength(100)] [JsonIgnore] public double? p_citric_acid { get; set; }
        [Column("p_malic_acid")] [MaxLength(100)] [JsonIgnore] public double? p_malic_acid { get; set; }
        [Column("p_oxalic_acid")] [MaxLength(100)] [JsonIgnore] public double? p_oxalic_acid { get; set; }
        [Column("p_tartaric")] [MaxLength(100)] [JsonIgnore] public double? p_tartaric { get; set; }
        [Column("p_oil_total")] [MaxLength(100)] [JsonIgnore] public double? p_oil_total { get; set; }
        [Column("p_oleic")] [MaxLength(100)] [JsonIgnore] public double? p_oleic { get; set; }
        [Column("p_linoleic")] [MaxLength(100)] [JsonIgnore] public double? p_linoleic { get; set; }
        [Column("p_palmitic")] [MaxLength(100)] [JsonIgnore] public double? p_palmitic { get; set; }
        [Column("p_palmitoleic")] [MaxLength(100)] [JsonIgnore] public double? p_palmitoleic { get; set; }
        [Column("p_lycopene")] [MaxLength(100)] [JsonIgnore] public double? p_lycopene { get; set; }
        [Column("p_carotenoids")] [MaxLength(100)] [JsonIgnore] public double? p_carotenoids { get; set; }
        [Column("p_lutein")] [MaxLength(100)] [JsonIgnore] public double? p_lutein { get; set; }
        [Column("p_potassium")] [MaxLength(100)] [JsonIgnore] public double? p_potassium { get; set; }
        [Column("s_sucrose")] [MaxLength(100)] [JsonIgnore] public double? s_sucrose { get; set; }
        [Column("s_fructose")] [MaxLength(100)] [JsonIgnore] public double? s_fructose { get; set; }
        [Column("s_glucose")] [MaxLength(100)] [JsonIgnore] public double? s_glucose { get; set; }
        [Column("s_vit_c")] [MaxLength(100)] [JsonIgnore] public double? s_vit_c { get; set; }
        [Column("s_moisture")] [MaxLength(100)] [JsonIgnore] public double? s_moisture { get; set; }
        [Column("s_anthocyanins")] [MaxLength(100)] [JsonIgnore] public double? s_anthocyanins { get; set; }
        [Column("s_antioxidants")] [MaxLength(100)] [JsonIgnore] public double? s_antioxidants { get; set; }
        [Column("s_citric_acid")] [MaxLength(100)] [JsonIgnore] public double? s_citric_acid { get; set; }
        [Column("s_malic_acid")] [MaxLength(100)] [JsonIgnore] public double? s_malic_acid { get; set; }
        [Column("s_oxalic_acid")] [MaxLength(100)] [JsonIgnore] public double? s_oxalic_acid { get; set; }
        [Column("s_tartaric")] [MaxLength(100)] [JsonIgnore] public double? s_tartaric { get; set; }
        [Column("s_oil_total")] [MaxLength(100)] [JsonIgnore] public double? s_oil_total { get; set; }
        [Column("s_oleic")] [MaxLength(100)] [JsonIgnore] public double? s_oleic { get; set; }
        [Column("s_linoleic")] [MaxLength(100)] [JsonIgnore] public double? s_linoleic { get; set; }
        [Column("s_palmitic")] [MaxLength(100)] [JsonIgnore] public double? s_palmitic { get; set; }
        [Column("s_palmitoleic")] [MaxLength(100)] [JsonIgnore] public double? s_palmitoleic { get; set; }
        [Column("s_lycopene")] [MaxLength(100)] [JsonIgnore] public double? s_lycopene { get; set; }
        [Column("s_carotenoids")] [MaxLength(100)] [JsonIgnore] public double? s_carotenoids { get; set; }
        [Column("s_lutein")] [MaxLength(100)] [JsonIgnore] public double? s_lutein { get; set; }
        [Column("s_potassium")] [MaxLength(100)] [JsonIgnore] public double? s_potassium { get; set; }
        [Column("md_price")] [MaxLength(100)] [JsonIgnore] public double? md_price { get; set; }
        [Column("md_food_score_type")] [MaxLength(100)] [JsonIgnore] public string md_food_score_type { get; set; }
    }
}