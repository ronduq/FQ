// <copyright file="CacheExtensions.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>
// <autogenerated />

namespace Teakorigin.Advanced.App.Extensions
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Runtime.Serialization.Formatters.Binary;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Caching.Distributed;
    using Teakorigin.Advanced.App.Constants;
    using Teakorigin.Advanced.App.Extentions;

    public static class CacheExtensions
    {
        private static byte[] ToByteArray(this object obj)
        {
            if (obj == null)
            {
                return null;
            }
            BinaryFormatter binaryFormatter = new BinaryFormatter();
            using (MemoryStream memoryStream = new MemoryStream())
            {
                binaryFormatter.Serialize(memoryStream, obj);
                return memoryStream.ToArray();
            }
        }

        private static T FromByteArray<T>(this byte[] byteArray) where T : class
        {
            if (byteArray == null)
            {
                return default(T);
            }

            BinaryFormatter binaryFormatter = new BinaryFormatter();
            using (MemoryStream memoryStream = new MemoryStream(byteArray))
            {
                return binaryFormatter.Deserialize(memoryStream) as T;
            }
        }

        public static async Task SetAsync<T>(this IDistributedCache distributedCache, string key, T value, DistributedCacheEntryOptions options, CancellationToken token = default(CancellationToken))
        {
            await distributedCache.SetAsync(key, value.ToByteArray(), options, token);
        }

        public static async Task<T> GetAsync<T>(this IDistributedCache distributedCache, string key, CancellationToken token = default(CancellationToken)) where T : class
        {
            var result = await distributedCache.GetAsync(key, token);
            return result.FromByteArray<T>();
        }

        public static async Task<T> GetOrCreateAsync<T>(this IDistributedCache distributedCache, string key, T value, CancellationToken token = default(CancellationToken)) where T : class
        {
            var valueFromCache = await distributedCache.GetAsync<T>(key, token);

            if (valueFromCache == null)
            {
                var absoluteExpiration = DateTime.Now.GetNextWeekday(DayOfWeek.Friday, DateTime.Now).Date;

                if(absoluteExpiration.DayOfWeek == DayOfWeek.Friday)
                {
                    absoluteExpiration = absoluteExpiration.AddDays(7);
                }

                await distributedCache.SetAsync<T>(key, value, new DistributedCacheEntryOptions { AbsoluteExpiration = absoluteExpiration }, token);

                valueFromCache = value;
            }

            await distributedCache.UpdateCahceKeys(key);

            return valueFromCache;
        }

        public static async Task ClearCache(this IDistributedCache distributedCache, string cacheKey)
        {
            var cacheKeyList = await distributedCache.GetAsync<List<string>>(cacheKey);

            // remove the keys from the cache
            if (cacheKeyList != null)
            {
                cacheKeyList.ForEach(x => distributedCache.RemoveAsync(x));
            }

            // and the list with keys
            await distributedCache.RemoveAsync(cacheKey);
        }

        public static async Task<List<string>> UpdateCahceKeys(this IDistributedCache distributedCache, string key)
        {
            // IDistributed don't offer a purge mechanism so we save all cache keys in list and store it in the cache
            // Later we can retrive the keys to purge it.
            var cacheKey = CacheKeys.CacheColectionKey;

            var cacheKeyList = await distributedCache.GetAsync<List<string>>(cacheKey);

            if (cacheKeyList == null)
            {
                cacheKeyList = new List<string>();
            }

            // store the new key to the list
            cacheKeyList.Add(key);

            var absoluteExpiration = DateTime.Now.GetNextWeekday(DayOfWeek.Friday, DateTime.Now).Date;

            if (absoluteExpiration.DayOfWeek == DayOfWeek.Friday)
            {
                absoluteExpiration = absoluteExpiration.AddDays(7);
            }

            await distributedCache.SetAsync(cacheKey,
                                            cacheKeyList.Distinct().ToList(),
                                            new DistributedCacheEntryOptions { AbsoluteExpiration = absoluteExpiration }).ConfigureAwait(false);

            return cacheKeyList;
        }
    }
}
