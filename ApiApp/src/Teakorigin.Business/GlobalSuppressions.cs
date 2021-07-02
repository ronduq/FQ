// <copyright file="GlobalSuppressions.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Usage", "CA2234:Pass system uri objects instead of strings", Justification = "String is okay instead of URI cause we already know the absolute URI.", Scope = "member", Target = "~M:Teakorigin.Business.Services.ContentService.GetData(System.String)~System.Threading.Tasks.Task{System.Net.Http.HttpResponseMessage}")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Globalization", "CA1303:Do not pass literals as localized parameters", Justification = "Resource file is not required. It's a config error.", Scope = "member", Target = "~M:Teakorigin.Business.Services.SendgridSubscriptionService.Subscribe(System.String)~System.Threading.Tasks.Task{System.Net.Http.HttpResponseMessage}")]
