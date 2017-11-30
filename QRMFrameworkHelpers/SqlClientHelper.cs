using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.Linq;

namespace QRMFrameworkHelpers
{
    public class SqlClientHelper : DatabaseHelper<SqlConnection, SqlCommand, SqlDataAdapter, SqlDataReader, SqlParameter>
    {
        public override void BulkInsert<T>(IEnumerable<T> entities, string tableName, Action<T, DataRow> fillEntity, string connectionName = "default")
        {
            var table = GetDataTableBySql(string.Format("SELECT * FROM {0} WHERE 1=0", tableName), connectionName);

            var entityTable = entities.ToTable(table, fillEntity);

            BulkInsert(entityTable, tableName, connectionName);
        }

        public override void BulkInsert(DataTable dataTable, string tableName, string connectionName = "default")
        {
            // connect to SQL
            using (var connection = GetConnection(connectionName))
            {
                const string bulkCopyTimeOut = "180";
                // make sure to enable triggers
                // more on triggers in next post
                SqlBulkCopy bulkCopy = new SqlBulkCopy(connection, SqlBulkCopyOptions.TableLock | SqlBulkCopyOptions.FireTriggers | SqlBulkCopyOptions.UseInternalTransaction, null)
                {
                    DestinationTableName = tableName,
                    BulkCopyTimeout = int.Parse(ConfigurationManager.AppSettings["BulkCopyTimeout"] ?? bulkCopyTimeOut)
                };

                // set the destination table name

                if (connection.State != ConnectionState.Open)
                    connection.Open();


                // write the data in the "dataTable"
                bulkCopy.WriteToServer(dataTable);
            }
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        protected override XDocument CommandToXDocument(SqlCommand command)
        {
            var reader = command.ExecuteXmlReader();

            reader.MoveToContent();

            var result = reader.ReadState == ReadState.Interactive ? XDocument.Load(reader) : new XDocument();

            return result;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        protected override XmlDocument CommandToXmlDocument(SqlCommand command)
        {
            XmlDocument document;

            using (var xmlReader = command.ExecuteXmlReader())
            {
                document = new XmlDocument();

                xmlReader.MoveToContent();

                document.Load(xmlReader);

                if (xmlReader.ReadState == ReadState.Interactive)
                    document.Load(xmlReader);
            }

            return document;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        protected override XmlReader CommandToXmlReader(SqlCommand command)
        {
            var reader = command.ExecuteXmlReader();

            reader.MoveToContent();

            return reader;
        }

        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        protected override SqlCommand CreateCommand()
        {
            return new SqlCommand();
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="connectionString"></param>
        /// <returns></returns>
        protected override SqlConnection CreateConnection(string connectionString)
        {
            return new SqlConnection(connectionString);
        }

        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        protected override SqlDataAdapter CreateDataAdapter()
        {
            return new SqlDataAdapter();
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="name"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        protected override SqlParameter CreateDbParameter(string name, object value)
        {
            return new SqlParameter(name, value);
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        protected override SqlDataReader ExecuteReader(SqlCommand command)
        {
            return command.ExecuteReader();
        }
    }

}
