using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using QRMService.Models;
using QRMService.DataBase;

namespace QRMService.Repositories
{
    public class MetricsAssociationRepository
    {
        public static List<MetricsModel> GetMetricsAssociationList()
        {
            using (var db = new QRMEntities())
            {
                var metricsDetails = (from m in db.MetricMasters
                                      where m.IsActive == true
                                      select new MetricsModel
                                      {
                                          MetricsMasterId = m.MetricMasterID,
                                          CategoryCode = m.MetricCategoryCode,
                                          CategoryDescription = m.MetricCategoryDescription,
                                          SubCategoryCode = m.MetricSubCategoryCode,
                                          SubCategoryDescription = m.MetricSubCategoryDescription,
                                          TypeCode = m.MetricTypeCode,
                                          MetricDescription = m.MetricsDescription,
                                      }).ToList();
                return metricsDetails;
            }
        }

        public static List<ProjectReleaseModel> GetProjectReleaseList(int projectId)
        {
            using (var db = new QRMEntities())
            {
                var releaseDetails = (from m in db.ProjectReleaseMasters
                                      where m.ProjectID == projectId
                                      select new ProjectReleaseModel
                                      {
                                          ProjectReleaseId = m.ProjectReleaseId,
                                          ReleaseName = m.ReleaseName,
                                      }).ToList()
                                      ;
                return releaseDetails;
            }
        }

        public static ProjectReleasesResponseModel SaveMetricsAssociation(ProjectMetricsAssociationModel modelData)
        {
            var response = new ProjectReleasesResponseModel();
            using (var db = new QRMEntities())
            {
                var metricsMasterIdList = modelData.MetricsMasterIdList;
                int projectId = modelData.ProjectId;
                var releaseId = modelData.ReleaseId;
                int monthid = modelData.MonthId;

                var deleteItems = db.ProjectMetricAssociations.Where(x => x.ProjectId == projectId && x.ReleaseId == releaseId && x.MonthId == monthid);
                db.ProjectMetricAssociations.RemoveRange(deleteItems);
                db.SaveChanges();
                foreach (int id in metricsMasterIdList)
                {
                    var metricsAssociation = db.ProjectMetricAssociations.Where(a => a.MetricMasterID == id && a.ProjectId == projectId && a.ReleaseId == releaseId && a.MonthId == monthid).FirstOrDefault();
                    if (metricsAssociation == null)
                    {
                        var projectMetricsAssociationData = new ProjectMetricAssociation
                        {
                            ProjectId = projectId,
                            ReleaseId = releaseId,
                            MetricMasterID = id,
                            MonthId = monthid
                        };
                        db.ProjectMetricAssociations.Add(projectMetricsAssociationData);
                        db.SaveChanges();
                        response.IsSuccess = true;
                        response.ResponseMessage = "Project Metrics Association added successfully";
                    }
                    else
                    {
                        response.ResponseMessage = "Release Metrics Association already exists.";
                    }
                }

                return response;
            }
        }

        public static List<int> GetSavedMetricsAssociation(int projectId, int releaseId, int month)
        {
            using (var db = new QRMEntities())
            {
                var releaseDetails = (from m in db.ProjectMetricAssociations
                                      where m.ProjectId == projectId && m.ReleaseId == releaseId && m.MonthId == month
                                      orderby m.ProjectId
                                      select m.MetricMasterID).ToList();
                return releaseDetails;
            }
        }
    }
}