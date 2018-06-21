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
                chartDataModel.colors = new List<string> { "#FFA500", "#1E90FF" };
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
                plannedCount.borderColor = "#1E90FF";
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
                chartDataModel.colors = new List<string> { "#FFA500", "#1E90FF" };
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
                e2ePercentangeCount.borderColor = "#1E90FF";
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
                chartDataModel.colors = new List<string> { "#FFA500", "#F7464A","#1E90FF", "#32CD32", "#FFFF00", "#FA8072", "#FFFFFF", "#0000FF", "#FF0000",
                "#800000","#808000","#008000","#FF00FF","#800080"};
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
                chartDataModel.colors = new List<string> { "#F7464A", "#FFA500" };
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
                plannedCount.borderColor = "#F7464A";
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    plannedCount.data.Add(row.Field<int>(ProjectWidgetDashboardColumns.PlannedCount.ToString()));
                });
                chartDataModel.datasets.Add(plannedCount);
                // set completed count
                var completedCount = new ChartDataset { fill = false };
                completedCount.data = new List<int>();
                completedCount.label = "Completed Cumulative";
                completedCount.borderColor = "#FFA500";
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    completedCount.data.Add(row.Field<int>(ProjectWidgetDashboardColumns.CompletedCount.ToString()));
                });
                chartDataModel.datasets.Add(completedCount);
            }
            return chartDataModel;
        }

        public static ChartDataModel GetSITDefectSeverity(int projectId, int releaseId)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("ProjectId", projectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", releaseId));
            var chartData = helper.GetDataTableByProcedure(Constants.UspGetSITDefectSeverityDistribution, "default", true, parameters.ToArray());
            var chartDataModel = new ChartDataModel();
            if (chartData != null && chartData.Rows.Count > 0)
            {
                chartDataModel.labels = new List<string>();
                // set dataset for line chart
                chartDataModel.datasets = new List<ChartDataset>();
                // set defect Severity data
                chartDataModel.values = new List<int>();
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    // set labels
                    chartDataModel.labels.Add(string.Format("{0} ({1}%)", row.Field<string>(DefectDistributionColumns.DefectSeverity.ToString()), row.Field<int>(DefectDistributionColumns.CountPercentage.ToString())));
                    // set data
                    chartDataModel.values.Add(row.Field<int>(DefectDistributionColumns.DefectCount.ToString()));
                });
            }
            return chartDataModel;
        }

        public static ChartDataModel GetDefectTypeDistribution(int projectId, int releaseId)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("ProjectId", projectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", releaseId));
            var chartData = helper.GetDataTableByProcedure(Constants.UspGetDefectTypeDistribution, "default", true, parameters.ToArray());
            var chartDataModel = new ChartDataModel();
            if (chartData != null && chartData.Rows.Count > 0)
            {
                chartDataModel.labels = new List<string>();
                // set dataset for line chart
                chartDataModel.datasets = new List<ChartDataset>();
                // set defect Severity data
                chartDataModel.values = new List<int>();
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    // set labels
                    chartDataModel.labels.Add(row.Field<string>(DefectDistributionColumns.DefectType.ToString()));
                    // set data
                    chartDataModel.values.Add(row.Field<int>(DefectDistributionColumns.CountPercentage.ToString()));
                });
            }
            return chartDataModel;
        }

        public static ChartDataModel GetSitExecutionGrapgh(int projectId, int releaseId)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("ProjectId", projectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", releaseId));
            var chartData = helper.GetDataTableByProcedure(Constants.UspGetSITExecutionGraph, "default", true, parameters.ToArray());
            var chartDataModel = new ChartDataModel();
            if (chartData != null && chartData.Rows.Count > 0)
            {
                //set series for chart data
                chartDataModel.series = new List<string> { "Planned Test Cases", "Actual Test Cases","Test Execution %","Pass %" };
                chartDataModel.colors = new List<string> { "#000000", "#92D050", "#EF8C49", "#6D91D1" };
                chartDataModel.labels = new List<string>();
                // set labels for line chart
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    chartDataModel.labels.Add(row.Field<string>(SITExecutionGraphColumns.Track.ToString()));
                });
                // set dataset for line chart
                chartDataModel.datasets = new List<ChartDataset>();
                // set plannedTestCases count
                var plannedTestCases = new ChartDataset { fill = false };
                plannedTestCases.data = new List<int>();
                plannedTestCases.label = "Planned Test Cases";
                plannedTestCases.borderColor = "#000000";
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    plannedTestCases.data.Add(row.Field<int>(SITExecutionGraphColumns.PlannedTestCases.ToString()));
                });
                chartDataModel.datasets.Add(plannedTestCases);
                // set ActualTestcases count
                var actualTestcases = new ChartDataset { fill = false };
                actualTestcases.data = new List<int>();
                actualTestcases.label = "Actual Test Cases";
                actualTestcases.borderColor = "#92D050";
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    actualTestcases.data.Add(row.Field<int>(SITExecutionGraphColumns.ActualTestcases.ToString()));
                });
                chartDataModel.datasets.Add(actualTestcases);
                // set TestExecutionPerccentage count
                var testExecutionPerccentage = new ChartDataset { fill = false };
                testExecutionPerccentage.data = new List<int>();
                testExecutionPerccentage.label = "Test Execution %";
                testExecutionPerccentage.borderColor = "#EF8C49";
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    testExecutionPerccentage.data.Add(row.Field<int>(SITExecutionGraphColumns.TestExecutionPerccentage.ToString()));
                });
                chartDataModel.datasets.Add(testExecutionPerccentage);
                // set passPerccentage count
                var passPerccentage = new ChartDataset { fill = false };
                passPerccentage.data = new List<int>();
                passPerccentage.label = "Pass %";
                passPerccentage.borderColor = "#6D91D1";
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    passPerccentage.data.Add(row.Field<int>(SITExecutionGraphColumns.PassPerccentage.ToString()));
                });
                chartDataModel.datasets.Add(passPerccentage);
            }
            return chartDataModel;
        }

        public static ChartDataModel GetSitDefectGraph(int projectId, int releaseId)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("ProjectId", projectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", releaseId));
            var chartData = helper.GetDataTableByProcedure(Constants.UspGetSITDefectGraph, "default", true, parameters.ToArray());
            var chartDataModel = new ChartDataModel();
            if (chartData != null && chartData.Rows.Count > 0)
            {
                //set series for chart data
                chartDataModel.series = new List<string> { "Total Closed", "New", "Cancelled/Inavlid", "Open" };
                chartDataModel.colors = new List<string> { "#5B9BD5", "#ED7D31", "#A5A5A5", "#FFC000" };
                chartDataModel.labels = new List<string>();
                // set labels for line chart
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    chartDataModel.labels.Add(row.Field<string>(SITDefectGraphColumns.Weekend.ToString()));
                });
                // set dataset for line chart
                chartDataModel.datasets = new List<ChartDataset>();
                // set TotalClosedDefectCount count
                var totalClosedDefectCount = new ChartDataset { fill = false };
                totalClosedDefectCount.data = new List<int>();
                totalClosedDefectCount.label = "Total Closed";
                totalClosedDefectCount.borderColor = "#5B9BD5";
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    totalClosedDefectCount.data.Add(row.Field<int>(SITDefectGraphColumns.TotalClosedDefectCount.ToString()));
                });
                chartDataModel.datasets.Add(totalClosedDefectCount);
                // set NewDefectCount count
                var newDefectCount = new ChartDataset { fill = false };
                newDefectCount.data = new List<int>();
                newDefectCount.label = "New";
                newDefectCount.borderColor = "#ED7D31";
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    newDefectCount.data.Add(row.Field<int>(SITDefectGraphColumns.NewDefectCount.ToString()));
                });
                chartDataModel.datasets.Add(newDefectCount);
                // set CalcelledDefectCount count
                var calcelledDefectCount = new ChartDataset { fill = false };
                calcelledDefectCount.data = new List<int>();
                calcelledDefectCount.label = "Cancelled/Inavlid";
                calcelledDefectCount.borderColor = "#A5A5A5";
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    calcelledDefectCount.data.Add(row.Field<int>(SITDefectGraphColumns.CalcelledDefectCount.ToString()));
                });
                chartDataModel.datasets.Add(calcelledDefectCount);
                // set openDefectCount count
                var openDefectCount = new ChartDataset { fill = false };
                openDefectCount.data = new List<int>();
                openDefectCount.label = "Open";
                openDefectCount.borderColor = "#FFC000";
                chartData.AsEnumerable().ToList().ForEach(row =>
                {
                    openDefectCount.data.Add(row.Field<int>(SITDefectGraphColumns.OpenDefectCount.ToString()));
                });
                chartDataModel.datasets.Add(openDefectCount);
            }
            return chartDataModel;
        }
    }
}