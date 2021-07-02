// <copyright file="TeakOriginContextFixure.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>
namespace Teakorigin.UnitTests.Fixures
{
    using System;
    using System.IO;
    using System.Threading.Tasks;
    using FluentAssertions;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Http.Internal;
    using Microsoft.Data.Sqlite;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Caching.Distributed;
    using Microsoft.Extensions.Logging;
    using Moq;
    using Teakorigin.App.Controllers;
    using Teakorigin.DataAccess;
    using Teakorigin.Domain.Models;
    using Xunit;

    /// <summary>
    /// tesk origin COntext fixure.
    /// </summary>
    /// <seealso cref="System.IDisposable" />
    public class TeakOriginContextFixure : IDisposable
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TeakOriginContextFixure"/> class.
        /// </summary>
        public TeakOriginContextFixure()
        {
            // In-memory database only exists while the connection is open
            this.Connection = new SqliteConnection("DataSource=:memory:");
            this.Connection.Open();

            var options = new DbContextOptionsBuilder<TeakOriginContext>()
                   .UseSqlite(this.Connection)
                   .Options;

            using (var context = new TeakOriginContext(options))
            {
                context.Database.Migrate();
            }

            Mock<IDistributedCache> cachce = new Mock<IDistributedCache>();
            Mock<ILogger<UploadController>> logger = new Mock<ILogger<UploadController>>();
            Mock<AppSettings> appSettings = new Mock<AppSettings>();

            // Run the test against one instance of the context
            using (var context = new TeakOriginContext(options))
            {
                var sut = new UploadController(context, appSettings.Object, cachce.Object, logger.Object);
                using (var stream = File.OpenRead("Resources/SampleUploadFile.csv"))
                {
                    var file = new FormFile(stream, 0, stream.Length, "test", Path.GetFileName(stream.Name))
                    {
                        Headers = new HeaderDictionary(),
                        ContentType = "application/csv",
                    };

                    var op = sut.Process(file).Result;
                }
            }
        }

        /// <summary>
        /// Gets the teak origin context.
        /// </summary>
        /// <value>
        /// The teak origin context.
        /// </value>
        public SqliteConnection Connection { get; }

        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
        /// </summary>
        public void Dispose()
        {
            this.Connection.Close();
            GC.SuppressFinalize(this);
        }
    }

    /// <summary>
    /// Collection fixure.
    /// </summary>
    /// <seealso cref="Xunit.ICollectionFixture{Teakorigin.UnitTests.Fixures.TeakOriginContextFixure}" />
    [CollectionDefinition("Database collection")]
    public class DatabaseCollection : ICollectionFixture<TeakOriginContextFixure>
    {
        // This class has no code, and is never created. Its purpose is simply
        // to be the place to apply [CollectionDefinition] and all the
        // ICollectionFixture<> interfaces.
    }
}
