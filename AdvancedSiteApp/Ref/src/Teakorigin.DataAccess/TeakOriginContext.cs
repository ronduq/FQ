﻿// <copyright file="TeakOriginContext.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// <autogenerated />
// </copyright>

namespace Teakorigin.DataAccess
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Text;
    using CsvHelper;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata;
    using Teakorigin.Domain.Model;

    public partial class TeakOriginContext : DbContext
    {
        /// <summary>
        /// Initializes a new Read Only instance of the <see cref="TeakOriginContext"/> class. Qury tracking is turned off. Never save or update using this context.
        /// </summary>
        public TeakOriginContext()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="TeakOriginContext"/> class.
        /// </summary>
        /// <param name="options">Parameters for options.</param>
        public TeakOriginContext(DbContextOptions<TeakOriginContext> options)
            : base(options)
        {
            // this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public virtual DbSet<CustomerPerception> CustomerPerception { get; set; }

        public virtual DbSet<Location> Location { get; set; }

        public virtual DbSet<LocationProduce> LocationProduce { get; set; }

        public virtual DbSet<LocationRetailer> LocationRetailer { get; set; }

        public virtual DbSet<Produce> Produce { get; set; }

        public virtual DbSet<Retailer> Retailer { get; set; }

        public virtual DbSet<ScanData> ScanData { get; set; }

        public virtual DbSet<RefLocation> RefLocation { get; set; }

        public virtual DbSet<AnalyteUom> AnalyteUom { get; set; }

        public virtual DbQuery<RetailerRanks> RetailerRanks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=EFProviders.InMemory;Trusted_Connection=True;ConnectRetryCount=0");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<CustomerPerception>(entity =>
            {
                entity.HasKey(e => e.PerceptionId);

                entity.Property(e => e.LocationCode)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RetailerCode)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Location>(entity =>
            {
                entity.HasKey(e => e.LocationCode);

                entity.Property(e => e.LocationCode)
                    .HasMaxLength(50)
                    .ValueGeneratedNever();

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.LocationName)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<LocationProduce>(entity =>
            {
                entity.HasIndex(e => e.LocationCode);

                entity.HasIndex(e => e.ProduceCode);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.LocationCode).HasMaxLength(50);

                entity.Property(e => e.ProduceCode)
                    .HasMaxLength(80);

                entity.HasOne(d => d.LocationCodeNavigation)
                    .WithMany(p => p.LocationProduce)
                    .HasForeignKey(d => d.LocationCode)
                    .HasConstraintName("FK_LocationProduce_Location");

                entity.HasOne(d => d.Produce)
                    .WithMany(p => p.LocationProduce)
                    .HasForeignKey(d => d.ProduceCode)
                    .HasConstraintName("FK_LocationProduce_Produce");
            });

            modelBuilder.Entity<LocationRetailer>(entity =>
            {
                entity.HasIndex(e => e.LocationCode);

                entity.HasIndex(e => e.RetailerCode);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.LocationCode).HasMaxLength(50);

                entity.Property(e => e.RetailerCode).HasMaxLength(50);

                entity.HasOne(d => d.LocationCodeNavigation)
                    .WithMany(p => p.LocationRetailer)
                    .HasForeignKey(d => d.LocationCode)
                    .HasConstraintName("FK_LocationRetailer_Location");

                entity.HasOne(d => d.RetailerCodeNavigation)
                    .WithMany(p => p.LocationRetailer)
                    .HasForeignKey(d => d.RetailerCode)
                    .HasConstraintName("FK_LocationRetailer_Retailer");
            });

            modelBuilder.Entity<Produce>(entity =>
            {
                entity.HasKey(e => e.ProduceCode);

                entity.Property(e => e.ProduceCode)
                    .HasMaxLength(80)
                    .ValueGeneratedNever();

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ProduceName)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Retailer>(entity =>
            {
                entity.HasKey(e => e.RetailerCode);

                entity.Property(e => e.RetailerCode)
                    .HasMaxLength(50)
                    .ValueGeneratedNever();

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.RetailerName)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<RefLocation>(entity =>
            {
                entity.Property(e => e.loc_id)
                    .ValueGeneratedNever();
            });

            modelBuilder.Entity<DistributedCache>(entity =>
            {
                entity.HasIndex(e => e.ExpiresAtTime)
                    .HasName("Index_ExpiresAtTime");

                entity.Property(e => e.Id)
                    .HasMaxLength(449)
                    .ValueGeneratedNever();

                entity.Property(e => e.Value).IsRequired();
            });

            modelBuilder.Entity<ScanData>().HasQueryFilter(x => x.md_scan_type == "guide");
            modelBuilder.Entity<ScanData>(entity =>
            {
                entity.HasIndex(e => new { e.MdSupplier, e.md_value, e.s_overall, e.MdLocationCode, e.md_scan_type, e.MdProduceCode, e.MdScanDate })
                .HasName("INDEX_ScanData")
                .ForSqlServerIsClustered(false);

                entity.Property(e => e.MdLocationCode)
                    .IsRequired()
                    .HasColumnName("md_LocationCode")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MdProduceCode)
                    .IsRequired()
                    .HasColumnName("md_ProduceCode")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MdScanDate)
                    .HasColumnName("md_ScanDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.MdSupplier)
                    .IsRequired()
                    .HasColumnName("md_Supplier")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.s_overall).HasColumnName("s_overall");

                entity.Property(e => e.md_value).HasColumnName("md_value");

                var listLocation = new List<Location>
            {
                new Location { Id = 1, LocationCode = "boston", LocationName = "Boston" },
                new Location { Id = 2, LocationCode = "los-angeles", LocationName = "Los Angeles" },
            };

                var listRetailer = new List<Retailer>
            {
                new Retailer { Id = 1, RetailerCode = "aldi", RetailerName = "Aldi", Colour = "#1CAC69" },
                new Retailer { Id = 2, RetailerCode = "amazon-fresh", RetailerName = "Amazon Fresh", Colour = "#8DD5B3" },
                new Retailer { Id = 3, RetailerCode = "bjs", RetailerName = "BJS", Colour = "#168451" },
                new Retailer { Id = 4, RetailerCode = "sprouts", RetailerName = "Bristol Farms", Colour = "#FFAD4B" },
                new Retailer { Id = 5, RetailerCode = "costco", RetailerName = "Costco", Colour = "#FFD5A5" },
                new Retailer { Id = 6, RetailerCode = "gelsons", RetailerName = "Gelsons", Colour = "#D18D3B" },
                new Retailer { Id = 7, RetailerCode = "ralphs", RetailerName = "Ralphs", Colour = "#FB5440" },
                new Retailer { Id = 8, RetailerCode = "stop-n-shop", RetailerName = "Stop N Shop", Colour = "#FDA99F" },
                new Retailer { Id = 9, RetailerCode = "target", RetailerName = "Target", Colour = "#C44031" },
                new Retailer { Id = 10, RetailerCode = "trader-joes", RetailerName = "Trader Joes", Colour = "#6715EB" },
                new Retailer { Id = 11, RetailerCode = "walmart", RetailerName = "Walmart", Colour = "#B389F5" },
                new Retailer { Id = 12, RetailerCode = "wegmans", RetailerName = "Wegmans", Colour = "#410C97" },
                new Retailer { Id = 13, RetailerCode = "whole-foods", RetailerName = "Whole Foods", Colour = "#005B82" },
            };

                var listProduce = new List<Produce>
            {
                new Produce { Id = 1, ProduceCode = "apple-braeburn", ProduceName = "Apple Braeburn", IsParent = false, IsChild = true, ParentCode = "apple", Colour = "#1CAC69", usda_sucrose = 2.07, usda_fructose = 5.90, usda_glucose = 2.43, usda_vit_c = 4.60,usda_moisture = 85.56, usda_anthocyanins = 1.60, usda_antioxidants = 3.28, usda_malic_acid = 0.85 },
                new Produce { Id = 2, ProduceCode = "apple-fuji", ProduceName = "Apple Fuji", IsParent = false, IsChild = true, ParentCode = "apple", Colour = "#8DD5B3", usda_sucrose = 2.07, usda_fructose = 5.90, usda_glucose = 2.43, usda_vit_c = 4.60,usda_moisture = 85.56, usda_anthocyanins = 1.60, usda_antioxidants = 3.28, usda_malic_acid = 0.85 },
                new Produce { Id = 3, ProduceCode = "apple-gala", ProduceName = "Apple Gala", IsParent = false, IsChild = true, ParentCode = "apple", Colour = "#168451", usda_sucrose = 2.07, usda_fructose = 5.90, usda_glucose = 2.43, usda_vit_c = 4.60,usda_moisture = 85.56, usda_anthocyanins = 1.60, usda_antioxidants = 3.28, usda_malic_acid = 0.85 },
                new Produce { Id = 4, ProduceCode = "apple-honeycrisp", ProduceName = "Apple Honey Crisp", IsParent = false, IsChild = true, ParentCode = "apple", Colour = "#FFAD4B", usda_sucrose = 2.07, usda_fructose = 5.90, usda_glucose = 2.43, usda_vit_c = 4.60,usda_moisture = 85.56, usda_anthocyanins = 1.60, usda_antioxidants = 3.28, usda_malic_acid = 0.85 },
                new Produce { Id = 5, ProduceCode = "apple-red-delicious", ProduceName = "Apple Red delicious", IsParent = false, IsChild = true, ParentCode = "apple", Colour = "#FFD5A5", usda_sucrose = 2.07, usda_fructose = 5.90, usda_glucose = 2.43, usda_vit_c = 4.60,usda_moisture = 85.56, usda_anthocyanins = 1.60, usda_antioxidants = 3.28, usda_malic_acid = 0.85 },
                new Produce { Id = 6, ProduceCode = "apple-pink-lady", ProduceName = "Apple Pink Lady", IsParent = false, IsChild = true, ParentCode = "apple", Colour = "#D18D3B", usda_sucrose = 2.07, usda_fructose = 5.90, usda_glucose = 2.43, usda_vit_c = 4.60,usda_moisture = 85.56, usda_anthocyanins = 1.60, usda_antioxidants = 3.28, usda_malic_acid = 0.85 },
                new Produce { Id = 7, ProduceCode = "avocado", ProduceName = "Avocado", IsParent = false, IsChild = false, Colour = "#FB5440", usda_moisture = 73.23, usda_anthocyanins = 0.23, usda_oil_total = 14.66, usda_oleic = 9.07, usda_linoleic = 1.67, usda_palmitic = 2.08, usda_palmitoleic = 0.70 },
                new Produce { Id = 8, ProduceCode = "banana", ProduceName = "Banana", IsParent = false, IsChild = false, Colour = "#FDA99F", usda_sucrose = 2.39, usda_fructose = 4.85, usda_glucose = 4.98, usda_vit_c = 8.70, usda_moisture = 74.91, usda_citric_acid = 0.18, usda_malic_acid = 0.26 },
                new Produce { Id = 9, ProduceCode = "blueberry", ProduceName = "Blueberry", IsParent = false, IsChild = false, Colour = "#C44031", usda_fructose = 4.97, usda_glucose = 4.88, usda_vit_c = 9.70, usda_moisture = 84.21, usda_anthocyanins = 163.26, usda_citric_acid = 0.84 },
                new Produce { Id = 10, ProduceCode = "grape-green", ProduceName = "Grape green", IsParent = false, IsChild = true, ParentCode = "grape", Colour = "#6715EB", usda_fructose = 8.13, usda_glucose = 7.20, usda_moisture = 80.54, usda_antioxidants = 0.80, usda_malic_acid = 0.32, usda_tartaric = 0.56, },
                new Produce { Id = 11, ProduceCode = "grape-red", ProduceName = "Grape red", IsParent = false, IsChild = true, ParentCode = "grape", Colour = "#B389F5", usda_fructose = 8.13, usda_glucose = 7.20, usda_moisture = 80.54, usda_anthocyanins = 21.70, usda_antioxidants = 0.80, usda_malic_acid = 0.28, usda_tartaric = 0.54 },
                new Produce { Id = 12, ProduceCode = "spinach", ProduceName = "Spinach", IsParent = false, IsChild = false, Colour = "#410C97", usda_vit_c = 28.10, usda_moisture = 91.40, usda_antioxidants = 1.98, usda_oxalic_acid = 0.57, usda_carotenoids = 32000.00, usda_lutein = 12198.00 },
                new Produce { Id = 13, ProduceCode = "strawberry", ProduceName = "Strawberry", IsParent = false, IsChild = false, Colour = "#005B82", usda_fructose = 2.44, usda_glucose = 1.99, usda_vit_c = 58.80, usda_moisture = 90.95, usda_anthocyanins = 27.10, usda_antioxidants = 2.58, usda_citric_acid = 1.01, usda_malic_acid = 0.17 },
                new Produce { Id = 14, ProduceCode = "tomato", ProduceName = "Tomato", IsParent = false, IsChild = false, Colour = "#7FADC0", usda_fructose = 1.37,usda_glucose = 1.25, usda_vit_c = 13.70, usda_moisture = 94.52, usda_antioxidants = 3.08, usda_citric_acid = 0.39, usda_malic_acid = 0.09, usda_lycopene = 2573.00, usda_carotenoids = 7575.00 },
                new Produce { Id = 15, ProduceCode = "apple", ProduceName = "Apple", IsParent = true, IsChild = false, Colour = "#00405C" },
                new Produce { Id = 16, ProduceCode = "grape", ProduceName = "Grape", IsParent = true, IsChild = false, Colour = "#1CAC69" },
            };

                var listBostonRetailer = new List<Retailer>
            {
                new Retailer { Id = 1, RetailerCode = "aldi", RetailerName = "Aldi" },
                new Retailer { Id = 2, RetailerCode = "amazon-fresh", RetailerName = "Amazon Fresh" },
                new Retailer { Id = 3, RetailerCode = "bjs", RetailerName = "BJS" },
                new Retailer { Id = 4, RetailerCode = "costco", RetailerName = "Costco" },
                new Retailer { Id = 5, RetailerCode = "stop-n-shop", RetailerName = "Stop N Shop" },
                new Retailer { Id = 6, RetailerCode = "target", RetailerName = "Target" },
                new Retailer { Id = 7, RetailerCode = "trader-joes", RetailerName = "Trader Joes" },
                new Retailer { Id = 8, RetailerCode = "walmart", RetailerName = "Walmart" },
                new Retailer { Id = 9, RetailerCode = "wegmans", RetailerName = "Wegmans" },
                new Retailer { Id = 10, RetailerCode = "whole-foods", RetailerName = "Whole Foods" },
            };

                var listLARetailer = new List<Retailer>
            {
                new Retailer { Id = 1, RetailerCode = "aldi", RetailerName = "Aldi" },
                new Retailer { Id = 2, RetailerCode = "amazon-fresh", RetailerName = "Amazon Fresh" },
                new Retailer { Id = 3, RetailerCode = "sprouts", RetailerName = "Sprouts" },
                new Retailer { Id = 4, RetailerCode = "costco", RetailerName = "Costco" },
                new Retailer { Id = 5, RetailerCode = "gelsons", RetailerName = "Gelsons" },
                new Retailer { Id = 6, RetailerCode = "ralphs", RetailerName = "Ralphs" },
                new Retailer { Id = 7, RetailerCode = "target", RetailerName = "Target" },
                new Retailer { Id = 8, RetailerCode = "trader-joes", RetailerName = "Trader Joes" },
                new Retailer { Id = 9, RetailerCode = "walmart", RetailerName = "Walmart" },
                new Retailer { Id = 10, RetailerCode = "whole-foods", RetailerName = "Whole Foods" },
            };

                var locationProduce = FizzWare.NBuilder.Builder<LocationProduce>.CreateListOfSize(100);

                modelBuilder.Entity<Location>().HasData(listLocation);

                modelBuilder.Entity<Retailer>().HasData(listRetailer);

                modelBuilder.Entity<Produce>().HasData(listProduce);

                // Build Location produce data
                var listLocationProduce = new List<LocationProduce>();
                var listLocationRetailer = new List<LocationRetailer>();
                int locationProduceId = 1;
                int locationRetailerId = 1;
                foreach (var location in listLocation)
                {
                    foreach (var produce in listProduce)
                    {
                        if (produce.ProduceCode == "apple-braeburn" || produce.ProduceCode == "apple-pink-lady")
                        {
                            continue;
                        }

                        listLocationProduce.Add(new LocationProduce { Id = locationProduceId, ProduceCode = produce.ProduceCode, LocationCode = location.LocationCode });
                        locationProduceId++;
                    }

                    if (location.LocationCode == "boston")
                    {
                        foreach (var retailer in listBostonRetailer)
                        {
                            listLocationRetailer.Add(new LocationRetailer { Id = locationRetailerId, RetailerCode = retailer.RetailerCode, LocationCode = location.LocationCode });
                            locationRetailerId++;
                        }
                    }
                    else
                    {
                        foreach (var retailer in listLARetailer)
                        {
                            listLocationRetailer.Add(new LocationRetailer { Id = locationRetailerId, RetailerCode = retailer.RetailerCode, LocationCode = location.LocationCode });
                            locationRetailerId++;
                        }
                    }
                }

                modelBuilder.Entity<LocationProduce>().HasData(listLocationProduce);

                modelBuilder.Entity<LocationRetailer>().HasData(listLocationRetailer);

                var listPerception = new List<CustomerPerception>()
                {
                    new CustomerPerception{PerceptionId = 1, LocationCode = "boston", RetailerCode = "wegmans", PerceptionScore = 1 },
                     new CustomerPerception{PerceptionId = 2, LocationCode = "boston", RetailerCode = "costco", PerceptionScore = 2 },
                      new CustomerPerception{PerceptionId = 3, LocationCode = "boston", RetailerCode = "whole-foods", PerceptionScore = 3 },
                       new CustomerPerception{PerceptionId = 4, LocationCode = "boston", RetailerCode = "trader-joes", PerceptionScore = 4 },
                        new CustomerPerception{PerceptionId = 5, LocationCode = "boston", RetailerCode = "aldi", PerceptionScore = 5 },
                         new CustomerPerception{PerceptionId = 6, LocationCode = "boston", RetailerCode = "bjs", PerceptionScore = 6 },
                          new CustomerPerception{PerceptionId = 7, LocationCode = "boston", RetailerCode = "amazon-fresh", PerceptionScore = 7 },
                           new CustomerPerception{PerceptionId = 8, LocationCode = "boston", RetailerCode = "stop-n-shop", PerceptionScore = 8 },
                            new CustomerPerception{PerceptionId = 9, LocationCode = "boston", RetailerCode = "target", PerceptionScore = 9 },
                             new CustomerPerception{PerceptionId = 10, LocationCode = "boston", RetailerCode = "walmart", PerceptionScore = 10 },

                     new CustomerPerception{PerceptionId = 11, LocationCode = "los-angeles", RetailerCode = "gelsons", PerceptionScore = 1 },
                     new CustomerPerception{PerceptionId = 12, LocationCode = "los-angeles", RetailerCode = "costco", PerceptionScore = 2 },
                     new CustomerPerception{PerceptionId = 20, LocationCode = "los-angeles", RetailerCode = "sprouts", PerceptionScore = 3 },
                      new CustomerPerception{PerceptionId = 13, LocationCode = "los-angeles", RetailerCode = "whole-foods", PerceptionScore = 4 },
                       new CustomerPerception{PerceptionId = 14, LocationCode = "los-angeles", RetailerCode = "trader-joes", PerceptionScore = 5 },
                        new CustomerPerception{PerceptionId = 15, LocationCode = "los-angeles", RetailerCode = "aldi", PerceptionScore = 6 },
                         new CustomerPerception{PerceptionId = 16, LocationCode = "los-angeles", RetailerCode = "ralphs", PerceptionScore = 7 },
                          new CustomerPerception{PerceptionId = 17, LocationCode = "los-angeles", RetailerCode = "amazon-fresh", PerceptionScore = 8 },
                           new CustomerPerception{PerceptionId = 18, LocationCode = "los-angeles", RetailerCode = "target", PerceptionScore = 9 },
                            new CustomerPerception{PerceptionId = 19, LocationCode = "los-angeles", RetailerCode = "walmart", PerceptionScore = 10 },


                };
               

                modelBuilder.Entity<CustomerPerception>().HasData(listPerception);

                var csvstring = @"loc_id,loc_entity,loc_name,loc_entity_id,loc_code,loc_location_type,loc_location_format,loc_address_1,loc_address_2,loc_zip_code,loc_city,loc_state,loc_province,loc_country
1,target,Target,,boston,retailer-store,Standard,822 Somerville Ave,,02140,Cambridge,MA,,USA
2,trader-joes,Trader Joe's,505,boston,retailer-store,Standard,1427 Massachusetts Ave,,02476,Arlington,MA,,USA
3,walmart,Walmart,3114,boston,retailer-store,SuperCenter,770 Broadway,,01906,Sagus,MA,,USA
4,whole-foods,Whole Foods,,boston,retailer-store,Standard,45 Beacon St,,02143,Somerville,MA,,USA
5,costco,Costco,308,boston,retailer-store,Standard,71 Second Ave,,02451,Waltham,MA,,USA
6,walmart,Walmart,05448,boston,retailer-store,SuperCenter,160 Broadway,,02767,Raynham,MA,,USA
7,walmart,Walmart,02222,boston,retailer-store,SuperCenter,333 Main St,,01876,Tewksbury,MA,,USA
8,whole-foods,Whole Foods,,boston,retailer-store,Standard,115 Prospect St,,02139,Cambridge,MA,,USA
9,tesco,Tesco,,london,retailer-store,Distribution Center,Hays Rd,,ME6 5TQ,Snodland,,,UK
10,adrian-scripps,Adrian Scripps,,,distributor,Supplier,""Moat Farm, Five Oak Green"",,TN12 6RR,Tonbridge,,,UK
11,sainsburys,Sainsbury's,,london,retailer-store,Local,33 Holborn,,EC1N 2HT,London,,,UK
12,tesco,Tesco,,london,retailer-store,Express,""1 Brewhouse Yard, St John Str, Farringdon"",,EC1V 4JD,London,,,UK
13,waitrose,Waitrose,,london,retailer-store,Standard,""74 St John Str, Farringdon"",,EC1V 4DE,London,,,UK
14,tesco,Tesco,,london,retailer-store,Express,""40 Bernard St, Russel Square"",,WC1N 1QJ,London,,,UK
15,waitrose,Waitrose,,london,retailer-store,Standard,23-39 The Brunswick Centre,,WC1N 1AF,London,,,UK
16,tesco,Tesco,,london,retailer-store,Superstore,107 Dunton Rd,,SE1 5HG,London,,,UK
17,tesco,Tesco,,london,retailer-store,Superstore, 239-241 Lower High St,,WD17 2BD,Watford,,,UK
18,tesco,Tesco,,london,retailer-store,Metro,""22-25 Bedford St, Covent Garden"",,WC2E 9EQ,London,,,UK
19,tesco,Tesco,,london,retailer-store,Metro,""Dean St, Soho"",,W1D 3RF,London,,,UK
20,tesco,Tesco,,london,retailer-store,Express,125 Strand,,WC2R 0AP,London,,,UK
21,sainsburys,Sainsbury's,,london,retailer-store,Local,77 Fleet St,,EC4Y 1HY,London,,,UK
22,sainsburys,Sainsbury's,,london,retailer-store,Local,36-37 Strand,,WC2N 5HY,London,,,UK
23,sainsburys,Sainsbury's,,london,retailer-store,Standard,40 New Kent Rd,,SE1 6TJ,London,,,UK
24,sainsburys,Sainsbury's,,london,retailer-store,Standard,Albert Rd S,,WD17 1PE,Watford,,,UK
25,aldi,Aldi,,london,retailer-store,Standard,840 Old Kent Rd,,SE15 1NQ,London,,,UK
26,aldi,Aldi,,london,retailer-store,Standard,""142-162 Kilburn High Rd, North Maida Vale "",,NW6 4JD,London,,,UK
27,waitrose,Waitrose,,london,retailer-store,Standard,""300 Oxford St, Marylebone"",,W1C 1DX,London,,,UK
28,waitrose,Waitrose,,london,retailer-store,Standard,246 High Holborn,,WC1V 7EX,London,,,UK
29,asda,Asda,,london,retailer-store,Superstore, 464 - 504 Old Kent Rd,,SE1 5AG,London,,,UK
30,asda,Asda,,london,retailer-store,Superstore,""Odhams Industrial Estate, St Albans Rd"",,WD24 7RT,Watford,,,UK
31,walmart,Walmart,,boston,retailer-store,Superstore,46 North-South Rd,,03860,North Conway,NH,,USA
32,aldi,Aldi,39,boston,retailer-store,Standard,1138 Pontiac Ave,,02920,Cranston,RI,,USA
33,walmart,Walmart,01873,boston,retailer-store,Supercenter,1776 Plainfield Pike,,02921,Cranston,RI,,USA
34,stop-n-shop,Stop-N-Shop,,boston,retailer-store,Standard,779 McGrath Highway,,02145,Somerville,MA,,USA
35,trader-joes,Trader Joe's,,boston,retailer-store,Standard,145 Middlesex Ave,,02145,Somerville,MA,,USA
36,whole-foods,Whole Foods,,boston,retailer-store,Standard,200 Alewife Brook Parkway,,02138,Cambridge,MA,,USA
37,stop-n-shop,Stop-N-Shop,,boston,retailer-store,Standard,105 Alewife Brook Parkway,,02145,Somerville,MA,,USA
38,trader-joes,Trader Joe's,517,boston,retailer-store,Standard,211 Alewife Brook Parkway,,02143,Cambridge,MA,,USA
39,wilson-farms,Wilson Farms,,,farmstand,Farmstand,10 Pleasant St,,02421,Lexington,MA,,USA
40,walmart,Walmart,,boston,retailer-store,Superstore,116 Farmington Rd,,03867,Rochester,NH,,USA
41,target,Target,,boston,retailer-store,City,564 Massachusetts Ave,,02139,Rochester,MA,,USA
42,walmart,Walmart,,boston,retailer-store,Standard,121 Worcester RD,,01701,Framingham,MA,,USA
43,whole-foods,Whole Foods,,boston,retailer-store,Standard,151 Sockanoseet Cross Road,,02920,Cranston,RI,,USA
44,whole-foods,Whole Foods,,boston,retailer-store,Standard,647 Washington St,,02458,Newton,MA,,USA
45,wegmans,Wegman's,407452,boston,retailer-store,Standard,200 Boylson St,,02467,Chestnut Hill,MA,,USA
46,whole-foods,Whole Foods,,boston,retailer-store,Standard,181 Cambridge St,,02114,Boston,MA,,USA
47,down-south-blues,Down South Blues,,,producer,Supplier,1291 NE Hansel Ave,,34266,Arcadia,FL,,USA
48,whole-foods,Whole Foods,,boston,retailer-store,Standard,15 Wesetland Ave,,02115,Boston,MA,,USA
49,walmart,Walmart,,boston,retailer-store,SuperCenter,39 E Main St,,03276,Tilton,NH,,USA
50,walmart,Walmart,,boston,retailer-store,SuperCenter,3 Commerce Drive,,03106,Hooksett,NH,,USA
51,trader-joes,Trader Joe's,,boston,retailer-store,Standard,,,,,MA,,USA
52,riverview-farms,Riverview Farms,,,producer,Small Producer,141 River Rd,,03781,Plainfield,NH,,USA
53,macks-apples,Macks Apples,,,producer,Small Producer,230 Mammoth Rd,,03053,Londonderry,NH,,USA
54,wellswood,Wellswood,,,producer,Small Producer,529 Wellwood Orchards Rd,,05156,Springfield,VT,,USA
55,pippin-orchards,Pippin Orchards,,,producer,Small Producer,751 Pippin Orchard Rd,,02921,Cranston,RI,,USA
56,aldi,Aldi,,boston,retailer-store,Standard,544 Westgate Dr,,02301,Brockton,MA,,USA
57,bjs,BJ's,34,boston,retailer-store,Standard,901 Technology Center Dr,,02072,Stoughton,MA,,USA
58,stop-n-shop,Stop-N-Shop,2411,boston,retailer-store,Standard,105 Alewife Brook Pkwy,,02140,Somerville,MA,,USA
59,amazon-fresh,Amazon Fresh,,boston,retailer-online,Delivery,,,,Waltham,MA,,USA
60,amazon-fresh,Amazon Fresh,,los-angeles,retailer-online,Delivery,,,,Santa Monica,CA,,USA
61,wegmans,Wegman's,,boston,retailer-store,Standard,3850 Mystic Valley Pkwy,,02155,Medford,MA,,USA
62,aldi,Aldi,,los-angeles,retailer-store,Standard,3330 W Century Blvd,,90303,Inglewood,CA,,USA
63,sprouts,Sprouts,,los-angeles,retailer-store,Standard,3105 Wilshire Blvd,,90403,Santa Monica,CA,,USA
64,costco,Costco,,los-angeles,retailer-store,Standard,13463 Washington Blvd,,90292,Marina Del Rey,CA,,USA
65,ralphs,Ralph's,,los-angeles,retailer-store,Standard,1644 Cloverfield Blvd,,90404,Santa Monica,CA,,USA
66,target,Target,,los-angeles,retailer-store,Standard,2169 W Redondo Beach Blvd,,90247,Gardena,CA,,USA
67,trader-joes,Trader Joe's,,los-angeles,retailer-store,Standard,3212 Pico Blvd,,90405,Santa Monica,CA,,USA
68,walmart,Walmart,,los-angeles,retailer-store,SuperCenter,4651 Firestone Blvd,,90280,South Gate,CA,,USA
69,gelsons,Gelson's,,los-angeles,retailer-store,Standard,13455 Maxella Ave,,90292,Marina Del Rey,CA,,USA
70,whole-foods,Whole Foods,,los-angeles,retailer-store,Standard,2121 Cloverfield Blvd,,90404,Santa Monica,CA,,USA
71,walmart,Walmart,2021,boston,retailer-store,SuperCenter,36 Paramount Dr ,,02767,Raynham,MA,,USA
72,aldi,Aldi,79,boston,retailer-store,Standard,630 Fellsway,,02155,Medford,MA,,USA
73,wegmans,Wegman's,87,boston,retailer-store,Standard,3850 Mystic Valley Pkwy,,02155,Medford,MA,,USA
74,bjs,BJ's,1,boston,retailer-store,Standard,278 Middlesex Ave ,,02155,Medford,MA,,USA
75,costco,Costco,333,boston,retailer-store,Standard,2 Mystic View Rd,,02149,Everett,MA,,USA
76,stop-n-shop,Stop-N-Shop,776,boston,retailer-store,Standard,905 Massachusetts Ave,,02476,Arlington,MA,,USA
77,aldi,Aldi,,los-angeles,retailer-store,Standard,17070 Magnolia St,,92708,Fountain Valley,CA,,USA
78,sprouts,Sprouts,,los-angeles,retailer-store,Standard,6942 Warner Ave.,,92647,Huntington Beach,CA,,USA
79,costco,Costco,,los-angeles,retailer-store,Standard,7562 Center Ave ,,92647,Huntington Beach,CA,,USA
80,ralphs,Ralph's,,los-angeles,retailer-store,Standard,19081 Goldenwest St ,,92648,Huntington Beach,CA,,USA
81,target,Target,,los-angeles,retailer-store,Standard,3030 Harbor Blvd ste a,,92626,Costa Mesa,CA,,USA
82,trader-joes,Trader Joe's,,los-angeles,retailer-store,Standard,18681 Main St,,92648,Huntington Beach,CA,,USA
83,walmart,Walmart,,los-angeles,retailer-store,SuperCenter,3600 W McFadden Ave,,92704,Santa Ana,CA,,USA
84,gelsons,Gelson's,,los-angeles,retailer-store,Standard,1660 San Miguel Dr,,92660,Newport Beach,CA,,USA
85,whole-foods,Whole Foods,,los-angeles,retailer-store,Standard,7881 Edinger Ave Ste 150 ,,92647,Huntington Beach,CA,,USA
86,amazon-fresh,Amazon Fresh,,los-angeles,retailer-online,Delivery,,,,Huntington Beach,CA,,USA
87,whole-foods,Whole Foods,,los-angeles,retailer-store,Standard,760 S Sepulveda Blvd,,90245, El Segundo,CA,,USA
88,ralphs,Ralph's,,los-angeles,retailer-store,Standard,2700 N Sepulveda Blvd,,90266, Manhattan Beach,CA,,USA
89,target,Target,,los-angeles,retailer-store,Standard,1200 N Sepulveda Blvd,,90266, Manhattan Beach,CA,,USA
90,gelsons,Gelson's,,los-angeles,retailer-store,Standard,707 N Sepulveda Blvd,,90266, Manhattan Beach,CA,,USA
91,walmart,Walmart,,los-angeles,retailer-store,Standard,14441 S Inglewood Ave,,90250, Hawthorne,CA,,USA
92,trader-joes,Trader Joe's,,los-angeles,retailer-store,Standard,1800 Rosecrans Ave,,90266, Manhattan Beach,CA,,USA
93,costco,Costco,,los-angeles,retailer-store,Standard,14501 Hindry Ave,,90250, Hawthorne,CA,,USA
94,amazon-fresh,Amazon Fresh,,los-angeles,retailer-online,Delivery,,,,Manhattan Beach,CA,,USA
95,aldi,Aldi,,los-angeles,retailer-store,Standard,1550 W Redondo Beach Blvd,, 90247, Gardena,CA,,USA
96,sprouts,Sprouts,,los-angeles,retailer-store,Standard,1515 Hawthorne Blvd,, 90278, Redondo Beach,CA,,USA
97,bjs,BJ's,,boston,retailer-store,Standard,66 Seyon St,, 02453, Waltham,MA,,USA
98,stop-n-shop,Stop-N-Shop,,boston,retailer-store,Standard,700 Pleasant St,,02472, Watertown,MA,,USA
99,target,Target,,boston,retailer-store,Delivery,550 Arsenal St,,02472, Watertown,MA,,USA
100,trader-joes,Trader Joe's,,boston,retailer-store,Standard,1121 Washington St,, 02465, West Newton,MA,,USA
101,wegmans,Wegman's,,boston,retailer-store,Delivery,53 3rd Ave,,01803, Burlington,MA,,USA
102,whole-foods,Whole Foods,,boston,retailer-store,Standard,647 Washington St,,02458, Newton,MA,,USA
103,sprouts,Sprouts,,los-angeles,retailer-store,Standard,5660 Sepulveda Blvd,,90230, Culver City,CA,,USA
104,costco,Costco,,los-angeles,retailer-store,Standard,3560 W Century Blvd,,90303, Inglewood,CA,,USA
105,ralphs,Ralph's,,los-angeles,retailer-store,Standard,500 N Sepulveda Blvd,,90245,El Segundo,CA,,USA
106,target,Target,,los-angeles,retailer-store,Standard,14310 Hawthorne Blvd,,90260, Lawndale,CA,,USA
107,trader-joes,Trader Joe's,,los-angeles,retailer-store,Standard,1821 Manhattan Beach Blvd,,90266, Manhattan Beach,CA,,USA
108,gelsons,Gelson's,,los-angeles,retailer-store,Standard,13455 Maxella Ave,,90292, Marina Del Rey,CA,,USA
109,whole-foods,Whole Foods,,los-angeles,retailer-store,Standard,405 N Pacific Coast Hwy,,90277,""Redondo Beach, CA "",CA,,USA
";

                // convert string to stream
                byte[] byteArray = Encoding.ASCII.GetBytes(csvstring);
                MemoryStream stream = new MemoryStream(byteArray);

                // convert stream to string
                StreamReader streamReader = new StreamReader(stream);

                using (var csv = new CsvReader(streamReader))
                {
                    var listRecoreds = csv.GetRecords<RefLocation>().ToList();
                    modelBuilder.Entity<RefLocation>().HasData(listRecoreds);
                }

                var analyteUom = new List<AnalyteUom>
                {
                   new AnalyteUom { AnalyteName = "sucrose", Uom = "g" },
                   new AnalyteUom { AnalyteName = "fructose", Uom = "g" },
                   new AnalyteUom { AnalyteName = "glucose", Uom = "g" },
                   new AnalyteUom { AnalyteName = "vit_c", Uom = "mg" },
                   new AnalyteUom { AnalyteName = "moisture", Uom = "g" },
                   new AnalyteUom { AnalyteName = "anthocyanins", Uom = "mg" },
                   new AnalyteUom { AnalyteName = "antioxidants", Uom = "mmol" },
                   new AnalyteUom { AnalyteName = "citric_acid", Uom = "g" },
                   new AnalyteUom { AnalyteName = "malic_acid", Uom = "g" },
                   new AnalyteUom { AnalyteName = "oxalic_acid", Uom = "g" },
                   new AnalyteUom { AnalyteName = "tartaric", Uom = "g" },
                   new AnalyteUom { AnalyteName = "oil_total", Uom = "g" },
                   new AnalyteUom { AnalyteName = "oleic", Uom = "g" },
                   new AnalyteUom { AnalyteName = "linoleic", Uom = "g" },
                   new AnalyteUom { AnalyteName = "palmitic", Uom = "g" },
                   new AnalyteUom { AnalyteName = "palmitoleic", Uom = "g" },
                   new AnalyteUom { AnalyteName = "lycopene", Uom = "ug" },
                   new AnalyteUom { AnalyteName = "carotenoids", Uom = "ug" },
                   new AnalyteUom { AnalyteName = "lutein", Uom = "ug" },
                   new AnalyteUom { AnalyteName = "potassium", Uom = "mg" },
                };

                modelBuilder.Entity<AnalyteUom>().HasData(analyteUom);

            });
        }
    }
}