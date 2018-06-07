using QRMFrameworkHelpers;
using QRMService.Common;
using QRMService.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using static QRMService.Common.Constants;

namespace QRMService.Repositories
{
    public class ChartRepository
    {

        public static ChartDataModelDecimal GetEffortDistribution(int projectId, int releaseId)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("projectId", projectId));
            parameters.Add(new KeyValuePair<string, object>("projectReleaseId", releaseId));
            var chartData = helper.GetDataTableByProcedure(Constants.UspGetEffortDistribution, "default", true, parameters.ToArray());
            var chartDataModel = new ChartDataModelDecimal();

            if (chartData != null && chartData.Rows.Count > 0)
            {
                //set series for chart data
                chartDataModel.series = new List<string> { "Planned", "Actual" };
                chartDataModel.colors = new List<string> { "#FFA500", "#F7464A" };
                chartDataModel.labels = new List<string>();
                // set labels for line chart
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    chartDataModel.labels.Add(row.Field<string>(ProjectEffortDistributionColumnName.EffortType.ToString()));
                });
                // set dataset for line chart
                chartDataModel.datasets = new List<ChartDatasetDecimal>();
                // set planned count
                var actualCount = new ChartDatasetDecimal { fill = false };
                actualCount.data = new List<decimal>();
                actualCount.label = "Actual";
                actualCount.borderColor = "#FFA500";
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    actualCount.data.Add(row.Field<decimal>(ProjectEffortDistributionColumnName.ActualEffortPercentage.ToString()));
                });
                chartDataModel.datasets.Add(actualCount);
                // set completed count
                var plannedCount = new ChartDatasetDecimal { fill = false };
                plannedCount.data = new List<decimal>();
                plannedCount.label = "Planned";
                plannedCount.borderColor = "#F7464A";
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    plannedCount.data.Add(row.Field<decimal>(ProjectEffortDistributionColumnName.PlannedEffortPercentage.ToString()));
                });
                chartDataModel.datasets.Add(plannedCount);
            }
            return chartDataModel;
        }

        public static ChartDataModelDecimal GetTestCaseDistribution(int projectId, int releaseId)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("projectId", projectId));
            parameters.Add(new KeyValuePair<string, object>("projectReleaseId", releaseId));
            var chartData = helper.GetDataTableByProcedure(Constants.UspGetTestCaseEffortDistribution, "default", true, parameters.ToArray());
            var chartDataModel = new ChartDataModelDecimal();

            if (chartData != null && chartData.Rows.Count > 0)
            {
                //set series for chart data
                chartDataModel.series = new List<string> { "Component", "E2E" };
                chartDataModel.colors = new List<string> { "#FFA500", "#F7464A" };
                chartDataModel.labels = new List<string>();
                // set labels for line chart
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    chartDataModel.labels.Add(row.Field<string>(ProjectTestCaseDistributionColumnName.TestingType.ToString()));
                });
                // set dataset for line chart
                chartDataModel.datasets = new List<ChartDatasetDecimal>();
                // set planned count
                var componentCount = new ChartDatasetDecimal { fill = false };
                componentCount.data = new List<decimal>();
                componentCount.label = "Actual";
                componentCount.borderColor = "#FFA500";
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    componentCount.data.Add(row.Field<decimal>(ProjectTestCaseDistributionColumnName.ComponentPercentage.ToString()));
                });
                chartDataModel.datasets.Add(componentCount);
                // set completed count
                var e2ePercentangeCount = new ChartDatasetDecimal { fill = false };
                e2ePercentangeCount.data = new List<decimal>();
                e2ePercentangeCount.label = "Planned";
                e2ePercentangeCount.borderColor = "#F7464A";
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    e2ePercentangeCount.data.Add(row.Field<decimal>(ProjectTestCaseDistributionColumnName.E2EPercentage.ToString()));
                });
                chartDataModel.datasets.Add(e2ePercentangeCount);
            }
            return chartDataModel;
        }
        public static List<ChartDataModelDecimal> GetTestCaseComplexityDistribution(int projectId, int releaseId)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("projectId", projectId));
            parameters.Add(new KeyValuePair<string, object>("projectReleaseId", releaseId));
            DataSet chartSetData  = helper.GetDataSetByProcedure(Constants.UspGetTestCaseComplexityDistribution, "default", true, parameters.ToArray());
            var chartDataModelList = new List<ChartDataModelDecimal>();
            foreach (DataTable chartData in chartSetData.Tables)
            {
                var chartDataModel = new ChartDataModelDecimal();
                if (chartData != null && chartData.Rows.Count > 0)
                {
                    //set series for chart data
                    chartDataModel.series = new List<string> { "Component","E2E" };
                    chartDataModel.colors = new List<string> { "#FFA500", "#F7464A" };
                    chartDataModel.labels = new List<string>() { "Simple", "Medium", "Complex", "VeryComplex" };
                    
                    chartDataModel.datasets = new List<ChartDatasetDecimal>();
                    // set planned count
                    var componentCount = new ChartDatasetDecimal { fill = false };
                    componentCount.data = new List<decimal>();
                    componentCount.label = "Actual";
                    componentCount.borderColor = "#FFA500";
                    chartData.AsEnumerable().ToList().ForEach(row =>
                    {
                        componentCount.data.Add(row.Field<decimal>(ProjectTestCaseComplexityDistributionColumnName.TestCasePercentage.ToString()));
                    });
                    chartDataModel.datasets.Add(componentCount);
                    chartDataModelList.Add(chartDataModel);
                }
            }
            return chartDataModelList;
        }
        public static ChartDataModelDecimal GetDefectDetectedPhaseDistribution(int projectId, int releaseId)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("projectId", projectId));
            parameters.Add(new KeyValuePair<string, object>("projectReleaseId", releaseId));
            var chartData = helper.GetDataTableByProcedure(Constants.UspGetDefectDetectedPhaseDistribution, "default", true, parameters.ToArray());
            var chartDataModel = new ChartDataModelDecimal();

            if (chartData != null && chartData.Rows.Count > 0)
            {
                //set series for chart data
                chartDataModel.series = new List<string> { "Requirements Review", "Architecture Review","Functional Design Review","Technical Design Review" ,"Unit Test Case Review","Code Review",
                    "Unit Testing","System Test Case Review","SIT Component","SIT E2E","Integration Testing", "Performance Testing","Smoke Testing","Regression Testing" ,
                    "Security Testing","Data Conversion Testing","UAT","Deploy","Post Delivery" };
                chartDataModel.colors = new List<string> { "#FFA500", "#F7464A" };
                chartDataModel.labels = new List<string>();
                // set labels for line chart
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    chartDataModel.labels.Add(row.Field<string>(ProjectDefectDetectionPhaseColumnName.DetectedStage.ToString()));
                });
                // set dataset for line chart
                chartDataModel.datasets = new List<ChartDatasetDecimal>();
                // set planned count
                var componentCount = new ChartDatasetDecimal { fill = false };
                componentCount.data = new List<decimal>();
                componentCount.label = "Actual";
                componentCount.borderColor = "#FFA500";
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    componentCount.data.Add(row.Field<decimal>(ProjectDefectDetectionPhaseColumnName.DefectPhasePercentage.ToString()));
                });
                chartDataModel.datasets.Add(componentCount);
             }
            return chartDataModel;
        }

        public static ChartDataModel GetDevelopementWidgetDashboard(int projectId, int releaseId)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("ProjectId", projectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", releaseId));
            var chartData = helper.GetDataTableByProcedure(Constants.UspGetDevelopementWidgetDashboard, "default", true, parameters.ToArray());
            var chartDataModel = new ChartDataModel();
            if (chartData != null && chartData.Rows.Count > 0)
            {
                //set series for chart data
                chartDataModel.series = new List<string> { "Planned Cumulative", "Completed Cumulative" };
                chartDataModel.colors = new List<string> { "#FFA500", "#F7464A" };
                chartDataModel.labels = new List<string>();
                // set labels for line chart
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    chartDataModel.labels.Add(row.Field<string>(ProjectWidgetDashboardColumns.Weekend.ToString()));
                });
                // set dataset for line chart
                chartDataModel.datasets = new List<ChartDataset>();
                // set planned count
                var plannedCount = new ChartDataset { fill = false };
                plannedCount.data = new List<int>();
                plannedCount.label = "Planned Cumulative";
                plannedCount.borderColor = "#FFA500";
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    plannedCount.data.Add(row.Field<int>(ProjectWidgetDashboardColumns.PlannedCount.ToString()));
                });
                chartDataModel.datasets.Add(plannedCount);
                // set completed count
                var completedCount = new ChartDataset { fill = false };
                completedCount.data = new List<int>();
                completedCount.label = "Completed Cumulative";
                completedCount.borderColor = "#F7464A";
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    completedCount.data.Add(row.Field<int>(ProjectWidgetDashboardColumns.CompletedCount.ToString()));
                });
                chartDataModel.datasets.Add(completedCount);
            }
            return chartDataModel;
        }
    }
}