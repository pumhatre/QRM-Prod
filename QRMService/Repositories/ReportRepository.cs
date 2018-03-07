using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using QRMService.Models;
using System.Data.Entity;
using QRMService.DataBase;
using QRMFrameworkHelpers;
using QRMService.Common;
using System.Data;

namespace QRMService.Repositories
{
    public class ReportRepository
    {
        /// <summary>
        /// Gets the projects list.
        /// </summary>
        /// <returns></returns>
        public static List<ProjectDetailsModel> GetProjectsList()
        {
            using (var db = new QRMEntities())
            {
                return db.ProjectMasters.Select(p => new ProjectDetailsModel
                {
                    ProjectId = p.ProjectID,
                    ProjectName = p.ProjectName
                }).ToList();
            }
        }

        /// <summary>
        /// Gets the months list.
        /// </summary>
        /// <returns></returns>
        public static List<MonthDetailsModel> GetMonthsList()
        {
            using (var db = new QRMEntities())
            {
                return db.MonthMasters.Select(p => new MonthDetailsModel
                {
                    MonthId = p.MonthId,
                    MonthName = p.MonthName,
                    Year = p.Year
                }).ToList();
            }
        }
        /// <summary>
        /// Gets the project release list.
        /// </summary>
        /// <returns></returns>
        public static List<ProjectReleaseModel> GetProjectReleaseList()
        {
            using (var db = new QRMEntities())
            {
                return db.ProjectReleaseMasters.Select(p => new ProjectReleaseModel
                {
                    ProjectReleaseId = p.ProjectReleaseId,
                    ProjectID = p.ProjectID,
                    ReleaseName = p.ReleaseName
                }).ToList();
            }
        }
        /// <summary>
        /// Gets the project matrics list.
        /// </summary>
        /// <returns></returns>
        public static List<ProjectMetricDetailsModel> GetProjectMatricsList(int ProjectReleaseId, int ProjectId, int MonthId)
        {

            using (var db = new QRMEntities())
            {

                return db.ProjectMetricAssociations.Where(m => (m.MetricMasterID == m.MetricMaster.MetricMasterID) && m.ProjectId == ProjectId
                && m.ReleaseId == ProjectReleaseId && m.MonthId == MonthId)
                .Select(p => new ProjectMetricDetailsModel
                {
                    MetricMasterID = p.MetricMasterID,
                    MetricCategoryCode = p.MetricMaster.MetricCategoryCode,
                    MetricCategoryDescription = p.MetricMaster.MetricCategoryDescription
                }).ToList();
            }
        }

        public static List<int> SaveReportPreference(int ProjectId, int MonthId, int ReleaseId, string ReportName, MetricsModel[] MetricsList)
        {
            int _userReportAssociationId = 0;
            List<int> _projectMetricAssociationIds = new List<int>();
            List<int> _preferedReportMetricAssociationId = new List<int>();
            List<string> _reportNames = new List<string>();
            List<UserReportAssociation> _userReportAssociationList = new List<UserReportAssociation>();
            List<int> _removePreferedIds = new List<int>();
            UserReportAssociation _userReportAssociation = new UserReportAssociation
            {
                ProjectReleaseID = ReleaseId,
                ReportName = ReportName,
                MonthID = MonthId
            };

            using (var db = new QRMEntities())
            {

                //Check user report association
                _userReportAssociationList = db.UserReportAssociations.Where(u => u.ProjectReleaseID == ReleaseId && u.MonthID == MonthId).ToList();

                //Get Metric Master Ids
                List<int> _projectMetricMasterIds = db.ProjectMetricAssociations.Where(m => m.ProjectId == ProjectId && m.MonthId == MonthId && m.ReleaseId == ReleaseId)
                                            .Select(m => m.MetricMasterID).ToList();

                //Check Project metric association
                foreach (MetricsModel Metric in MetricsList)
                {
                    if (_projectMetricMasterIds.Contains(Metric.MetricsMasterId))
                    {
                        _projectMetricAssociationIds.Add(db.ProjectMetricAssociations.Where(p => p.ProjectId == ProjectId &&
                         p.MonthId == MonthId && p.ReleaseId == ReleaseId && p.MetricMasterID == Metric.MetricsMasterId).FirstOrDefault().ProjectMetricAssociationID);
                    }

                }
                if (_projectMetricAssociationIds.Count < 0)
                {
                    throw new Exception("Project Metric Association is incorrect.");
                }
                var IsReportAssExists = _userReportAssociationList.Where(u => u.ReportName.ToLower() == ReportName.ToLower()).Select(u => u.UserReportAssociationID).ToList();
                if (IsReportAssExists != null && IsReportAssExists.Count() > 0)
                {
                    throw new Exception("Report Association already exists.");
                }

                //Save User report association
                db.UserReportAssociations.Add(_userReportAssociation);
                db.SaveChanges();
                _userReportAssociationId = _userReportAssociation.UserReportAssociationID;

                foreach (int ProjectMetricAssociationId in _projectMetricAssociationIds)
                {
                    PreferredReportMetricsAssociation _preferredReportMetricsAssociation = new PreferredReportMetricsAssociation
                    {
                        ProjectReleaseID = ProjectId,
                        MonthId = MonthId,
                        UserReportAssociationID = _userReportAssociationId,
                        MetricAssociationID = ProjectMetricAssociationId
                    };
                    //Save Report preference
                    db.PreferredReportMetricsAssociations.Add(_preferredReportMetricsAssociation);
                    db.SaveChanges();
                    _preferedReportMetricAssociationId.Add(_preferredReportMetricsAssociation.PreferredReportMetricsAssociationID);

                }
                return _preferedReportMetricAssociationId;
            }
        }

        #region Health Metrics

        /// <summary>
        /// Get Project Effort detail
        /// </summary>
        /// <param name="runId"></param>
        /// <param name="executionStep"></param>
        /// <param name="createdby"></param>
        /// <returns></returns>
        public static List<ProjectEffort> GetProjectEffort(Guid runId, int ProjectId, int ReleaseId, int MonthId, int executionStep = 0, int createdby = 1)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("RunId", runId));
            parameters.Add(new KeyValuePair<string, object>("ExecutionStep", executionStep));
            parameters.Add(new KeyValuePair<string, object>("CreatedBy", createdby));
            parameters.Add(new KeyValuePair<string, object>("ProjectId", ProjectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", ReleaseId));
            parameters.Add(new KeyValuePair<string, object>("MonthId", MonthId));
            DataTable dtEffort = helper.GetDataTableByProcedure(Constants.UspGetProjectEffortDashboard, "default", true, parameters.ToArray());
            List<ProjectEffort> projectEffortList = new List<ProjectEffort>();
            if (dtEffort != null && dtEffort.Rows.Count > 0)
            {
                dtEffort.AsEnumerable().ToList().ForEach(row =>
                {
                    projectEffortList.Add(new ProjectEffort
                    {
                        DashBoardType = row.Field<string>(Constants.ProjectEffortColumnName.DashBoardType.ToString()),
                        DashboardSubtype = row.Field<string>(Constants.ProjectEffortColumnName.DashboardSubtype.ToString()),
                        CompleteHours = row.Field<int>(Constants.ProjectEffortColumnName.Complete.ToString()),
                        WIPHours = row.Field<int>(Constants.ProjectEffortColumnName.WorkinProgress.ToString()),//Not taking from enum because sp is returning the value in spaces.
                        NotStartedHours = row.Field<int>(Constants.ProjectEffortColumnName.NotStarted.ToString()),//Not taking from enum because sp is returning the value in spaces.
                        TotalHours = row.Field<int>(Constants.ProjectEffortColumnName.Total.ToString())

                    });
                });
            }
            return projectEffortList;
        }

        /// <summary>
        /// Get Project Testing detail Effort
        /// </summary>
        /// <param name="runId"></param>
        /// <param name="executionStep"></param>
        /// <param name="createdby"></param>
        /// <returns></returns>
        public static List<ProjectTesting> GetProjectTesting(Guid runId, int ProjectId, int ReleaseId, int MonthId, int executionStep = 0, int createdby = 1)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("RunId", runId));
            parameters.Add(new KeyValuePair<string, object>("ExecutionStep", executionStep));
            parameters.Add(new KeyValuePair<string, object>("CreatedBy", createdby));
            parameters.Add(new KeyValuePair<string, object>("ProjectId", ProjectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", ReleaseId));
            parameters.Add(new KeyValuePair<string, object>("MonthId", MonthId));
            DataTable dtTesting = helper.GetDataTableByProcedure(Constants.UspGetProjectTestingDashboard, "default", true, parameters.ToArray());
            List<ProjectTesting> projectTestingList = new List<ProjectTesting>();
            if (dtTesting != null && dtTesting.Rows.Count > 0)
            {
                dtTesting.AsEnumerable().ToList().ForEach(row =>
                {
                    projectTestingList.Add(new ProjectTesting
                    {
                        DashBoardType = row.Field<string>(Constants.ProjectTestingColumnName.DashBoardType.ToString()),
                        DashboardSubtype = row.Field<string>(Constants.ProjectTestingColumnName.DashboardSubtype.ToString()),
                        IsManualORAutomatic = row.Field<string>(Constants.ProjectTestingColumnName.DashboardSubtype.ToString()) == "Manual" ?
                                                    true : false,
                        PreSitComponent = row.Field<int?>(Constants.ProjectTestingColumnName.PRESITComponent.ToString()),
                        PreSitE2E = row.Field<int?>(Constants.ProjectTestingColumnName.PRESITE2E.ToString()),
                        SitComponent = row.Field<int?>(Constants.ProjectTestingColumnName.SITComponent.ToString()),
                        SitE2E = row.Field<int?>(Constants.ProjectTestingColumnName.SITE2E.ToString())

                    });
                });
            }
            return projectTestingList;
        }

        /// <summary>
        /// Get Project Defect Count Detail
        /// </summary>
        /// <param name="runId"></param>
        /// <param name="executionStep"></param>
        /// <param name="createdby"></param>
        /// <returns></returns>
        public static List<ProjectDefects> GetProjectDefects(Guid runId, int ProjectId, int ReleaseId, int MonthId, int executionStep = 0, int createdby = 1)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("RunId", runId));
            parameters.Add(new KeyValuePair<string, object>("ExecutionStep", executionStep));
            parameters.Add(new KeyValuePair<string, object>("CreatedBy", createdby));
            parameters.Add(new KeyValuePair<string, object>("ProjectId", ProjectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", ReleaseId));
            parameters.Add(new KeyValuePair<string, object>("MonthId", MonthId));
            DataTable dtDefects = helper.GetDataTableByProcedure(Constants.UspGetProjectDefectDashboard, "default", true, parameters.ToArray());
            List<ProjectDefects> projectDefectsList = new List<ProjectDefects>();
            if (dtDefects != null && dtDefects.Rows.Count > 0)
            {
                dtDefects.AsEnumerable().ToList().ForEach(row =>
                {
                    projectDefectsList.Add(new ProjectDefects
                    {
                        DashBoardType = row.Field<string>(Constants.ProjectDefectColumnName.DashBoardType.ToString()),
                        Overall = row.Field<int?>(Constants.ProjectDefectColumnName.Overall.ToString()),
                        Rejected = row.Field<int?>(Constants.ProjectDefectColumnName.Rejected.ToString()),
                        Closed = row.Field<int?>(Constants.ProjectDefectColumnName.Closed.ToString()),
                        Open = row.Field<int?>(Constants.ProjectDefectColumnName.Open.ToString())
                    });
                });
            }
            return projectDefectsList;
        }

        /// <summary>
        /// Get Project Widget Detail
        /// </summary>
        /// <param name="runId"></param>
        /// <param name="executionStep"></param>
        /// <param name="createdby"></param>
        /// <returns></returns>
        public static List<ProjectWidget> GetProjectWidget(Guid runId, int ProjectId, int ReleaseId, int MonthId, int executionStep = 0, int createdby = 1)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("RunId", runId));
            parameters.Add(new KeyValuePair<string, object>("ExecutionStep", executionStep));
            parameters.Add(new KeyValuePair<string, object>("CreatedBy", createdby));
            parameters.Add(new KeyValuePair<string, object>("ProjectId", ProjectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", ReleaseId));
            parameters.Add(new KeyValuePair<string, object>("MonthId", MonthId));
            DataTable dtWidget = helper.GetDataTableByProcedure(Constants.UspGetProjectWidgetDashboard, "default", true, parameters.ToArray());
            List<ProjectWidget> projectWidgetList = new List<ProjectWidget>();
            if (dtWidget != null && dtWidget.Rows.Count > 0)
            {
                dtWidget.AsEnumerable().ToList().ForEach(row =>
                {
                    projectWidgetList.Add(new ProjectWidget
                    {
                        DashBoardType = row.Field<string>(Constants.ProjectWidgetColumnName.DashBoardType.ToString()),
                        DashboardSubtype = row.Field<string>(Constants.ProjectWidgetColumnName.DashboardSubtype.ToString()),
                        CompletedHours = row.Field<int?>(Constants.ProjectWidgetColumnName.ComleteHours.ToString()),
                        WipHours = row.Field<int?>(Constants.ProjectWidgetColumnName.WipHours.ToString()),
                        NotStartedHours = row.Field<int?>(Constants.ProjectWidgetColumnName.NotStartedHours.ToString()),
                        TotalHours = row.Field<int?>(Constants.ProjectWidgetColumnName.TotalHours.ToString())
                    });
                });
            }
            return projectWidgetList;
        }
        #endregion
    }
    
}