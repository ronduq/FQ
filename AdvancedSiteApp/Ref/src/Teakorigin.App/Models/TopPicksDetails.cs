// <copyright file="TopPicksDetails.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.App.Models
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using MoreLinq;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;
    using Teakorigin.Domain.Model;

    /// <summary>
    /// Top picks details.
    /// </summary>
    /// <seealso cref="Teakorigin.App.Models.TopPicks" />
    public class TopPicksDetails : TopPicks
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TopPicksDetails"/> class.
        /// </summary>
        /// <param name="analyteUoms">The analyte uoms.</param>
        public TopPicksDetails(List<AnalyteUom> analyteUoms)
        {
            this.AnalyteUom = analyteUoms;
        }

        /// <summary>
        /// Gets the analytes.
        /// </summary>
        /// <value>
        /// The analytes.
        /// </value>
        public List<Analyte> Analytes
        {
            get
            {
                var list = new List<Analyte>();
                var properties = typeof(TopPicksDetails).GetProperties();
                foreach (var property in properties)
                {
                    if (property.PropertyType == typeof(Analyte))
                    {
                        var objValue = (Analyte)property.GetValue(this);
                        objValue.Id = property.Name.ToLowerInvariant();
                        if (objValue.ShouldAdd && objValue.RecentScan.HasValue)
                        {
                            objValue.RecentScan = Math.Round(objValue.RecentScan.Value, 2, MidpointRounding.AwayFromZero);
                            objValue.Usda = Math.Round(objValue.Usda.Value, 2, MidpointRounding.AwayFromZero);
                            objValue.Score = Math.Round(objValue.Score.Value, 0, MidpointRounding.AwayFromZero);
                            list.Add(objValue);
                        }
                    }
                }

                return list;
            }
        }

        /// <summary>
        /// Gets the sucrose.
        /// </summary>
        /// <value>
        /// The sucrose.
        /// </value>
        [JsonIgnore]
        public Analyte Sucrose
        {
            get
            {
                var usda = this.ProduceUsdaData.usda_sucrose;
                var score = this.RelevantScanData.Average(x => x.s_sucrose);
                var recentScan = this.RelevantScanData.Average(x => x.p_sucrose);
                return new Analyte
                {
                    RecentScan = recentScan,
                    Score = score,
                    Usda = usda,
                    Uom = this.AnalyteUom.FirstOrDefault(x => x.AnalyteName == "sucrose").Uom,
                };
            }
        }

        /// <summary>
        /// Gets the fructose.
        /// </summary>
        /// <value>
        /// The fructose.
        /// </value>
        [JsonIgnore]
        public Analyte Fructose
        {
            get
            {
                var usda = this.ProduceUsdaData.usda_fructose;
                var score = this.RelevantScanData.Average(x => x.s_fructose);
                var recentScan = this.RelevantScanData.Average(x => x.p_fructose);
                return new Analyte
                {
                    RecentScan = recentScan,
                    Score = score,
                    Usda = usda,
                    Uom = this.AnalyteUom.FirstOrDefault(x => x.AnalyteName == "fructose").Uom,
                };
            }
        }

        /// <summary>
        /// Gets the glucose.
        /// </summary>
        /// <value>
        /// The glucose.
        /// </value>
        [JsonIgnore]
        public Analyte Glucose
        {
            get
            {
                var usda = this.ProduceUsdaData.usda_glucose;
                var score = this.RelevantScanData.Average(x => x.s_glucose);
                var recentScan = this.RelevantScanData.Average(x => x.p_glucose);
                return new Analyte
                {
                    RecentScan = recentScan,
                    Score = score,
                    Usda = usda,
                    Uom = this.AnalyteUom.FirstOrDefault(x => x.AnalyteName == "glucose").Uom,
                };
            }
        }

        /// <summary>
        /// Gets the vitamin c.
        /// </summary>
        /// <value>
        /// The vitamin c.
        /// </value>
        [JsonIgnore]
        public Analyte VitaminC
        {
            get
            {
                var usda = this.ProduceUsdaData.usda_vit_c;
                var score = this.RelevantScanData.Average(x => x.s_vit_c);
                var recentScan = this.RelevantScanData.Average(x => x.p_vit_c);
                return new Analyte
                {
                    RecentScan = recentScan,
                    Score = score,
                    Usda = usda,
                    Uom = this.AnalyteUom.FirstOrDefault(x => x.AnalyteName == "vit_c").Uom,
                };
            }
        }

        /// <summary>
        /// Gets the water.
        /// </summary>
        /// <value>
        /// The water.
        /// </value>
        [JsonIgnore]
        public Analyte Water
        {
            get
            {
                var usda = this.ProduceUsdaData.usda_moisture;
                var score = this.RelevantScanData.Average(x => x.s_moisture);
                var recentScan = this.RelevantScanData.Average(x => x.p_moisture);
                return new Analyte
                {
                    RecentScan = recentScan,
                    Score = score,
                    Usda = usda,
                    Uom = this.AnalyteUom.FirstOrDefault(x => x.AnalyteName == "moisture").Uom,
                };
            }
        }

        /// <summary>
        /// Gets the anthocyanins.
        /// </summary>
        /// <value>
        /// The anthocyanins.
        /// </value>
        [JsonIgnore]
        public Analyte Anthocyanins
        {
            get
            {
                var usda = this.ProduceUsdaData.usda_anthocyanins;
                var score = this.RelevantScanData.Average(x => x.s_anthocyanins);
                var recentScan = this.RelevantScanData.Average(x => x.p_anthocyanins);
                return new Analyte
                {
                    RecentScan = recentScan,
                    Score = score,
                    Usda = usda,
                    Uom = this.AnalyteUom.FirstOrDefault(x => x.AnalyteName == "anthocyanins").Uom,
                };
            }
        }

        /// <summary>
        /// Gets the antioxidants.
        /// </summary>
        /// <value>
        /// The antioxidants.
        /// </value>
        [JsonIgnore]
        public Analyte Antioxidants
        {
            get
            {
                var usda = this.ProduceUsdaData.usda_antioxidants;
                var score = this.RelevantScanData.Average(x => x.s_antioxidants);
                var recentScan = this.RelevantScanData.Average(x => x.p_antioxidants);
                return new Analyte
                {
                    RecentScan = recentScan,
                    Score = score,
                    Usda = usda,
                    Uom = this.AnalyteUom.FirstOrDefault(x => x.AnalyteName == "antioxidants").Uom,
                };
            }
        }

        /// <summary>
        /// Gets the citric acid.
        /// </summary>
        /// <value>
        /// The citric acid.
        /// </value>
        [JsonIgnore]
        public Analyte CitricAcid
        {
            get
            {
                var usda = this.ProduceUsdaData.usda_citric_acid;
                var score = this.RelevantScanData.Average(x => x.s_citric_acid);
                var recentScan = this.RelevantScanData.Average(x => x.p_citric_acid);
                return new Analyte
                {
                    RecentScan = recentScan,
                    Score = score,
                    Usda = usda,
                    Uom = this.AnalyteUom.FirstOrDefault(x => x.AnalyteName == "citric_acid").Uom,
                };
            }
        }

        /// <summary>
        /// Gets the malic acid.
        /// </summary>
        /// <value>
        /// The malic acid.
        /// </value>
        [JsonIgnore]
        public Analyte MalicAcid
        {
            get
            {
                var usda = this.ProduceUsdaData.usda_malic_acid;
                var score = this.RelevantScanData.Average(x => x.s_malic_acid);
                var recentScan = this.RelevantScanData.Average(x => x.p_malic_acid);
                return new Analyte
                {
                    RecentScan = recentScan,
                    Score = score,
                    Usda = usda,
                    Uom = this.AnalyteUom.FirstOrDefault(x => x.AnalyteName == "malic_acid").Uom,
                };
            }
        }

        /// <summary>
        /// Gets the oxalic acid.
        /// </summary>
        /// <value>
        /// The oxalic acid.
        /// </value>
        [JsonIgnore]
        public Analyte OxalicAcid
        {
            get
            {
                var usda = this.ProduceUsdaData.usda_oxalic_acid;
                var score = this.RelevantScanData.Average(x => x.s_oxalic_acid);
                var recentScan = this.RelevantScanData.Average(x => x.p_oxalic_acid);
                return new Analyte
                {
                    RecentScan = recentScan,
                    Score = score,
                    Usda = usda,
                    Uom = this.AnalyteUom.FirstOrDefault(x => x.AnalyteName == "oxalic_acid").Uom,
                };
            }
        }

        /// <summary>
        /// Gets the tartaric.
        /// </summary>
        /// <value>
        /// The tartaric.
        /// </value>
        [JsonIgnore]
        public Analyte Tartaric
        {
            get
            {
                var usda = this.ProduceUsdaData.usda_tartaric;
                var score = this.RelevantScanData.Average(x => x.s_tartaric);
                var recentScan = this.RelevantScanData.Average(x => x.p_tartaric);
                return new Analyte
                {
                    RecentScan = recentScan,
                    Score = score,
                    Usda = usda,
                    Uom = this.AnalyteUom.FirstOrDefault(x => x.AnalyteName == "tartaric").Uom,
                };
            }
        }

        /// <summary>
        /// Gets the oil total.
        /// </summary>
        /// <value>
        /// The oil total.
        /// </value>
        [JsonIgnore]
        public Analyte OilTotal
        {
            get
            {
                var usda = this.ProduceUsdaData.usda_oil_total;
                var score = this.RelevantScanData.Average(x => x.s_oil_total);
                var recentScan = this.RelevantScanData.Average(x => x.p_oil_total);
                return new Analyte
                {
                    RecentScan = recentScan,
                    Score = score,
                    Usda = usda,
                    Uom = this.AnalyteUom.FirstOrDefault(x => x.AnalyteName == "oil_total").Uom,
                };
            }
        }

        /// <summary>
        /// Gets the oleic.
        /// </summary>
        /// <value>
        /// The oleic.
        /// </value>
        [JsonIgnore]
        public Analyte Oleic
        {
            get
            {
                var usda = this.ProduceUsdaData.usda_oleic;
                var score = this.RelevantScanData.Average(x => x.s_oleic);
                var recentScan = this.RelevantScanData.Average(x => x.p_oleic);
                return new Analyte
                {
                    RecentScan = recentScan,
                    Score = score,
                    Usda = usda,
                    Uom = this.AnalyteUom.FirstOrDefault(x => x.AnalyteName == "oleic").Uom,
                };
            }
        }

        /// <summary>
        /// Gets the linoleic.
        /// </summary>
        /// <value>
        /// The linoleic.
        /// </value>
        [JsonIgnore]
        public Analyte Linoleic
        {
            get
            {
                var usda = this.ProduceUsdaData.usda_linoleic;
                var score = this.RelevantScanData.Average(x => x.s_linoleic);
                var recentScan = this.RelevantScanData.Average(x => x.p_linoleic);
                return new Analyte
                {
                    RecentScan = recentScan,
                    Score = score,
                    Usda = usda,
                    Uom = this.AnalyteUom.FirstOrDefault(x => x.AnalyteName == "linoleic").Uom,
                };
            }
        }

        /// <summary>
        /// Gets the palmitic.
        /// </summary>
        /// <value>
        /// The palmitic.
        /// </value>
        [JsonIgnore]
        public Analyte Palmitic
        {
            get
            {
                var usda = this.ProduceUsdaData.usda_palmitic;
                var score = this.RelevantScanData.Average(x => x.s_palmitic);
                var recentScan = this.RelevantScanData.Average(x => x.p_palmitic);
                return new Analyte
                {
                    RecentScan = recentScan,
                    Score = score,
                    Usda = usda,
                    Uom = this.AnalyteUom.FirstOrDefault(x => x.AnalyteName == "palmitic").Uom,
                };
            }
        }

        /// <summary>
        /// Gets the palmitoleic.
        /// </summary>
        /// <value>
        /// The palmitoleic.
        /// </value>
        [JsonIgnore]
        public Analyte Palmitoleic
        {
            get
            {
                var usda = this.ProduceUsdaData.usda_palmitic;
                var score = this.RelevantScanData.Average(x => x.s_palmitoleic);
                var recentScan = this.RelevantScanData.Average(x => x.p_palmitoleic);
                return new Analyte
                {
                    RecentScan = recentScan,
                    Score = score,
                    Usda = usda,
                    Uom = this.AnalyteUom.FirstOrDefault(x => x.AnalyteName == "palmitoleic").Uom,
                };
            }
        }

        /// <summary>
        /// Gets the lycopene.
        /// </summary>
        /// <value>
        /// The lycopene.
        /// </value>
        [JsonIgnore]
        public Analyte Lycopene
        {
            get
            {
                var usda = this.ProduceUsdaData.usda_lycopene;
                var score = this.RelevantScanData.Average(x => x.s_lycopene);
                var recentScan = this.RelevantScanData.Average(x => x.p_lycopene);
                return new Analyte
                {
                    RecentScan = recentScan,
                    Score = score,
                    Usda = usda,
                    Uom = this.AnalyteUom.FirstOrDefault(x => x.AnalyteName == "lycopene").Uom,
                };
            }
        }

        /// <summary>
        /// Gets the carotenoids.
        /// </summary>
        /// <value>
        /// The carotenoids.
        /// </value>
        [JsonIgnore]
        public Analyte Carotenoids
        {
            get
            {
                var usda = this.ProduceUsdaData.usda_carotenoids;
                var score = this.RelevantScanData.Average(x => x.s_carotenoids);
                var recentScan = this.RelevantScanData.Average(x => x.p_carotenoids);
                return new Analyte
                {
                    RecentScan = recentScan,
                    Score = score,
                    Usda = usda,
                    Uom = this.AnalyteUom.FirstOrDefault(x => x.AnalyteName == "carotenoids").Uom,
                };
            }
        }

        /// <summary>
        /// Gets the lutein.
        /// </summary>
        /// <value>
        /// The lutein.
        /// </value>
        [JsonIgnore]
        public Analyte Lutein
        {
            get
            {
                var usda = this.ProduceUsdaData.usda_lutein;
                var score = this.RelevantScanData.Average(x => x.s_lutein);
                var recentScan = this.RelevantScanData.Average(x => x.p_lutein);
                return new Analyte
                {
                    RecentScan = recentScan,
                    Score = score,
                    Usda = usda,
                    Uom = this.AnalyteUom.FirstOrDefault(x => x.AnalyteName == "lutein").Uom,
                };
            }
        }

        /// <summary>
        /// Gets the lutein.
        /// </summary>
        /// <value>
        /// The lutein.
        /// </value>
        [JsonIgnore]
        public Analyte Potassium
        {
            get
            {
                var usda = this.ProduceUsdaData.usda_potassium;
                var score = this.RelevantScanData.Average(x => x.s_potassium);
                var recentScan = this.RelevantScanData.Average(x => x.p_potassium);
                return new Analyte
                {
                    RecentScan = recentScan,
                    Score = score,
                    Usda = usda,
                    Uom = this.AnalyteUom.FirstOrDefault(x => x.AnalyteName == "potassium").Uom,
                };
            }
        }

        /// <summary>
        /// Gets or sets the produce usda data.
        /// </summary>
        /// <value>
        /// The produce usda data.
        /// </value>
        public Produce ProduceUsdaData { get; set; }

        /// <summary>
        /// Gets the analyte uom.
        /// </summary>
        /// <value>
        /// The analyte uom.
        /// </value>
        [JsonIgnore]
        public new IEnumerable<AnalyteUom> AnalyteUom { get; internal set; }
    }
}