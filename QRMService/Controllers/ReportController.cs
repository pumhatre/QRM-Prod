﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using QRMService.Repositories;
using QRMService.Wrapper;
using QRMService.Models;

namespace QRMService.Controllers
{
    public class ReportController : ApiController
    {
        /// <summary>
        /// Gets all project details
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<ProjectDetailsWrapper> GetAllProjectsList()
        {
            try
            {
                return ReportRepository.GetProjectsList().Select(p => new ProjectDetailsWrapper
                {
                    ProjectID = p.ProjectId,
                    ProjectName = p.ProjectName
                }).ToList();
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        /// <summary>
        /// Gets all months details
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<MonthDetailsWrapper> GetAllMonthsList()
        {
            try
            {
                return ReportRepository.GetMonthsList().Select(p => new MonthDetailsWrapper
                {
                    MonthId = p.MonthId,
                    MonthName = p.MonthName + '-' + p.Year

                }).ToList();
            }
            catch (Exception ex)
            {
                throw (ex);
            }

        }
        /// <summary>
        /// Gets all project release details
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<ProjectReleaseDetailsWrapper> GetProjectReleaseList()
        {
            try
            {
                return ReportRepository.GetProjectReleaseList().Select(p => new ProjectReleaseDetailsWrapper
                {
                    ProjectID = p.ProjectID,
                    ProjectReleaseId = p.ProjectReleaseId,
                    ReleaseName = p.ReleaseName
                }).ToList();
            }
            catch (Exception ex)
            {
                throw (ex);
            }

        }

        /// <summary>
        /// Gets all matrics details
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<ProjectMatricsDetailsWrapper> GetProjectMatricsList(int ProjectReleaseId, int ProjectId, int MonthId)
        {
            try
            {
                return ReportRepository.GetProjectMatricsList(ProjectReleaseId, ProjectId, MonthId).Select(p => new ProjectMatricsDetailsWrapper
                {
                    MetricMasterID = p.MetricMasterID,
                    MetricCategoryCode = p.MetricCategoryCode,
                    MetricCategoryDescription = p.MetricCategoryDescription
                }).ToList();
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Save Report Preference
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult SaveReportPreference(SaveReportRequestModel Request)
        {
            try
            {
                var data = ReportRepository.SaveReportPreference(Request.ProjectId, Request.MonthId, Request.ReleaseId, Request.ReportName, Request.MetricsList);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Create New Report
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult CreateNewReport(int ProjectId, int MonthId, int ReleaseId, string ReportName, MetricsModel[] MetricsList)
        {
            try
            {
                var data = true;
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Gets all project details
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllProjectEffort()
        {
            try
            {
                var projectEffort = ReportRepository.GetProjectEffort(Guid.NewGuid());
                for (int i = 0; i < projectEffort.Count; i++)
                {
                    if (i%2==0)
                    {
                        projectEffort[i].spanCompany = 2;
                    }
                }
                return Ok(projectEffort);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }


        /// <summary>
        /// Gets all project defetcs 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllProjectDefects()
        {
            try
            {
                var projectDefect = ReportRepository.GetProjectDefects(Guid.NewGuid());
                return Ok(projectDefect);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Gets all project defetcs 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllProjectTesting()
        {
            try
            {
                var projectTesting = ReportRepository.GetProjectTesting(Guid.NewGuid());
                return Ok(projectTesting);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }


        /// <summary>
        /// Gets project widget Dashboard
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetProjectWidgetDashboard()
        {
            try
            {
                var projectWidget = ReportRepository.GetProjectWidget(Guid.NewGuid());
                return Ok(projectWidget);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Calling three SP with execution step as 1
        /// </summary>
        public void FinalizeMethod()
        {
            try
            {
                ReportRepository.GetProjectEffort(Guid.NewGuid(), 1);
                ReportRepository.GetProjectWidget(Guid.NewGuid(), 1);
                ReportRepository.GetProjectTesting(Guid.NewGuid(), 1);
                ReportRepository.GetProjectDefects(Guid.NewGuid(), 1);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


    }
}
