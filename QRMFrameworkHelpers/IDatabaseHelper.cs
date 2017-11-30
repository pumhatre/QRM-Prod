using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.Linq;

namespace QRMFrameworkHelpers
{
    public interface IDatabaseHelper
    {
        void BulkInsert(DataTable dataTable, string tableName, string connectionName = "default");
        void BulkInsert<T>(IEnumerable<T> entities, string tableName, Action<T, DataRow> fillEntity, string connectionName = "default");
        DataSet GetDataSetByProcedure(string storedProcedure, string connectionName = "default", bool closeConnection = true, params KeyValuePair<string, object>[] parameters);
        DataSet GetDataSetBySql(string sql, string connectionName = "default", bool closeConnection = true, params KeyValuePair<string, object>[] parameters);
        DataTable GetDataTableByProcedure(string storedProcedure, string connectionName = "default", bool closeConnection = true, params KeyValuePair<string, object>[] parameters);
        DataTable GetDataTableBySql(string sql, string connectionName = "default", bool closeConnection = true, params KeyValuePair<string, object>[] parameters);
        object GetScalarByProcedure(string storedProcedure, string connectionName = "default", bool closeConnection = true, params KeyValuePair<string, object>[] parameters);
        object GetScalarBySql(string sql, string connectionName = "default", bool closeConnection = true, params KeyValuePair<string, object>[] parameters);
        int RunProcedure(string procedureName, string connectionName = "default", bool closeConnection = true, params KeyValuePair<string, object>[] parameters);
        int RunSql(string sql, string connectionName = "default", bool closeConnection = true, params KeyValuePair<string, object>[] parameters);
    }
}
