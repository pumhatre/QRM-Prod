using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using QRMService.Models;
using System.Data.Entity;
using QRMService.DataBase;

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
                    ProjectID = p.ProjectID.Value,
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
    }
}