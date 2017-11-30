using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace QRMFrameworkHelpers
{
    public static class Utility
    {
        public static DataTable ToTable<T>(this IEnumerable<T> entities, DataTable dataTable, Action<T, DataRow> fillRow)
        {
            entities.ToList().ForEach(e =>
            {
                DataRow row = dataTable.NewRow();
                fillRow(e, row);
                dataTable.Rows.Add(row);
            });

            return dataTable;
        }
        /// <summary>
        /// This function is used for validating and XML file
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public static IEnumerable<IEnumerable<T>> Partition<T>(this IEnumerable<T> source, int size)
        {
            int i = 0;
            var list = new List<T>(size);
            foreach (T item in source)
            {
                list.Add(item);
                if (++i == size)
                {
                    yield return list;
                    list = new List<T>(size);
                    i = 0;
                }
            }

            if (list.Count > 0)
                yield return list;
        }
    }
}
