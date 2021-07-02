﻿// <copyright file="ResponseExtentions.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// <autogenerated />
// </copyright>
namespace Teakorigin.App.Extentions
{
    using System;
    using System.Collections.Generic;
    using System.Net;
    using Microsoft.AspNetCore.Mvc;
    using Teakorigin.App.Models;

   /// <summary>
   /// Response extentions class.
   /// </summary>
    public static class GeneralExtentions
    {
        /// <summary>
        /// Converts to httpresponse.
        /// </summary>
        /// <param name="response">The response.</param>
        /// <returns></returns>
        public static IActionResult ToHttpResponse(this IResponse response)
        {
            var status = response.DidError ? HttpStatusCode.InternalServerError : HttpStatusCode.OK;

            return new ObjectResult(response)
            {
                StatusCode = (int)status,
            };
        }

        /// <summary>
        /// Dates the time month.
        /// </summary>
        /// <param name="dt">The dt.</param>
        /// <param name="numberOfweeks">The number ofweeks.</param>
        /// <param name="lastdataFound">The lastdata found.</param>
        /// <returns>
        /// Returns Last Weeks
        /// </returns>
        public static List<DateTime> GetLastNWeeks(this DateTime dt, DateTime lastdataFound, int numberOfweeks = 10)
        {
            var lastPeriodsStartDates = new List<DateTime>();
            DateTime lastFridayDate = DateTime.Now;

                // Get last Friday or last month
                var day = lastdataFound.Date;

                while (day.DayOfWeek != DayOfWeek.Thursday)
                {
                    day = day.AddDays(-1);
                }

                lastFridayDate = day;

                for (var period = 0; period <= numberOfweeks; period++)
                {
                    lastPeriodsStartDates.Add(lastFridayDate.AddDays(1));
                    lastFridayDate = lastFridayDate.AddDays(-7);
                }
            return lastPeriodsStartDates;
        }

        /// <summary>
        /// Gets the next weekday.
        /// </summary>
        /// <param name="dt">The dt.</param>
        /// <param name="day">The day.</param>
        /// <param name="start">The start.</param>
        /// <returns></returns>
        public static DateTime GetNextWeekday(this DateTime dt, DayOfWeek day, DateTime start)
        {
            // The (... + 7) % 7 ensures we end up with a value in the range [0, 6]
            int daysToAdd = ((int)day - (int)start.DayOfWeek + 7) % 7;
            var retVal = start.AddDays(daysToAdd);

            return retVal;
        }
        /// <summary>
        /// Dates the time month.
        /// </summary>
        /// <param name="dt">The dt.</param>
        /// <param name="numberOfMonths">The number of months.</param>
        /// <returns>
        /// Returns Last Weeks
        /// </returns>
        public static List<DateTime> GetLastNMonths(this DateTime dt, int numberOfMonths = 10)
        {
            var today = DateTime.Today;
            var month = new DateTime(today.Year, today.Month, 1);
            var lastPeriodsStartDates = new List<DateTime>();
            for (var period = 0; period <= numberOfMonths; period++)
            {
                lastPeriodsStartDates.Add(month);
                month = month.AddMonths(-1);
            }

            return lastPeriodsStartDates;
        }

        /// <summary>
        /// Percents to double.
        /// </summary>
        /// <param name="percent">The percent.</param>
        /// <returns></returns>
        public static double? PercentToDouble(this string percent)
        {
            percent = percent.Replace("%", "");

            if( double.TryParse(percent, out double result))
            {
                return result;
            }
            else
            {
                return null;
            }
        }
    }
}