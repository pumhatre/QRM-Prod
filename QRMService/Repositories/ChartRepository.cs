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

        public static List<EffortDistribution> GetEffortDistribution(int projectId, int releaseId)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("projectId", projectId));
            parameters.Add(new KeyValuePair<string, object>("projectReleaseId", releaseId));
            DataTable dtEffortDistributionList = helper.GetDataTableByProcedure(Constants.UspGetEffortDistribution, "default", true, parameters.ToArray());
            List<EffortDistribution> effortDistributionList = new List<EffortDistribution>();
            if (dtEffortDistributionList != null && dtEffortDistributionList.Rows.Count > 0)
            {
                dtEffortDistributionList.AsEnumerable().ToList().ForEach(row =>
                {
                    effortDistributionList.Add(new EffortDistribution
                    {
                        EffortType = row.Field<string>(Constants.ProjectEffortDistributionColumnName.EffortType.ToString()),
                        ActualEffortPercentage = row.Field<string>(Constants.ProjectEffortDistributionColumnName.ActualEffortPercentage.ToString()),
                        PlannedEffortPercentage = row.Field<string>(Constants.ProjectEffortDistributionColumnName.PlannedEffortPercentage.ToString()),

                    });
                });
            }
            return effortDistributionList;
        }

        public static List<TestCaseDistribution> GetTestCaseDistribution(int projectId, int releaseId)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("ProjectId", projectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", releaseId));
            DataTable dtTestCaseDistributionList = helper.GetDataTableByProcedure(Constants.UspGetTestCaseEffortDistribution, "default", true, parameters.ToArray());
            List<TestCaseDistribution> testCaseDistributionList = new List<TestCaseDistribution>();
            if (dtTestCaseDistributionList != null && dtTestCaseDistributionList.Rows.Count > 0)
            {
                dtTestCaseDistributionList.AsEnumerable().ToList().ForEach(row =>
                {
                    testCaseDistributionList.Add(new TestCaseDistribution
                    {
                    });
                });
            }
            return testCaseDistributionList;
        }
        public static List<TestCaseComplexityDistribution> GetTestCaseComplexityDistribution(int projectId, int releaseId)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("ProjectId", projectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", releaseId));
            DataTable dtTestCaseComplexityDistribution = helper.GetDataTableByProcedure(Constants.UspGetTestCaseComplexityDistribution, "default", true, parameters.ToArray());
            List<TestCaseComplexityDistribution> testCaseComplexityDistributionList = new List<TestCaseComplexityDistribution>();
            if (dtTestCaseComplexityDistribution != null && dtTestCaseComplexityDistribution.Rows.Count > 0)
            {
                dtTestCaseComplexityDistribution.AsEnumerable().ToList().ForEach(row =>
                {
                    testCaseComplexityDistributionList.Add(new TestCaseComplexityDistribution
                    {


                    });
                });
            }
            return testCaseComplexityDistributionList;
        }
        public static List<DefectDetectedPhaseDistribution> GetDefectDetectedPhaseDistribution(int projectId, int releaseId)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("ProjectId", projectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", releaseId));
            DataTable dtDefectDetectedPhaseDistribution = helper.GetDataTableByProcedure(Constants.UspGetDefectDetectedPhaseDistribution, "default", true, parameters.ToArray());
            List<DefectDetectedPhaseDistribution> defectDetectedPhaseDistributionList = new List<DefectDetectedPhaseDistribution>();
            if (dtDefectDetectedPhaseDistribution != null && dtDefectDetectedPhaseDistribution.Rows.Count > 0)
            {
                dtDefectDetectedPhaseDistribution.AsEnumerable().ToList().ForEach(row =>
                {
                    defectDetectedPhaseDistributionList.Add(new DefectDetectedPhaseDistribution
                    {


                    });
                });
            }
            return defectDetectedPhaseDistributionList;
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
    }
}