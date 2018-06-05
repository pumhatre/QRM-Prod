using QRMFrameworkHelpers;
using QRMService.Common;
using QRMService.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace QRMService.Repositories
{
    public class ChartRepository
    {

        public static List<EffortDistribution> GetEffortDistribution(int projectId,int releaseId)
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
    }
}