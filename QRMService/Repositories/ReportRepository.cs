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
                        CompletedHours = row.Field<int?>(Constants.ProjectWidgetColumnName.CompleteHours.ToString()),
                        WipHours = row.Field<int?>(Constants.ProjectWidgetColumnName.WipHours.ToString()),
                        NotStartedHours = row.Field<int?>(Constants.ProjectWidgetColumnName.NotStartedHours.ToString()),
                        TotalHours = row.Field<int?>(Constants.ProjectWidgetColumnName.TotalHours.ToString())
                    });
                });
            }
            return projectWidgetList;
        }

        /// <summary>
        /// Gets the project variance.
        /// </summary>
        /// <param name="runId">The run identifier.</param>
        /// <param name="ProjectId">The project identifier.</param>
        /// <param name="ReleaseId">The release identifier.</param>
        /// <param name="MonthId">The month identifier.</param>
        /// <param name="executionStep">The execution step.</param>
        /// <param name="createdby">The createdby.</param>
        /// <returns></returns>
        public static ProjectVarianceList GetProjectVariance(Guid runId, int ProjectId, int ReleaseId, int MonthId, int executionStep = 0, int createdby = 1)
        {

            ProjectVarianceList projectVariances = new ProjectVarianceList();
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("RunId", runId));
            parameters.Add(new KeyValuePair<string, object>("ExecutionStep", executionStep));
            parameters.Add(new KeyValuePair<string, object>("CreatedBy", createdby));
            parameters.Add(new KeyValuePair<string, object>("ProjectId", ProjectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", ReleaseId));
            parameters.Add(new KeyValuePair<string, object>("MonthId", MonthId));
            DataTable dtWidget = helper.GetDataTableByProcedure(Constants.UspGetProjectPerformanceDashboard, "default", true, parameters.ToArray());
            List<ProjectVariance> projectVariance = new List<ProjectVariance>();
            if (dtWidget != null && dtWidget.Rows.Count > 0)
            {
                dtWidget.AsEnumerable().ToList().ForEach(row =>
                {
                    projectVariance.Add(new ProjectVariance
                    {
                        DashboardType = row.Field<string>(Constants.ProjectVarianceColumnName.DashBoardType.ToString()),
                        EffortVariance = row.Field<int?>(Constants.ProjectVarianceColumnName.EffortVariance.ToString()) == null ? "NR" : string.Format("{0}%", Convert.ToString(row.Field<int?>(Constants.ProjectVarianceColumnName.EffortVariance.ToString()))),
                        Rework = row.Field<int?>(Constants.ProjectVarianceColumnName.Rework.ToString()) == null ? "NR" : string.Format("{0}%", Convert.ToString(row.Field<int?>(Constants.ProjectVarianceColumnName.Rework.ToString()))),
                        UnitTestEffectiveness = row.Field<int?>(Constants.ProjectVarianceColumnName.UnitTestEffectiveness.ToString()) == null ? "NR" : string.Format("{0}%", Convert.ToString(row.Field<int?>(Constants.ProjectVarianceColumnName.UnitTestEffectiveness.ToString()))),
                        SystemTestEffectiveness = row.Field<int?>(Constants.ProjectVarianceColumnName.SystemTestEffectiveness.ToString()) == null ? "NR" : string.Format("{0}%", Convert.ToString(row.Field<int?>(Constants.ProjectVarianceColumnName.SystemTestEffectiveness.ToString()))),
                        SITDefectDetectionRate = row.Field<decimal?>(Constants.ProjectVarianceColumnName.SITDefectDetectionRate.ToString()) == null ? "NR" : string.Format("{0}%", Convert.ToString(row.Field<decimal?>(Constants.ProjectVarianceColumnName.SITDefectDetectionRate.ToString()))),
                        ComponentDefectRejectionRate = row.Field<int?>(Constants.ProjectVarianceColumnName.ComponentDefectRejectionRate.ToString()) == null ? "NR" : string.Format("{0}%", Convert.ToString(row.Field<int?>(Constants.ProjectVarianceColumnName.ComponentDefectRejectionRate.ToString()))),
                        E2EDefectRejectionRate = row.Field<int?>(Constants.ProjectVarianceColumnName.E2EDefectRejectionRate.ToString()) == null ? "NR" : string.Format("{0}%", Convert.ToString(row.Field<int?>(Constants.ProjectVarianceColumnName.E2EDefectRejectionRate.ToString()))),
                    });
                });
            }



            projectVariances.projectVariances= projectVariance;           
            DataTable dtDefects = helper.GetDataTableByProcedure(Constants.UspGetProjectDefectDashboard, "default", true, parameters.ToArray());
            List<ProjectVarianceLst> projectVarianceslst = new List<ProjectVarianceLst>();
            List<ProjectVarianceLst> projectVarianceslsttwo = new List<ProjectVarianceLst>();
            decimal SitClosureRate = 0;
            decimal SitClosureRateOverall = 0;
            if (dtDefects != null && dtDefects.Rows.Count > 0)
            {
                dtDefects.AsEnumerable().ToList().ForEach(row =>
                {
                   if( row.Field<string>(Constants.ProjectDefectColumnName.DashBoardType.ToString())== "Functional Design")
                    {
                        projectVarianceslst.Add(new ProjectVarianceLst
                        {
                            Type = "Functional Design Defect Closure Rate (%)",
                            ProjectPerformance = row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString())==0?"NA": Convert.ToString(Math.Round((Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Closed.ToString())) / 
                            Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()))) * 100, 2)) + " %"
                        });
                    }

                    if (row.Field<string>(Constants.ProjectDefectColumnName.DashBoardType.ToString()) == "Technical Design")
                    {
                        projectVarianceslst.Add(new ProjectVarianceLst
                        {
                            Type = "Technical Design Defect Closure Rate (%)",
                            ProjectPerformance = row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()) == 0 ? "NA" : Convert.ToString(Math.Round((Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Closed.ToString())) /
                            Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()))) * 100, 2)) + " %"
                        });
                    }
                    if (row.Field<string>(Constants.ProjectDefectColumnName.DashBoardType.ToString()) == "Code Review")
                    {
                        projectVarianceslst.Add(new ProjectVarianceLst
                        {
                            Type = "Coding Defect Closure Rate (%)",
                            ProjectPerformance=row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()) == 0 ? "NA" : Convert.ToString(Math.Round((Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Closed.ToString())) /
                            Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()))) * 100, 2)) + " %"
                        });
                    }
                    if (row.Field<string>(Constants.ProjectDefectColumnName.DashBoardType.ToString()) == "Unit Test")
                    {
                        projectVarianceslst.Add(new ProjectVarianceLst
                        {
                            Type = "Unit Test Defect Closure Rate (%))",
                            ProjectPerformance = row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()) == 0 ? "NA" : Convert.ToString(Math.Round((Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Closed.ToString())) /
                            Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()))) * 100, 2)) + " %"
                        });
                    }
                    if (row.Field<string>(Constants.ProjectDefectColumnName.DashBoardType.ToString()) == "UAT")
                    {
                        projectVarianceslst.Add(new ProjectVarianceLst
                        {
                            Type = "UAT Defect Closure Rate (%)",
                            ProjectPerformance = row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()) == 0 ? "NA" : Convert.ToString(Math.Round((Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Closed.ToString())) /
                            Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()))) * 100, 2)) + " %"
                        });
                    }
                    if (row.Field<string>(Constants.ProjectDefectColumnName.DashBoardType.ToString()) == "Integ/Pre-SIT")
                    {
                        SitClosureRate += Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Closed.ToString()));
                        SitClosureRateOverall += Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()));
                    }

                    if (row.Field<string>(Constants.ProjectDefectColumnName.DashBoardType.ToString()) == "SIT E2E")
                    {
                        SitClosureRate += Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Closed.ToString()));
                        SitClosureRateOverall += Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()));
                    }
                });

                projectVarianceslst.Add(new ProjectVarianceLst
                {
                    Type = "SIT Defect Closure Rate (%)",
                    ProjectPerformance = SitClosureRateOverall==0? "NA": Convert.ToString(Math.Round(SitClosureRate / SitClosureRateOverall * 100, 2)) + " %"
                });
            }
            

            decimal FDDEffort = 0;
            decimal TDDEffort = 0;
            decimal CodingEffort = 0;
            decimal UTEffort = 0;
            decimal TotalActualProjectEffort = 0;
            decimal SITEffort = 0;
            
            DataTable dtEffort = helper.GetDataTableByProcedure(Constants.UspGetProjectEffortDashboard, "default", true, parameters.ToArray());
            if (dtEffort != null && dtEffort.Rows.Count > 0)
            {
                dtEffort.AsEnumerable().ToList().ForEach(row =>
                {
                   if( row.Field<string>(Constants.ProjectEffortColumnName.DashBoardType.ToString())== "Total Project Effort (in hrs.)" && row.Field<string>(Constants.ProjectEffortColumnName.DashboardSubtype.ToString())==
                    "TotalActual")
                    {
                        TotalActualProjectEffort = Convert.ToDecimal(row.Field<int>(Constants.ProjectEffortColumnName.Total.ToString()));
                    }

                    if (row.Field<string>(Constants.ProjectEffortColumnName.DashBoardType.ToString()) == "Testing Effort (in hrs.)" && row.Field<string>(Constants.ProjectEffortColumnName.DashboardSubtype.ToString()) ==
                     "TotalActual")
                    {
                        SITEffort = Convert.ToDecimal(row.Field<int>(Constants.ProjectEffortColumnName.Total.ToString()));
                    }

                });
            }

            parameters.Remove(new KeyValuePair<string, object>("RunId", runId));
            parameters.Remove(new KeyValuePair<string, object>("CreatedBy", createdby));
            DataTable projectPerformance = helper.GetDataTableByProcedure(Constants.uspGenerateProjectPerformance, "default", true, parameters.ToArray());
            if (projectPerformance != null && projectPerformance.Rows.Count > 0)
            {
                projectPerformance.AsEnumerable().ToList().ForEach(row =>
                {
                    FDDEffort = row.Field<decimal>(Constants.ProjectPerformance.FDDEffort.ToString());
                    TDDEffort = row.Field<decimal>(Constants.ProjectPerformance.TDDEffort.ToString());
                    CodingEffort = row.Field<decimal>(Constants.ProjectPerformance.CodingEffort.ToString());
                    UTEffort = row.Field<decimal>(Constants.ProjectPerformance.UTEffort.ToString());
                });
            }
            projectVarianceslsttwo.Add(new ProjectVarianceLst
            {
                Type = "FDD Effort (%)",
                ProjectPerformance = TotalActualProjectEffort==0? "NA": Convert.ToString(Math.Round(FDDEffort/TotalActualProjectEffort *100,2)) + "%"
        });


            projectVarianceslsttwo.Add(new ProjectVarianceLst
            {
                Type = "TDD Effort (%)",
                ProjectPerformance = TotalActualProjectEffort == 0 ? "NA" : Convert.ToString(Math.Round(TDDEffort / TotalActualProjectEffort * 100, 2)) + "%"
        });
            projectVarianceslsttwo.Add(new ProjectVarianceLst
            {
                Type = "Coding Effort (%)",
                ProjectPerformance = TotalActualProjectEffort == 0 ? "NA" : Convert.ToString(Math.Round(CodingEffort / TotalActualProjectEffort * 100, 2)) + "%"
        });
            projectVarianceslsttwo.Add(new ProjectVarianceLst
            {
                Type = "UT Effort (%)",
                ProjectPerformance = TotalActualProjectEffort == 0 ? "NA" : Convert.ToString(Math.Round(UTEffort / TotalActualProjectEffort * 100, 2)) + "%"
        });

            projectVarianceslsttwo.Add(new ProjectVarianceLst
            {
                Type = "SIT Effort (%)",
                ProjectPerformance = TotalActualProjectEffort == 0 ? "NA" : Convert.ToString(Math.Round(SITEffort / TotalActualProjectEffort * 100, 2)) + "%"
            });
                


            projectVariances.projectVariancesTwo = projectVarianceslst;
            projectVariances.projectVariancesThree = projectVarianceslsttwo;
            return projectVariances;

        }
        /// <summary>
        /// Get Project Effort detail
        /// </summary>
        /// <param name="ProjectId">The project identifier.</param>
        /// <returns></returns>
        public static List<ProjectEffort> GetProjectEffort(int ProjectId, int ReleaseId, int MonthId)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("ProjectId", ProjectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", ReleaseId));
            parameters.Add(new KeyValuePair<string, object>("MonthId", MonthId));
            DataTable dtEffort = helper.GetDataTableByProcedure(Constants.UspGetProjectEffortDashboardByProject, "default", true, parameters.ToArray());
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
                        TotalHours = row.Field<int>(Constants.ProjectEffortColumnName.Total.ToString()),
                        ReleaseId = row.Field<int>(Constants.ProjectEffortColumnName.ReleaseId.ToString()),
                        MonthId = row.Field<int>(Constants.ProjectEffortColumnName.MonthId.ToString())
                    });
                });
            }
            return projectEffortList;
        }

        /// <summary>
        /// Get Project Testing detail Effort
        /// </summary>
        /// <param name="ProjectId">The project identifier.</param>
        /// <returns></returns>
        public static List<ProjectTesting> GetProjectTesting(int ProjectId, int ReleaseId, int MonthId)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("ProjectId", ProjectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", ReleaseId));
            parameters.Add(new KeyValuePair<string, object>("MonthId", MonthId));
            DataTable dtTesting = helper.GetDataTableByProcedure(Constants.UspGetProjectTestingDashboardByProject, "default", true, parameters.ToArray());
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
        /// <param name="ProjectId">The project identifier.</param>
        /// <returns></returns>
        public static List<ProjectDefects> GetProjectDefects(int ProjectId, int ReleaseId, int MonthId)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("ProjectId", ProjectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", ReleaseId));
            parameters.Add(new KeyValuePair<string, object>("MonthId", MonthId));
            DataTable dtDefects = helper.GetDataTableByProcedure(Constants.UspGetProjectDefectDashboardByProject, "default", true, parameters.ToArray());
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
        /// <param name="ProjectId">The project identifier.</param>
        /// <returns></returns>
        public static List<ProjectWidget> GetProjectWidget(int ProjectId, int ReleaseId, int MonthId)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("ProjectId", ProjectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", ReleaseId));
            parameters.Add(new KeyValuePair<string, object>("MonthId", MonthId));
            DataTable dtWidget = helper.GetDataTableByProcedure(Constants.UspGetProjectWidgetDashboardByProject, "default", true, parameters.ToArray());
            List<ProjectWidget> projectWidgetList = new List<ProjectWidget>();
            if (dtWidget != null && dtWidget.Rows.Count > 0)
            {
                dtWidget.AsEnumerable().ToList().ForEach(row =>
                {
                    projectWidgetList.Add(new ProjectWidget
                    {
                        DashBoardType = row.Field<string>(Constants.ProjectWidgetColumnName.DashBoardType.ToString()),
                        DashboardSubtype = row.Field<string>(Constants.ProjectWidgetColumnName.DashboardSubtype.ToString()),
                        CompletedHours = row.Field<int?>(Constants.ProjectWidgetColumnName.CompleteHours.ToString()),
                        WipHours = row.Field<int?>(Constants.ProjectWidgetColumnName.WipHours.ToString()),
                        NotStartedHours = row.Field<int?>(Constants.ProjectWidgetColumnName.NotStartedHours.ToString()),
                        TotalHours = row.Field<int?>(Constants.ProjectWidgetColumnName.TotalHours.ToString())
                    });
                });
            }
            return projectWidgetList;
        }

        /// <summary>
        /// Gets the project variance.
        /// </summary>
        /// <param name="ProjectId">The project identifier.</param>
        /// <returns></returns>
        public static ProjectVarianceList GetProjectVariance(int ProjectId, int ReleaseId, int MonthId)
        {
            ProjectVarianceList projectVariances = new ProjectVarianceList();
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("ProjectId", ProjectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", ReleaseId));
            parameters.Add(new KeyValuePair<string, object>("MonthId", MonthId));
            DataTable dtWidget = helper.GetDataTableByProcedure(Constants.UspGetProjectVarianceDashboardByProject, "default", true, parameters.ToArray());
            List<ProjectVariance> projectVariance = new List<ProjectVariance>();
            if (dtWidget != null && dtWidget.Rows.Count > 0)
            {
                dtWidget.AsEnumerable().ToList().ForEach(row =>
                {
                    projectVariance.Add(new ProjectVariance
                    {
                        DashboardType = row.Field<string>(Constants.ProjectVarianceColumnName.DashBoardType.ToString()),
                        EffortVariance = row.Field<int?>(Constants.ProjectVarianceColumnName.EffortVariance.ToString()) == null ? "NR" : string.Format("{0}%", Convert.ToString(row.Field<int?>(Constants.ProjectVarianceColumnName.EffortVariance.ToString()))),
                        Rework = row.Field<int?>(Constants.ProjectVarianceColumnName.Rework.ToString()) == null ? "NR" : string.Format("{0}%", Convert.ToString(row.Field<int?>(Constants.ProjectVarianceColumnName.Rework.ToString()))),
                        UnitTestEffectiveness = row.Field<int?>(Constants.ProjectVarianceColumnName.UnitTestEffectiveness.ToString()) == null ? "NR" : string.Format("{0}%", Convert.ToString(row.Field<int?>(Constants.ProjectVarianceColumnName.UnitTestEffectiveness.ToString()))),
                        SystemTestEffectiveness = row.Field<int?>(Constants.ProjectVarianceColumnName.SystemTestEffectiveness.ToString()) == null ? "NR" : string.Format("{0}%", Convert.ToString(row.Field<int?>(Constants.ProjectVarianceColumnName.SystemTestEffectiveness.ToString()))),
                        SITDefectDetectionRate = row.Field<decimal?>(Constants.ProjectVarianceColumnName.SITDefectDetectionRate.ToString()) == null ? "NR" : string.Format("{0}%", Convert.ToString(row.Field<decimal?>(Constants.ProjectVarianceColumnName.SITDefectDetectionRate.ToString()))),
                        ComponentDefectRejectionRate = row.Field<int?>(Constants.ProjectVarianceColumnName.ComponentDefectRejectionRate.ToString()) == null ? "NR" : string.Format("{0}%", Convert.ToString(row.Field<int?>(Constants.ProjectVarianceColumnName.ComponentDefectRejectionRate.ToString()))),
                        E2EDefectRejectionRate = row.Field<int?>(Constants.ProjectVarianceColumnName.E2EDefectRejectionRate.ToString()) == null ? "NR" : string.Format("{0}%", Convert.ToString(row.Field<int?>(Constants.ProjectVarianceColumnName.E2EDefectRejectionRate.ToString())))
                    });
                });
            }

            DataTable dtDefects = helper.GetDataTableByProcedure(Constants.UspGetProjectDefectDashboardByProject, "default", true, parameters.ToArray());
            projectVariances.projectVariances = projectVariance;
       
            List<ProjectVarianceLst> projectVarianceslst = new List<ProjectVarianceLst>();
            List<ProjectVarianceLst> projectVarianceslsttwo = new List<ProjectVarianceLst>();
            decimal SitClosureRate = 0;
            decimal SitClosureRateOverall = 0;
            if (dtDefects != null && dtDefects.Rows.Count > 0)
            {
                dtDefects.AsEnumerable().ToList().ForEach(row =>
                {
                    if (row.Field<string>(Constants.ProjectDefectColumnName.DashBoardType.ToString()) == "Functional Design")
                    {
                        projectVarianceslst.Add(new ProjectVarianceLst
                        {
                            Type = "Functional Design Defect Closure Rate (%)",
                            ProjectPerformance = row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()) == 0 ? "NA" : Convert.ToString(Math.Round((Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Closed.ToString())) /
                            Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()))) * 100, 2)) + " %"
                        });
                    }

                    if (row.Field<string>(Constants.ProjectDefectColumnName.DashBoardType.ToString()) == "Technical Design")
                    {
                        projectVarianceslst.Add(new ProjectVarianceLst
                        {
                            Type = "Technical Design Defect Closure Rate (%)",
                            ProjectPerformance = row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()) == 0 ? "NA" : Convert.ToString(Math.Round((Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Closed.ToString())) /
                            Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()))) * 100, 2)) + " %"
                        });
                    }
                    if (row.Field<string>(Constants.ProjectDefectColumnName.DashBoardType.ToString()) == "Code Review")
                    {
                        projectVarianceslst.Add(new ProjectVarianceLst
                        {
                            Type = "Coding Defect Closure Rate (%)",
                            ProjectPerformance = row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()) == 0 ? "NA" : Convert.ToString(Math.Round((Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Closed.ToString())) /
                            Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()))) * 100, 2)) + " %"
                        });
                    }
                    if (row.Field<string>(Constants.ProjectDefectColumnName.DashBoardType.ToString()) == "Unit Test")
                    {
                        projectVarianceslst.Add(new ProjectVarianceLst
                        {
                            Type = "Unit Test Defect Closure Rate (%))",
                            ProjectPerformance = row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()) == 0 ? "NA" : Convert.ToString(Math.Round((Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Closed.ToString())) /
                            Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()))) * 100, 2)) + " %"
                        });
                    }
                    if (row.Field<string>(Constants.ProjectDefectColumnName.DashBoardType.ToString()) == "UAT")
                    {
                        projectVarianceslst.Add(new ProjectVarianceLst
                        {
                            Type = "UAT Defect Closure Rate (%)",
                            ProjectPerformance = row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()) == 0 ? "NA" : Convert.ToString(Math.Round((Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Closed.ToString())) /
                            Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()))) * 100, 2)) + " %"
                        });
                    }
                    if (row.Field<string>(Constants.ProjectDefectColumnName.DashBoardType.ToString()) == "Integ/Pre-SIT")
                    {
                        SitClosureRate += Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Closed.ToString()));
                        SitClosureRateOverall += Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()));
                    }

                    if (row.Field<string>(Constants.ProjectDefectColumnName.DashBoardType.ToString()) == "SIT E2E")
                    {
                        SitClosureRate += Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Closed.ToString()));
                        SitClosureRateOverall += Convert.ToDecimal(row.Field<int>(Constants.ProjectDefectColumnName.Overall.ToString()));
                    }
                });

                projectVarianceslst.Add(new ProjectVarianceLst
                {
                    Type = "SIT Defect Closure Rate (%)",
                    ProjectPerformance = SitClosureRateOverall == 0 ? "NA" : Convert.ToString(Math.Round(SitClosureRate / SitClosureRateOverall * 100, 2)) + " %"
                });
            }


            decimal FDDEffort = 0;
            decimal TDDEffort = 0;
            decimal CodingEffort = 0;
            decimal UTEffort = 0;
            decimal TotalActualProjectEffort = 0;
            decimal SITEffort = 0;
            
            DataTable dtEffort = helper.GetDataTableByProcedure(Constants.UspGetProjectEffortDashboardByProject, "default", true, parameters.ToArray());
            if (dtEffort != null && dtEffort.Rows.Count > 0)
            {
                dtEffort.AsEnumerable().ToList().ForEach(row =>
                {
                    if (row.Field<string>(Constants.ProjectEffortColumnName.DashBoardType.ToString()) == "Total Project Effort (in hrs.)" && row.Field<string>(Constants.ProjectEffortColumnName.DashboardSubtype.ToString()) ==
                     "Total Actual")
                    {
                        TotalActualProjectEffort = Convert.ToDecimal(row.Field<int>(Constants.ProjectEffortColumnName.Total.ToString()));
                    }

                    if (row.Field<string>(Constants.ProjectEffortColumnName.DashBoardType.ToString()) == "Testing Effort (in hrs.)" && row.Field<string>(Constants.ProjectEffortColumnName.DashboardSubtype.ToString()) ==
                     "Total Actual")
                    {
                        SITEffort = Convert.ToDecimal(row.Field<int>(Constants.ProjectEffortColumnName.Total.ToString()));
                    }

                });
            }
            parameters.Add(new KeyValuePair<string, object>("ExecutionStep", 1));
            DataTable projectPerformance = helper.GetDataTableByProcedure(Constants.uspGenerateProjectPerformance, "default", true, parameters.ToArray());
            if (projectPerformance != null && projectPerformance.Rows.Count > 0)
            {
                projectPerformance.AsEnumerable().ToList().ForEach(row =>
                {
                    FDDEffort = row.Field<decimal>(Constants.ProjectPerformance.FDDEffort.ToString());
                    TDDEffort = row.Field<decimal>(Constants.ProjectPerformance.TDDEffort.ToString());
                    CodingEffort = row.Field<decimal>(Constants.ProjectPerformance.CodingEffort.ToString());
                    UTEffort = row.Field<decimal>(Constants.ProjectPerformance.UTEffort.ToString());
                });


                projectVarianceslsttwo.Add(new ProjectVarianceLst
                {
                    Type = "FDD Effort (%)",
                    ProjectPerformance = TotalActualProjectEffort == 0 ? "NA" : Convert.ToString(Math.Round(FDDEffort / TotalActualProjectEffort * 100, 2)) + "%"
                });


                projectVarianceslsttwo.Add(new ProjectVarianceLst
                {
                    Type = "TDD Effort (%)",
                    ProjectPerformance = TotalActualProjectEffort == 0 ? "NA" : Convert.ToString(Math.Round(TDDEffort / TotalActualProjectEffort * 100, 2)) + "%"
                });
                projectVarianceslsttwo.Add(new ProjectVarianceLst
                {
                    Type = "Coding Effort (%)",
                    ProjectPerformance = TotalActualProjectEffort == 0 ? "NA" : Convert.ToString(Math.Round(CodingEffort / TotalActualProjectEffort * 100, 2)) + "%"
                });
                projectVarianceslsttwo.Add(new ProjectVarianceLst
                {
                    Type = "UT Effort (%)",
                    ProjectPerformance = TotalActualProjectEffort == 0 ? "NA" : Convert.ToString(Math.Round(UTEffort / TotalActualProjectEffort * 100, 2)) + "%"
                });

                projectVarianceslsttwo.Add(new ProjectVarianceLst
                {
                    Type = "SIT Effort (%)",
                    ProjectPerformance = TotalActualProjectEffort == 0 ? "NA" : Convert.ToString(Math.Round(SITEffort / TotalActualProjectEffort * 100, 2)) + "%"
                });
            }




            projectVariances.projectVariancesTwo = projectVarianceslst;
            projectVariances.projectVariancesThree = projectVarianceslsttwo;
            return projectVariances;

            
        }


        #endregion

        #region Productivity/Defect Density

        public static List<Productivity> GetProductivityGroundUp()
        {
            List<Productivity> ProductivitytListGroundUp = new List<Productivity>();
            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "UI Components",
                SubType = "Overall",
                LSL = 25,
                USL = 35,
                ProjectPerformance = 5

            });
            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "UI Components",
                SubType = "Functional Design",
                LSL = 5,
                USL = 5,
                ProjectPerformance = 5

            });


            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "UI Components",
                SubType = "Technical Design",
                LSL = 25,
                USL = 23,
                ProjectPerformance = 50

            });

            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "UI Components",
                SubType = "Coding",
                LSL = 25,
                USL = 23,
                ProjectPerformance = 50

            });
            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "UI Components",
                SubType = "Unit Testing",
                LSL = 5,
                USL = 5,
                ProjectPerformance = 5

            });

            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Rulesets",
                SubType = "Overall",
                LSL = 35,
                USL = 45,
                ProjectPerformance = 5

            });

            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Rulesets",
                SubType = "Functional Design",
                LSL = 5,
                USL = 5,
                ProjectPerformance = 5

            });


            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Rulesets",
                SubType = "Technical Design",
                LSL = 25,
                USL = 23,
                ProjectPerformance = 50

            });

            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Rulesets",
                SubType = "Coding",
                LSL = 25,
                USL = 23,
                ProjectPerformance = 50

            });
            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Rulesets",
                SubType = "Unit Testing",
                LSL = 5,
                USL = 5,
                ProjectPerformance = 5

            });


            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Batch Jobs & Interfaces",
                SubType = "Overall",
                LSL = 5,
                USL = 5,
                ProjectPerformance = 5

            });

            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Batch Jobs & Interfaces",
                SubType = "Functional Design",
                LSL = 5,
                USL = 5,
                ProjectPerformance = 5

            });


            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Batch Jobs & Interfaces",
                SubType = "Technical Design",
                LSL = 25,
                USL = 23,
                ProjectPerformance = 50

            });
            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Batch Jobs & Interfaces",
                SubType = "Coding",
                LSL = 5,
                USL = 5,
                ProjectPerformance = 5

            });


            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Batch Jobs & Interfaces",
                SubType = "Unit Testing",
                LSL = 25,
                USL = 23,
                ProjectPerformance = 50

            });
            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Subsystems",
                SubType = "Overall",
                LSL = 25,
                USL = 25,
                ProjectPerformance = 25

            });
            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Subsystems",
                SubType = "Functional Design",
                LSL = 25,
                USL = 25,
                ProjectPerformance = 25

            });


            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Subsystems",
                SubType = "Technical Design",
                LSL = 252,
                USL = 223,
                ProjectPerformance = 502

            });

            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Subsystems",
                SubType = "Coding",
                LSL = 252,
                USL = 232,
                ProjectPerformance = 50

            });
            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Subsystems",
                SubType = "Unit Testing",
                LSL = 52,
                USL = 52,
                ProjectPerformance = 52

            });


            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Data Conversion",
                SubType = "Overall",
                LSL = 51,
                USL = 15,
                ProjectPerformance = 15

            });

            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Data Conversion",
                SubType = "Functional Design",
                LSL = 51,
                USL = 15,
                ProjectPerformance = 15

            });


            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Data Conversion",
                SubType = "Technical Design",
                LSL = 215,
                USL = 23,
                ProjectPerformance = 50

            });

            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Data Conversion",
                SubType = "Coding",
                LSL = 25,
                USL = 23,
                ProjectPerformance = 50

            });
            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Data Conversion",
                SubType = "Unit Testing",
                LSL = 5,
                USL = 5,
                ProjectPerformance = 5

            });

            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Reports",
                SubType = "Overall",
                LSL = 5,
                USL = 5,
                ProjectPerformance = 5

            });

            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Reports",
                SubType = "Functional Design",
                LSL = 5,
                USL = 5,
                ProjectPerformance = 5

            });


            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Reports",
                SubType = "Technical Design",
                LSL = 25,
                USL = 23,
                ProjectPerformance = 50

            });

            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Reports",
                SubType = "Coding",
                LSL = 25,
                USL = 23,
                ProjectPerformance = 50

            });
            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Reports",
                SubType = "Unit Testing",
                LSL = 52,
                USL = 53,
                ProjectPerformance = 51

            });

            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Forms",
                SubType = "Overall",
                LSL = 51,
                USL = 51,
                ProjectPerformance = 51

            });


            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Forms",
                SubType = "Functional Design",
                LSL = 51,
                USL = 51,
                ProjectPerformance = 51

            });


            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Forms",
                SubType = "Technical Design",
                LSL = 255,
                USL = 235,
                ProjectPerformance = 506

            });


            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Forms",
                SubType = "Coding",
                LSL = 425,
                USL = 234,
                ProjectPerformance = 504

            });
            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Forms",
                SubType = "Unit Testing",
                LSL = 15,
                USL = 15,
                ProjectPerformance = 35

            });

            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Usecase/CR/Enhancement",
                SubType = "Overall",
                LSL = 25,
                USL = 25,
                ProjectPerformance = 25

            });

            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Usecase/CR/Enhancement",
                SubType = "Functional Design",
                LSL = 25,
                USL = 25,
                ProjectPerformance = 25

            });


            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Usecase/CR/Enhancement",
                SubType = "Technical Design",
                LSL = 252,
                USL = 223,
                ProjectPerformance = 502

            });

            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Usecase/CR/Enhancement",
                SubType = "Coding",
                LSL = 252,
                USL = 232,
                ProjectPerformance = 50

            });
            ProductivitytListGroundUp.Add(new Productivity
            {
                Type = "Usecase/CR/Enhancement",
                SubType = "Unit Testing",
                LSL = 52,
                USL = 52,
                ProjectPerformance = 52

            });


            return ProductivitytListGroundUp;
        }

        public static List<Productivity> GetProductivityEnhanced()
        {
            List<Productivity> ProductivitytListEnhanced = new List<Productivity>();
            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "UI Components",
                SubType = "Overall",
                LSL = 235,
                USL = 335,
                ProjectPerformance = 5

            });
            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "UI Components",
                SubType = "Functional Design",
                LSL = 5,
                USL = 5,
                ProjectPerformance = 5

            });


            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "UI Components",
                SubType = "Technical Design",
                LSL = 25,
                USL = 23,
                ProjectPerformance = 50

            });

            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "UI Components",
                SubType = "Coding",
                LSL = 25,
                USL = 23,
                ProjectPerformance = 50

            });
            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "UI Components",
                SubType = "Unit Testing",
                LSL = 5,
                USL = 5,
                ProjectPerformance = 5

            });

            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Rulesets",
                SubType = "Overall",
                LSL = 35,
                USL = 45,
                ProjectPerformance = 5

            });

            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Rulesets",
                SubType = "Functional Design",
                LSL = 5,
                USL = 5,
                ProjectPerformance = 5

            });


            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Rulesets",
                SubType = "Technical Design",
                LSL = 25,
                USL = 23,
                ProjectPerformance = 50

            });

            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Rulesets",
                SubType = "Coding",
                LSL = 25,
                USL = 23,
                ProjectPerformance = 50

            });
            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Rulesets",
                SubType = "Unit Testing",
                LSL = 5,
                USL = 5,
                ProjectPerformance = 5

            });


            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Batch Jobs & Interfaces",
                SubType = "Overall",
                LSL = 5,
                USL = 5,
                ProjectPerformance = 5

            });

            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Batch Jobs & Interfaces",
                SubType = "Functional Design",
                LSL = 5,
                USL = 5,
                ProjectPerformance = 5

            });


            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Batch Jobs & Interfaces",
                SubType = "Technical Design",
                LSL = 25,
                USL = 23,
                ProjectPerformance = 50

            });
            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Batch Jobs & Interfaces",
                SubType = "Coding",
                LSL = 5,
                USL = 5,
                ProjectPerformance = 5

            });


            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Batch Jobs & Interfaces",
                SubType = "Unit Testing",
                LSL = 25,
                USL = 23,
                ProjectPerformance = 50

            });
            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Subsystems",
                SubType = "Overall",
                LSL = 25,
                USL = 25,
                ProjectPerformance = 25

            });
            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Subsystems",
                SubType = "Functional Design",
                LSL = 25,
                USL = 25,
                ProjectPerformance = 25

            });


            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Subsystems",
                SubType = "Technical Design",
                LSL = 252,
                USL = 223,
                ProjectPerformance = 502

            });

            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Subsystems",
                SubType = "Coding",
                LSL = 252,
                USL = 232,
                ProjectPerformance = 50

            });
            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Subsystems",
                SubType = "Unit Testing",
                LSL = 52,
                USL = 52,
                ProjectPerformance = 52

            });


            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Data Conversion",
                SubType = "Overall",
                LSL = 51,
                USL = 15,
                ProjectPerformance = 15

            });

            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Data Conversion",
                SubType = "Functional Design",
                LSL = 51,
                USL = 15,
                ProjectPerformance = 15

            });


            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Data Conversion",
                SubType = "Technical Design",
                LSL = 215,
                USL = 23,
                ProjectPerformance = 50

            });

            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Data Conversion",
                SubType = "Coding",
                LSL = 25,
                USL = 23,
                ProjectPerformance = 50

            });
            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Data Conversion",
                SubType = "Unit Testing",
                LSL = 5,
                USL = 5,
                ProjectPerformance = 5

            });

            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Reports",
                SubType = "Overall",
                LSL = 5,
                USL = 5,
                ProjectPerformance = 5

            });

            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Reports",
                SubType = "Functional Design",
                LSL = 5,
                USL = 5,
                ProjectPerformance = 5

            });


            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Reports",
                SubType = "Technical Design",
                LSL = 25,
                USL = 23,
                ProjectPerformance = 50

            });

            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Reports",
                SubType = "Coding",
                LSL = 25,
                USL = 23,
                ProjectPerformance = 50

            });
            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Reports",
                SubType = "Unit Testing",
                LSL = 52,
                USL = 53,
                ProjectPerformance = 51

            });

            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Forms",
                SubType = "Overall",
                LSL = 51,
                USL = 51,
                ProjectPerformance = 51

            });


            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Forms",
                SubType = "Functional Design",
                LSL = 51,
                USL = 51,
                ProjectPerformance = 51

            });


            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Forms",
                SubType = "Technical Design",
                LSL = 255,
                USL = 235,
                ProjectPerformance = 506

            });


            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Forms",
                SubType = "Coding",
                LSL = 425,
                USL = 234,
                ProjectPerformance = 504

            });
            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Forms",
                SubType = "Unit Testing",
                LSL = 15,
                USL = 15,
                ProjectPerformance = 35

            });

            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Usecase/CR/Enhancement",
                SubType = "Overall",
                LSL = 25,
                USL = 25,
                ProjectPerformance = 25

            });

            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Usecase/CR/Enhancement",
                SubType = "Functional Design",
                LSL = 25,
                USL = 25,
                ProjectPerformance = 25

            });


            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Usecase/CR/Enhancement",
                SubType = "Technical Design",
                LSL = 252,
                USL = 223,
                ProjectPerformance = 502

            });

            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Usecase/CR/Enhancement",
                SubType = "Coding",
                LSL = 252,
                USL = 232,
                ProjectPerformance = 50

            });
            ProductivitytListEnhanced.Add(new Productivity
            {
                Type = "Usecase/CR/Enhancement",
                SubType = "Unit Testing",
                LSL = 52,
                USL = 52,
                ProjectPerformance = 52

            });


            return ProductivitytListEnhanced;
        }

        /// <summary>
        /// Gets the productivity ground up.
        /// </summary>
        /// <param name="runId">The run identifier.</param>
        /// <param name="ProjectId">The project identifier.</param>
        /// <param name="ReleaseId">The release identifier.</param>
        /// <param name="MonthId">The month identifier.</param>
        /// <param name="executionStep">The execution step.</param>
        /// <param name="createdby">The createdby.</param>
        /// <returns></returns>
        public static List<Productivity> GetProductivityGroundUp(Guid runId, int ProjectId, int ReleaseId, int MonthId, int executionStep = 0, int createdby = 1)
        {
            var ProductivitytListGroundUp = new List<Productivity>();
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("RunId", runId));
            parameters.Add(new KeyValuePair<string, object>("ExecutionStep", executionStep));
            parameters.Add(new KeyValuePair<string, object>("CreatedBy", createdby));
            parameters.Add(new KeyValuePair<string, object>("ProjectId", ProjectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", ReleaseId));
            parameters.Add(new KeyValuePair<string, object>("MonthId", MonthId));
            DataTable data = helper.GetDataTableByProcedure(Constants.UspGenerateProductivityGroundUp, "default", true, parameters.ToArray());
            if (data != null && data.Rows.Count > 0)
            {
                data.AsEnumerable().ToList().ForEach(row =>
                {
                    ProductivitytListGroundUp.Add(new Productivity
                    {
                        Type = row.Field<string>(Constants.GroupUpEnhancedColumns.Type.ToString()),
                        SubType = row.Field<string>(Constants.GroupUpEnhancedColumns.SubType.ToString()),
                        ProjectPerformance = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.ProjectPerformance.ToString()),
                        USL = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.USL.ToString()),
                        LSL = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.LSL.ToString())
                    });
                });
            }
            return ProductivitytListGroundUp;
        }

        /// <summary>
        /// Gets the productivity enhanced.
        /// </summary>
        /// <param name="runId">The run identifier.</param>
        /// <param name="ProjectId">The project identifier.</param>
        /// <param name="ReleaseId">The release identifier.</param>
        /// <param name="MonthId">The month identifier.</param>
        /// <param name="executionStep">The execution step.</param>
        /// <param name="createdby">The createdby.</param>
        /// <returns></returns>
        public static List<Productivity> GetProductivityEnhanced(Guid runId, int ProjectId, int ReleaseId, int MonthId, int executionStep = 0, int createdby = 1)
        {
            var ProductivitytListEnhanced = new List<Productivity>();
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("RunId", runId));
            parameters.Add(new KeyValuePair<string, object>("ExecutionStep", executionStep));
            parameters.Add(new KeyValuePair<string, object>("CreatedBy", createdby));
            parameters.Add(new KeyValuePair<string, object>("ProjectId", ProjectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", ReleaseId));
            parameters.Add(new KeyValuePair<string, object>("MonthId", MonthId));
            DataTable data = helper.GetDataTableByProcedure(Constants.UspGenerateProductivityEnhanced, "default", true, parameters.ToArray());
            if (data != null && data.Rows.Count > 0)
            {
                data.AsEnumerable().ToList().ForEach(row =>
                {
                    ProductivitytListEnhanced.Add(new Productivity
                    {
                        Type = row.Field<string>(Constants.GroupUpEnhancedColumns.Type.ToString()),
                        SubType = row.Field<string>(Constants.GroupUpEnhancedColumns.SubType.ToString()),
                        ProjectPerformance = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.ProjectPerformance.ToString()),
                        USL = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.USL.ToString()),
                        LSL = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.LSL.ToString())
                    });
                });
            }
            return ProductivitytListEnhanced;
        }

        /// <summary>
        /// Gets the defect density ground up.
        /// </summary>
        /// <param name="runId">The run identifier.</param>
        /// <param name="ProjectId">The project identifier.</param>
        /// <param name="ReleaseId">The release identifier.</param>
        /// <param name="MonthId">The month identifier.</param>
        /// <param name="executionStep">The execution step.</param>
        /// <param name="createdby">The createdby.</param>
        /// <returns></returns>
        public static List<Productivity> GetDefectDensityGroundUp(Guid runId, int ProjectId, int ReleaseId, int MonthId, int executionStep = 0, int createdby = 1)
        {
            var ProductivitytListGroundUp = new List<Productivity>();
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("RunId", runId));
            parameters.Add(new KeyValuePair<string, object>("ExecutionStep", executionStep));
            parameters.Add(new KeyValuePair<string, object>("CreatedBy", createdby));
            parameters.Add(new KeyValuePair<string, object>("ProjectId", ProjectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", ReleaseId));
            parameters.Add(new KeyValuePair<string, object>("MonthId", MonthId));
            DataTable data = helper.GetDataTableByProcedure(Constants.UspGenerateDefectDensityGroundUp, "default", true, parameters.ToArray());
            if (data != null && data.Rows.Count > 0)
            {
                data.AsEnumerable().ToList().ForEach(row =>
                {
                    ProductivitytListGroundUp.Add(new Productivity
                    {
                        Type = row.Field<string>(Constants.GroupUpEnhancedColumns.Type.ToString()),
                        SubType = row.Field<string>(Constants.GroupUpEnhancedColumns.SubType.ToString()),
                        ProjectPerformance = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.ProjectPerformance.ToString()),
                        USL = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.USL.ToString()),
                        LSL = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.LSL.ToString())
                    });
                });
            }
            return ProductivitytListGroundUp;
        }

        /// <summary>
        /// Gets the defect density enhanced.
        /// </summary>
        /// <param name="runId">The run identifier.</param>
        /// <param name="ProjectId">The project identifier.</param>
        /// <param name="ReleaseId">The release identifier.</param>
        /// <param name="MonthId">The month identifier.</param>
        /// <param name="executionStep">The execution step.</param>
        /// <param name="createdby">The createdby.</param>
        /// <returns></returns>
        public static List<Productivity> GetDefectDensityEnhanced(Guid runId, int ProjectId, int ReleaseId, int MonthId, int executionStep = 0, int createdby = 1)
        {
            var ProductivitytListEnhanced = new List<Productivity>();
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("RunId", runId));
            parameters.Add(new KeyValuePair<string, object>("ExecutionStep", executionStep));
            parameters.Add(new KeyValuePair<string, object>("CreatedBy", createdby));
            parameters.Add(new KeyValuePair<string, object>("ProjectId", ProjectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", ReleaseId));
            parameters.Add(new KeyValuePair<string, object>("MonthId", MonthId));
            DataTable data = helper.GetDataTableByProcedure(Constants.UspGenerateDefectDensityEnhanced, "default", true, parameters.ToArray());
            if (data != null && data.Rows.Count > 0)
            {
                data.AsEnumerable().ToList().ForEach(row =>
                {
                    ProductivitytListEnhanced.Add(new Productivity
                    {
                        Type = row.Field<string>(Constants.GroupUpEnhancedColumns.Type.ToString()),
                        SubType = row.Field<string>(Constants.GroupUpEnhancedColumns.SubType.ToString()),
                        ProjectPerformance = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.ProjectPerformance.ToString()),
                        USL = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.USL.ToString()),
                        LSL = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.LSL.ToString())
                    });
                });
            }
            return ProductivitytListEnhanced;
        }

        /// <summary>
        /// Gets the productivity ground up.
        /// </summary>
        /// <param name="ProjectId">The project identifier.</param>
        /// <param name="ReleaseId">The release identifier.</param>
        /// <param name="MonthId">The month identifier.</param>
        /// <returns></returns>
        public static List<Productivity> GetProductivityGroundUp(int ProjectId, int ReleaseId, int MonthId)
        {
            var ProductivitytListGroundUp = new List<Productivity>();
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("ProjectId", ProjectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", ReleaseId));
            parameters.Add(new KeyValuePair<string, object>("MonthId", MonthId));
            DataTable data = helper.GetDataTableByProcedure(Constants.UspGetProductivityGroundUpByProject, "default", true, parameters.ToArray());
            if (data != null && data.Rows.Count > 0)
            {
                data.AsEnumerable().ToList().ForEach(row =>
                {
                    ProductivitytListGroundUp.Add(new Productivity
                    {
                        Type = row.Field<string>(Constants.GroupUpEnhancedColumns.Type.ToString()),
                        SubType = row.Field<string>(Constants.GroupUpEnhancedColumns.SubType.ToString()),
                        ProjectPerformance = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.ProjectPerformance.ToString()),
                        USL = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.USL.ToString()),
                        LSL = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.LSL.ToString())
                    });
                });
            }
            return ProductivitytListGroundUp;
        }

        /// <summary>
        /// Gets the productivity enhanced.
        /// </summary>
        /// <param name="ProjectId">The project identifier.</param>
        /// <param name="ReleaseId">The release identifier.</param>
        /// <param name="MonthId">The month identifier.</param>
        /// <returns></returns>
        public static List<Productivity> GetProductivityEnhanced(int ProjectId, int ReleaseId, int MonthId)
        {
            var ProductivitytListEnhanced = new List<Productivity>();
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("ProjectId", ProjectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", ReleaseId));
            parameters.Add(new KeyValuePair<string, object>("MonthId", MonthId));
            DataTable data = helper.GetDataTableByProcedure(Constants.UspGetProductivityEnhancedByProject, "default", true, parameters.ToArray());
            if (data != null && data.Rows.Count > 0)
            {
                data.AsEnumerable().ToList().ForEach(row =>
                {
                    ProductivitytListEnhanced.Add(new Productivity
                    {
                        Type = row.Field<string>(Constants.GroupUpEnhancedColumns.Type.ToString()),
                        SubType = row.Field<string>(Constants.GroupUpEnhancedColumns.SubType.ToString()),
                        ProjectPerformance = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.ProjectPerformance.ToString()),
                        USL = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.USL.ToString()),
                        LSL = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.LSL.ToString())
                    });
                });
            }
            return ProductivitytListEnhanced;
        }

        /// <summary>
        /// Gets the defect density ground up.
        /// </summary>
        /// <param name="ProjectId">The project identifier.</param>
        /// <param name="ReleaseId">The release identifier.</param>
        /// <param name="MonthId">The month identifier.</param>
        /// <returns></returns>
        public static List<Productivity> GetDefectDensityGroundUp(int ProjectId, int ReleaseId, int MonthId)
        {
            var ProductivitytListGroundUp = new List<Productivity>();
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("ProjectId", ProjectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", ReleaseId));
            parameters.Add(new KeyValuePair<string, object>("MonthId", MonthId));
            DataTable data = helper.GetDataTableByProcedure(Constants.UspGetDefectDensityGroundUpByProject, "default", true, parameters.ToArray());
            if (data != null && data.Rows.Count > 0)
            {
                data.AsEnumerable().ToList().ForEach(row =>
                {
                    ProductivitytListGroundUp.Add(new Productivity
                    {
                        Type = row.Field<string>(Constants.GroupUpEnhancedColumns.Type.ToString()),
                        SubType = row.Field<string>(Constants.GroupUpEnhancedColumns.SubType.ToString()),
                        ProjectPerformance = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.ProjectPerformance.ToString()),
                        USL = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.USL.ToString()),
                        LSL = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.LSL.ToString())
                    });
                });
            }
            return ProductivitytListGroundUp;
        }

        /// <summary>
        /// Gets the defect density enhanced.
        /// </summary>
        /// <param name="ProjectId">The project identifier.</param>
        /// <param name="ReleaseId">The release identifier.</param>
        /// <param name="MonthId">The month identifier.</param>
        /// <returns></returns>
        public static List<Productivity> GetDefectDensityEnhanced(int ProjectId, int ReleaseId, int MonthId)
        {
            var ProductivitytListEnhanced = new List<Productivity>();
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("ProjectId", ProjectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", ReleaseId));
            parameters.Add(new KeyValuePair<string, object>("MonthId", MonthId));
            DataTable data = helper.GetDataTableByProcedure(Constants.UspGetDefectDensityEnhancedByProject, "default", true, parameters.ToArray());
            if (data != null && data.Rows.Count > 0)
            {
                data.AsEnumerable().ToList().ForEach(row =>
                {
                    ProductivitytListEnhanced.Add(new Productivity
                    {
                        Type = row.Field<string>(Constants.GroupUpEnhancedColumns.Type.ToString()),
                        SubType = row.Field<string>(Constants.GroupUpEnhancedColumns.SubType.ToString()),
                        ProjectPerformance = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.ProjectPerformance.ToString()),
                        USL = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.USL.ToString()),
                        LSL = row.Field<decimal?>(Constants.GroupUpEnhancedColumns.LSL.ToString())
                    });
                });
            }
            return ProductivitytListEnhanced;
        }

        #endregion


        public static List<TestingMetrics> GetTestingMetricsData(TestingMetricsRequestModel requestModel)
        {
            var helper = new SqlClientHelper();
            List<TestingMetrics> TestingMetricsList = new List<TestingMetrics>();
         
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();           
            parameters.Add(new KeyValuePair<string, object>("ExecutionStep",requestModel.executionStep));
           // parameters.Add(new KeyValuePair<string, object>("CreatedBy", createdby));
            parameters.Add(new KeyValuePair<string, object>("ProjectId", requestModel.ProjectId));
            parameters.Add(new KeyValuePair<string, object>("ReleaseId", requestModel.ReleaseId));
            parameters.Add(new KeyValuePair<string, object>("MonthId", requestModel.MonthId));
            parameters.Add(new KeyValuePair<string, object>("TestingPhaseCode", requestModel.TestingPhase));
            parameters.Add(new KeyValuePair<string, object>("Iteration", requestModel.Iteration));
            parameters.Add(new KeyValuePair<string, object>("TestingSubPhase", requestModel.TestingSubPhase));
            parameters.Add(new KeyValuePair<string, object>("TestingTypeCode", requestModel.TestingType));
            parameters.Add(new KeyValuePair<string, object>("ManualOrAutomatedExecution", requestModel.ManualOrAutomated));
            DataTable data =  helper.GetDataTableByProcedure(Constants.uspGetSystemTestingMetricDashboard, "default", true, parameters.ToArray());

            if (data != null && data.Rows.Count > 0)
            {
                data.AsEnumerable().ToList().ForEach(row =>
                {
                    TestingMetricsList.Add(new TestingMetrics
                    {
                       DashBoardType  =string.Empty,
                        TestDesignProductivity =Convert.ToString(row.Field<decimal?>(Constants.TestingMetricsColum.TestDesignProductivity.ToString())),
                        TestExecutionDefectDensity = Convert.ToString(row.Field<decimal?>(Constants.TestingMetricsColum.TestExecutionDefectDensity.ToString())),
                        TestExecutionProductivity = Convert.ToString( row.Field<decimal?>(Constants.TestingMetricsColum.TestExecutionProductivity.ToString())),
                    });
                });
            }


            List<string> Type = new List<string>();
            string[] input = { "Project Performance", "Upper Specification Limit (USL)", "Lower Specification Limit (LSL)" };
            Type.AddRange(input);
            for (int i=1; i<=3; i++)
            {
                if(TestingMetricsList.Count< i)
                {
                    TestingMetricsList.Add(new TestingMetrics());
                }

                TestingMetricsList[i-1].DashBoardType = Type[i-1];
                if(i==1)
                {
                    TestingMetricsList[i-1].TestDesignProductivity = string.IsNullOrEmpty(TestingMetricsList[i-1].TestDesignProductivity) ? "NA" : TestingMetricsList[i-1].TestDesignProductivity;
                    TestingMetricsList[i-1].TestExecutionDefectDensity = string.IsNullOrEmpty(TestingMetricsList[i-1].TestExecutionDefectDensity) ? "NA" : TestingMetricsList[i-1].TestExecutionDefectDensity;
                    TestingMetricsList[i-1].TestExecutionProductivity = string.IsNullOrEmpty(TestingMetricsList[i-1].TestExecutionProductivity) ? "NA" : TestingMetricsList[i-1].TestExecutionProductivity;
                }
            }
            return TestingMetricsList;
        }

        

    }

}