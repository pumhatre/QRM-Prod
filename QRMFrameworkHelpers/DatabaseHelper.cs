using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Xml;
using System.Xml.Linq;
using System.Configuration;
using System.Collections;

namespace QRMFrameworkHelpers
{
    /// <summary>
    ///
    /// </summary>
    public abstract class DatabaseHelper<TConnection, TCommand, TAdapter, TReader, TParameter> : IDatabaseHelper
        where TAdapter : DbDataAdapter
        where TReader : DbDataReader
        where TCommand : DbCommand
        where TConnection : DbConnection
        where TParameter : DbParameter
    {
        public virtual void BulkInsert(DataTable dataTable, string tableName, string connectionName = "default")
        {
        }

        public virtual void BulkInsert<T>(IEnumerable<T> entities, string tableName, Action<T, DataRow> fillEntity, string connectionName = "default")
        {
        }

        /// <summary>
        /// Return a datatable by stored procedure
        /// </summary>
        /// <param name="storedProcedure">The name of the stored procedure</param>
        /// <param name="connectionName">Optional connection name (defaults to "default")</param>
        /// <param name="closeConnection">Optional closeConnection bool parameter (defaults to true)</param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public DataSet GetDataSetByProcedure(string storedProcedure, string connectionName = "default", bool closeConnection = true,
                                          params KeyValuePair<string, object>[] parameters)
        {
            return GetResult(storedProcedure, CommandType.StoredProcedure, GetDataSet, connectionName, closeConnection, parameters);
        }

        /// <summary>
        /// Return a datatable by text text
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="connectionName">Optional connection name (defaults to "default")</param>
        /// <param name="closeConnection">Optional closeConnection bool parameter (defaults to true)</param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public DataSet GetDataSetBySql(string sql, string connectionName = "default", bool closeConnection = true,
                                          params KeyValuePair<string, object>[] parameters)
        {
            return GetResult(sql, CommandType.Text, GetDataSet, connectionName, closeConnection, parameters);
        }

        /// <summary>
        /// Return a datatable by stored procedure
        /// </summary>
        /// <param name="storedProcedure">The name of the stored procedure</param>
        /// <param name="connectionName">Optional connection name (defaults to "default")</param>
        /// <param name="closeConnection">Optional closeConnection bool parameter (defaults to true)</param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public DataTable GetDataTableByProcedure(string storedProcedure, string connectionName = "default", bool closeConnection = true,
                                          params KeyValuePair<string, object>[] parameters)
        {
            return GetResult(storedProcedure, CommandType.StoredProcedure, GetDataTable, connectionName, closeConnection, parameters);
        }

        /// <summary>
        /// Return a datatable by text text
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="connectionName">Optional connection name (defaults to "default")</param>
        /// <param name="closeConnection">Optional closeConnection bool parameter (defaults to true)</param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public DataTable GetDataTableBySql(string sql, string connectionName = "default", bool closeConnection = true,
                                          params KeyValuePair<string, object>[] parameters)
        {
            return GetResult(sql, CommandType.Text, GetDataTable, connectionName, closeConnection, parameters);
        }

        /// <summary>
        /// Return a datatable by stored procedure
        /// </summary>
        /// <param name="storedProcedure">The name of the stored procedure</param>
        /// <param name="connectionName">Optional connection name (defaults to "default")</param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public TReader GetReaderByProcedure(string storedProcedure, string connectionName = "default",
                                          params KeyValuePair<string, object>[] parameters)
        {
            return GetResult(storedProcedure, CommandType.StoredProcedure, ExecuteReader, connectionName, false, parameters);
        }

        /// <summary>
        /// Return a datatable by stored procedure
        /// </summary>
        /// <param name="storedProcedure">The name of the stored procedure</param>
        /// <param name="connectionName">Optional connection name (defaults to "default")</param>
        /// <param name="closeConnection">Optional closeConnection bool parameter (defaults to true)</param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public object GetScalarByProcedure(string storedProcedure, string connectionName = "default", bool closeConnection = true,
                                          params KeyValuePair<string, object>[] parameters)
        {
            return GetResult(storedProcedure, CommandType.StoredProcedure, GetScalar, connectionName, closeConnection, parameters);
        }

        /// <summary>
        /// Return a datatable by text text
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="connectionName">Optional connection name (defaults to "default")</param>
        /// <param name="closeConnection">Optional closeConnection bool parameter (defaults to true)</param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public object GetScalarBySql(string sql, string connectionName = "default", bool closeConnection = true,
                                          params KeyValuePair<string, object>[] parameters)
        {
            return GetResult(sql, CommandType.Text, GetScalar, connectionName, closeConnection, parameters);
        }

        /// <summary>
        /// Return a datatable by stored procedure
        /// </summary>
        /// <param name="storedProcedure">The name of the stored procedure</param>
        /// <param name="connectionName">Optional connection name (defaults to "default")</param>
        /// <param name="closeConnection"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public XDocument GetXDocumentByProcedure(string storedProcedure, string connectionName = "default", bool closeConnection = true,
                                          params KeyValuePair<string, object>[] parameters)
        {
            return GetResult(storedProcedure, CommandType.StoredProcedure, CommandToXDocument, connectionName, closeConnection, parameters);
        }

        /// <summary>
        /// Return a datatable by sql text
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="connectionName">Optional connection name (defaults to "default")</param>
        /// <param name="closeConnection"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public XDocument GetXDocumentBySql(string sql, string connectionName, bool closeConnection = true,
                                          params KeyValuePair<string, object>[] parameters)
        {
            return GetResult(sql, CommandType.Text, CommandToXDocument, connectionName, closeConnection, parameters);
        }

        /// <summary>
        /// Return a datatable by sql text
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="commandToXDocument"></param>
        /// <param name="connectionName">Optional connection name (defaults to "default")</param>
        /// <param name="closeConnection"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public XDocument GetXDocumentBySql(string sql, Func<DbCommand, XDocument> commandToXDocument, string connectionName = "default", bool closeConnection = true,
                                          params KeyValuePair<string, object>[] parameters)
        {
            return GetResult(sql, CommandType.Text, commandToXDocument, connectionName, closeConnection, parameters);
        }

        /// <param name="storedProcedure"></param>
        /// <param name="connectionName">Optional connection name (defaults to "default")</param>
        /// <param name="closeConnection"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public XmlDocument GetXmlDocumentByProcedure(string storedProcedure, string connectionName = "default", bool closeConnection = true,
                                          params KeyValuePair<string, object>[] parameters)
        {
            return GetResult(storedProcedure, CommandType.StoredProcedure, CommandToXmlDocument, connectionName, closeConnection, parameters);
        }

        ///   <summary>
        /// 
        ///   </summary>
        ///   <param name="sql"></param>
        ///   <param name="connectionName"></param>
        /// <param name="closeConnection"></param>
        /// <param name="parameters"></param>
        ///  <returns></returns>
        public XmlDocument GetXmlDocumentBySql(string sql, string connectionName = "default", bool closeConnection = true,
                                          params KeyValuePair<string, object>[] parameters)
        {
            return GetResult(sql, CommandType.Text, CommandToXmlDocument, connectionName, closeConnection, parameters);
        }

        /// <summary>
        /// Return a datatable by stored procedure
        /// </summary>
        /// <param name="storedProcedure">The name of the stored procedure</param>
        /// <param name="connectionName">Optional connection name (defaults to "default")</param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public XmlReader GetXmlReaderByProcedure(string storedProcedure, string connectionName = "default",
                                          params KeyValuePair<string, object>[] parameters)
        {
            return GetResult(storedProcedure, CommandType.StoredProcedure, CommandToXmlReader, connectionName, false, parameters);
        }

        /// <summary>
        /// Return a datatable by sql text
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="connectionName">Optional connection name (defaults to "default")</param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public XmlReader GetXmlReaderBySql(string sql, string connectionName = "default", params KeyValuePair<string, object>[] parameters)
        {
            return GetResult(sql, CommandType.Text, CommandToXmlReader, connectionName, false, parameters);
        }

        /// <summary>
        /// Run a stored procedure
        /// </summary>
        /// <param name="procedureName"></param>
        /// <param name="connectionName">Optional connection name (defaults to "default")</param>
        /// <param name="closeConnection">Optional closeConnection bool parameter (defaults to true)</param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public int RunProcedure(string procedureName, string connectionName = "default", bool closeConnection = true,
                                          params KeyValuePair<string, object>[] parameters)
        {
            return GetResult(procedureName, CommandType.StoredProcedure, c => c.ExecuteNonQuery(), connectionName, closeConnection, parameters);
        }

        /// <summary>
        /// Return a datatable by text text
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="connectionName">Optional connection name (defaults to "default")</param>
        /// <param name="closeConnection">Optional closeConnection bool parameter (defaults to true)</param>
        /// <returns></returns>
        public int RunSql(string sql, string connectionName = "default", bool closeConnection = true,
                                          params KeyValuePair<string, object>[] parameters)
        {
            return GetResult(sql, CommandType.Text, c => c.ExecuteNonQuery(), connectionName, closeConnection, parameters);
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        protected abstract XDocument CommandToXDocument(TCommand command);

        /// <summary>
        ///
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        protected abstract XmlDocument CommandToXmlDocument(TCommand command);

        /// <summary>
        ///
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        protected abstract XmlReader CommandToXmlReader(TCommand command);

        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        protected abstract TCommand CreateCommand();

        /// <summary>
        ///
        /// </summary>
        /// <param name="connectionString"></param>
        /// <returns></returns>
        protected abstract TConnection CreateConnection(string connectionString);

        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        protected abstract TAdapter CreateDataAdapter();

        /// <summary>
        ///
        /// </summary>
        /// <param name="name"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        protected abstract TParameter CreateDbParameter(string name, object value);

        /// <summary>
        ///
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        protected abstract TReader ExecuteReader(TCommand command);

        protected TConnection GetConnection(bool readonlyOperation = false)
        {
            return GetConnection("default", readonlyOperation);
        }

        protected TConnection GetConnection(string connectionName, bool readonlyOperation = false)
        {
            var connectionString = ConfigurationManager.ConnectionStrings[connectionName].ConnectionString;

            connectionString = readonlyOperation
                                   ? string.Format("{0};ApplicationIntent=ReadOnly;", connectionString)
                                   : connectionString;

            var connection = CreateConnection(connectionString);

            return connection;
        }

        ///  <summary>
        ///
        ///  </summary>
        ///  <typeparam name="TResult"></typeparam>
        ///  <param name="text"></param>
        ///  <param name="commandType"></param>
        ///  <param name="getResult"></param>
        ///  <param name="connectionName"></param>
        ///  <param name="closeConnection"></param>
        ///  <param name="parameters"></param>
        ///  <returns></returns>
        protected TResult GetResult<TResult>(string text, CommandType commandType, Func<TCommand, TResult> getResult, string connectionName = "default", bool closeConnection = true, params KeyValuePair<string, object>[] parameters)
        {
            const string commandTimeout = "180";

            var readonlyOperation = ConfigManager.IsReadOnlyStoredProcedure(text);

            var connection = GetConnection(connectionName, readonlyOperation);

            var result = default(TResult);

            var command = CreateCommand();

            if (command != null)
            {
                command.Connection = connection;
                command.CommandText = text;
                command.CommandType = commandType;
                command.CommandTimeout =
                    int.Parse(ConfigurationManager.AppSettings["CommandTimeOut"] ?? commandTimeout);

                command.Parameters.AddRange(GetParameters(parameters));

                var reTry = ExecuteWithRetry(getResult, connection, command, closeConnection, out result);

                //if(reTry)
                //{
                //    ExecuteWithRetry(getResult, connection, command, closeConnection, out result);
                //}

                if (closeConnection)
                {
                    if (connection != null && connection.State == ConnectionState.Open)
                    {
                        connection.Close();
                    }
                }

                return result;
            }
            return result;
        }

        private bool ExecuteWithRetry<TResult>(Func<TCommand, TResult> getResult, DbConnection connection, TCommand command, bool closeConnection, out TResult result)
        {
            try
            {
                if (connection != null)
                {
                    connection.Open();
                }

                command.Connection = connection;

                result = getResult(command);
            }
            //catch (SqlException sex)
            //{
            //    int[] errorsToRetry =
            //    {
            //        -2,    //Timeout 
            //    };
            //    if (sex.Errors.Cast<SqlError>().Any(x => errorsToRetry.Contains(x.Number))) //connection time out
            //    {
            //        result = default(TResult);
            //        return true;
            //    }
            //    throw;
            //}
            finally
            {
                if (closeConnection)
                {
                    if (connection != null && connection.State == ConnectionState.Open)
                    {
                        connection.Close();
                    }
                }
            }
            return false;
        }


        private DataSet GetDataSet(TCommand command)
        {
            var result = new DataSet();

            using (var dataAdapter = CreateDataAdapter())
            {
                if (dataAdapter != null)
                {
                    dataAdapter.SelectCommand = command;
                    dataAdapter.Fill(result);
                }
            }

            return result;
        }

        private DataTable GetDataTable(TCommand command)
        {
            var result = new DataTable();

            using (var dataAdapter = CreateDataAdapter())
            {
                if (dataAdapter != null)
                {
                    dataAdapter.SelectCommand = command;
                    dataAdapter.Fill(result);
                }
            }

            return result;
        }

        private Array GetParameters(IEnumerable<KeyValuePair<string, object>> parameters)
        {
            ArrayList result = new ArrayList();

            foreach (var param in parameters)
            {
                result.Add(CreateDbParameter(param.Key, param.Value));
            }
           
            return result.ToArray();
        }

        private object GetScalar(TCommand command)
        {
            var result = command.ExecuteScalar();

            return result;
        }
    }
}
