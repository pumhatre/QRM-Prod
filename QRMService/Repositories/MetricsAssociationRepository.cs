﻿using System;
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

                for (int i = 0; i < modelData.MonthId.Count; i++)
                {
                    if (projectId != 0)
                    {
                        if (releaseId != 0)
                        {
                            var deleteItems = db.ProjectMetricAssociations.Where(x => x.ProjectId == projectId && x.ReleaseId == releaseId && x.MonthId == modelData.MonthId[i]);
                            db.ProjectMetricAssociations.RemoveRange(deleteItems);
                            db.SaveChanges();
                            foreach (int id in metricsMasterIdList)
                            {
                                var metricsAssociation = db.ProjectMetricAssociations.Where(a => a.MetricMasterID == id && a.ProjectId == projectId && a.ReleaseId == releaseId && a.MonthId == modelData.MonthId[i]).FirstOrDefault();
                                if (metricsAssociation == null)
                                {
                                    var projectMetricsAssociationData = new ProjectMetricAssociation
                                    {
                                        ProjectId = projectId,
                                        ReleaseId = releaseId,
                                        MetricMasterID = id,
                                        MonthId = i
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
                        }
                        else
                        {
                            response.ResponseMessage = "Please provide valid Project!";
                        }
                    }
                    else
                    {
                        response.ResponseMessage = "Please provide valid Project ,Release!";
                    }
                }

                return response;
            }
        }

        public static List<MetricsModel> GetSavedMetricsAssociation(int projectId, int releaseId, List<int> month)
        {
            using (var db = new QRMEntities())
            {
                var releaseDetails = (from m in db.ProjectMetricAssociations
                                      join mt in db.MetricMasters on m.MetricMasterID equals mt.MetricMasterID
                                      where m.ProjectId == projectId && m.ReleaseId == releaseId && month.Contains(m.MonthId)
                                      orderby m.ProjectId
                                      select new MetricsModel
                                      {
                                          MetricsMasterId = m.MetricMasterID,
                                          CategoryDescription = mt.MetricCategoryDescription,
                                          CategoryCode = mt.MetricCategoryCode
                                      }).ToList();
                return releaseDetails;
            }
        }
    }
}