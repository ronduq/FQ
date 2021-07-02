// <copyright file="GlobalSuppressions.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Reliability", "CA2007:Consider calling ConfigureAwait on the awaited task", Justification = "Not needed.", Scope = "member", Target = "~M:Teakorigin.Advanced.App.Controllers.UploadController.Index(Microsoft.AspNetCore.Http.IFormFile)~System.Threading.Tasks.Task{Microsoft.AspNetCore.Mvc.IActionResult}")]

[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Globalization", "CA1308:Normalize strings to uppercase", Justification = "Lowercase needed.", Scope = "member", Target = "~M:Teakorigin.Advanced.App.Controllers.UploadController.Process(Microsoft.AspNetCore.Http.IFormFile)~System.Threading.Tasks.Task{System.Boolean}")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Globalization", "CA1308:Normalize strings to uppercase", Justification = "Lowercase needed.", Scope = "member", Target = "~P:Teakorigin.Advanced.App.Models.TopPicksDetails.Analytes")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Design", "CA1052:Static holder types should be Static or NotInheritable", Justification = "n.et core class.", Scope = "type", Target = "~T:Teakorigin.Advanced.App.Program")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Design", "CA1031:Do not catch general exception types", Justification = "Needed for the upload process.", Scope = "member", Target = "~M:Teakorigin.Advanced.App.Controllers.UploadController.Index(Microsoft.AspNetCore.Http.IFormFile)~System.Threading.Tasks.Task{Microsoft.AspNetCore.Mvc.IActionResult}")]
