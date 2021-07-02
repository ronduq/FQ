// <copyright file="AutoMoqDataAttribute.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Teakorigin.UnitTests.Attributes
{
    using AutoFixture;
    using AutoFixture.AutoMoq;
    using AutoFixture.Xunit2;

    /// <summary>
    /// Automatic mocking of data.
    /// </summary>
    /// <seealso cref="AutoFixture.Xunit2.AutoDataAttribute" />
    public class AutoMoqDataAttribute : AutoDataAttribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AutoMoqDataAttribute" /> class.
        /// </summary>
        /// <remarks>
        /// This constructor overload initializes the <see cref="AutoFixture.Xunit2.AutoDataAttribute.Fixture" /> to an instance of
        /// <see cref="AutoFixture.Xunit2.AutoDataAttribute.Fixture" />.
        /// </remarks>
        public AutoMoqDataAttribute()
        : base(() => new Fixture().Customize(new AutoMoqCustomization()))
        {
        }
    }

    /// <summary>
    /// In line attribute.
    /// </summary>
    /// <seealso cref="AutoFixture.Xunit2.InlineAutoDataAttribute" />
    public class InlineAutoMoqDataAttribute : InlineAutoDataAttribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="InlineAutoMoqDataAttribute" /> class.
        /// </summary>
        /// <param name="objects">The objects.</param>
        public InlineAutoMoqDataAttribute(params object[] objects)
            : base(new AutoMoqDataAttribute(), objects)
        {
        }
    }
}
