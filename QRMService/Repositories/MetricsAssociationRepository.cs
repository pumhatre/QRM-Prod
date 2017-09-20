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
                                      select new MetricsModel
                                      {
                                          MetricsMasterId = m.MetricMasterID,
                                          TypeCode = m.MetricTypeCode,
                                          MetricDescription=m.MetricsDescription,
                                      }).ToList();
                return metricsDetails;
            }
        }

        public static List<ProjectReleaseModel> GetProjectReleaseList(int projectId)
        {
            using (var db = new QRMEntities())
            {
                var releaseDetails = (from m in db.ProjectReleaseMasters
                                      where m.ProjectID==projectId
                                      select new ProjectReleaseModel
                                      {
                                          ProjectReleaseId = m.ProjectReleaseId,
                                          ReleaseName=m.ReleaseName,
                                      }).ToList()
                                      ;
                return releaseDetails;
            }
        }

        public static ProjectReleasesResponseModel SaveMetricsAssociation(int projectId, string releaseName)
        {
            var response = new ProjectReleasesResponseModel();
            using (var db = new QRMEntities())
            {
                var projectRelease = db.ProjectReleaseMasters.Where(a => a.ProjectID == projectId && a.ReleaseName.ToLower().Trim() == releaseName.ToLower().Trim()).FirstOrDefault();
                if (projectRelease == null)
                {
                    var release = new ProjectReleaseMaster
                    {
                        ProjectID = projectId,
                        ReleaseName = releaseName
                    };
                    db.ProjectReleaseMasters.Add(release);
                    db.SaveChanges();
                    response.IsSuccess = true;
                    response.ResponseMessage = "Project Release added successfully";
                }
                else
                {
                    response.ResponseMessage = "Release Name already exists.";
                }
                return response;
            }
        }
    }
}