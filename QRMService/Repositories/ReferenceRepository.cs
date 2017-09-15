using QRMService.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Repositories
{
    public class ReferenceRepository
    {
        public static List<ReferenceTable> GetReferenceDataByTable(string tableName)
        {
            using (var db = new QRMEntities())
            {
                return db.ReferenceTables.Where(a => a.ReferenceTableName == tableName).ToList();
            }

        }
    }
}