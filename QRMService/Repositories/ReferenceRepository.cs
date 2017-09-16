using QRMService.DataBase;
using QRMService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Repositories
{
    public class ReferenceRepository
    {
        /// <summary>
        /// Gets the name of the reference data by table.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        public static List<ReferenceTableResponseModel> GetReferenceDataByTableName(string tableName)
        {
            using (var db = new QRMEntities())
            {
                return db.ReferenceTables.Where(a => a.ReferenceTableName == tableName).Select(b => new ReferenceTableResponseModel
                {
                    ReferenceTableName = b.ReferenceTableName,
                    ReferenceCode = b.ReferenceCode,
                    ReferenceValue = b.ReferenceValue
                }).ToList();
            }

        }

        /// <summary>
        /// Gets the reference data by table name and code.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        public static List<ReferenceTableResponseModel> GetReferenceValueByCode(string tableName, string code)
        {
            using (var db = new QRMEntities())
            {
                return db.ReferenceTables.Where(a => a.ReferenceTableName == tableName && a.ReferenceCode == code)
                    .Select(b => new ReferenceTableResponseModel
                    {
                        ReferenceTableName = b.ReferenceTableName,
                        ReferenceCode = b.ReferenceCode,
                        ReferenceValue = b.ReferenceValue
                    }).ToList();
            }

        }
    }
}