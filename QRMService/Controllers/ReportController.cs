using System;
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
        [HttpPost]
        public IHttpActionResult GetAllProjectEffort(HealthReportRequestModel request)
        {
            try
            {
                var projectEffort = ReportRepository.GetProjectEffort(Guid.NewGuid(), request.ProjectId,request.ReleaseId,request.MonthId);
                for (int i = 0; i < projectEffort.Count; i++)
                {
                    if (i%2==0)
                    {
                        projectEffort[i].spanEffort = 3;
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
        /// Gets the project effort by project.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetProjectEffortByProject(HealthReportRequestModel request)
        {
            try
            {
                var projectEffort = ReportRepository.GetProjectEffort(request.ProjectId,request.ReleaseId,request.MonthId);
                for (int i = 0; i < projectEffort.Count; i++)
                {
                    if (i % 2 == 0)
                    {
                        projectEffort[i].spanEffort = 3;
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
        [HttpPost]
        public IHttpActionResult GetAllProjectDefects(HealthReportRequestModel request)
        {
            try
            {
                var projectDefect = ReportRepository.GetProjectDefects(Guid.NewGuid(),request.ProjectId, request.ReleaseId, request.MonthId);
                return Ok(projectDefect);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Gets project defetcs by project
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetProjectDefectsByProject(HealthReportRequestModel request)
        {
            try
            {
                var projectDefect = ReportRepository.GetProjectDefects(request.ProjectId,request.ReleaseId,request.MonthId);
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
        [HttpPost]
        public IHttpActionResult GetAllProjectTesting(HealthReportRequestModel request)
        {
            try
            {
                var projectTesting = ReportRepository.GetProjectTesting(Guid.NewGuid(), request.ProjectId, request.ReleaseId, request.MonthId);
                return Ok(projectTesting);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Gets project defetcs by project
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetProjectTestingByProject(HealthReportRequestModel request)
        {
            try
            {
                var projectTesting = ReportRepository.GetProjectTesting(request.ProjectId,request.ReleaseId,request.MonthId);
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
        [HttpPost]
        public IHttpActionResult GetProjectWidgetDashboard(HealthReportRequestModel request)
        {
            try
            {
                var projectWidget = ReportRepository.GetProjectWidget(Guid.NewGuid(), request.ProjectId, request.ReleaseId, request.MonthId);
                for (int i = 0; i < projectWidget.Count; i++)
                {
                    if (i==0)
                    {
                        projectWidget[i].spanWidget = 3;
                    }
                    else
                    {
                        projectWidget[i].spanWidget = 0;
                    }
                }
                return Ok(projectWidget);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Gets the project vriance dashboard.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetProjectVrianceDashboard(HealthReportRequestModel request)
        {
            try
            {
                var projectVariance = ReportRepository.GetProjectVariance(Guid.NewGuid(), request.ProjectId, request.ReleaseId, request.MonthId);                
                return Ok(projectVariance);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Gets the project widget dashboard by project.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetProjectWidgetDashboardByProject(HealthReportRequestModel request)
        {
            try
            {
                var projectWidget = ReportRepository.GetProjectWidget(request.ProjectId,request.ReleaseId,request.MonthId);
                for (int i = 0; i < projectWidget.Count; i++)
                {
                    if (i == 0)
                    {
                        projectWidget[i].spanWidget = 3;
                    }
                    else
                    {
                        projectWidget[i].spanWidget = 0;
                    }
                }
                return Ok(projectWidget);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Gets the project variance dashboard by project.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetProjectVarianceDashboardByProject(HealthReportRequestModel request)
        {
            try
            {
                var projectWidget = ReportRepository.GetProjectVariance(request.ProjectId,request.ReleaseId,request.MonthId);
                return Ok(projectWidget);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Gets productivity GroundUp Dashboard
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetProductivityGroundUpDashboard()
        {
            try
            {
                var productivity = ReportRepository.GetProductivityGroundUp();

                for (int i = 0; i < productivity.Count; i++)
                {
                    if (i % 5 == 0)
                    {
                        productivity[i].spanEffort = 9;
                    }
                }

                return Ok(productivity);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        /// <summary>
        /// Gets productivity GroundUp Dashboard
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetProductivityEnhancedDashboard()
        {
            try
            {
                var productivity = ReportRepository.GetProductivityEnhanced();

                for (int i = 0; i < productivity.Count; i++)
                {
                    if (i % 5 == 0)
                    {
                        productivity[i].spanEffort = 9;
                    }
                }

                return Ok(productivity);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Gets the producity ground up.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetProductivityGroundUp(HealthReportRequestModel request)
        {
            try
            {
                var productivity = ReportRepository.GetProductivityGroundUp(Guid.NewGuid(), request.ProjectId, request.ReleaseId, request.MonthId);
                for (int i = 0; i < productivity.Count; i++)
                {
                    if (i % 4 == 0)
                    {
                        productivity[i].spanEffort = 9;
                    }
                }
                return Ok(productivity);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Gets the producity enhanced.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetProductivityEnhanced(HealthReportRequestModel request)
        {
            try
            {
                var productivity = ReportRepository.GetProductivityEnhanced(Guid.NewGuid(), request.ProjectId, request.ReleaseId, request.MonthId);
                for (int i = 0; i < productivity.Count; i++)
                {
                    if (i % 4 == 0)
                    {
                        productivity[i].spanEffort = 9;
                    }
                }
                return Ok(productivity);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Gets the defect density ground up.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetDefectDensityGroundUp(HealthReportRequestModel request)
        {
            try
            {
                var defectDensity = ReportRepository.GetDefectDensityGroundUp(Guid.NewGuid(), request.ProjectId, request.ReleaseId, request.MonthId);
                for (int i = 0; i < defectDensity.Count; i++)
                {
                    if (i % 4 == 0)
                    {
                        defectDensity[i].spanEffort = 9;
                    }
                }
                return Ok(defectDensity);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Gets the defect density enhanced.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetDefectDensityEnhanced(HealthReportRequestModel request)
        {
            try
            {
                var defectDensity = ReportRepository.GetDefectDensityEnhanced(Guid.NewGuid(), request.ProjectId, request.ReleaseId, request.MonthId);
                for (int i = 0; i < defectDensity.Count; i++)
                {
                    if (i % 4 == 0)
                    {
                        defectDensity[i].spanEffort = 9;
                    }
                }
                return Ok(defectDensity);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [HttpPost]
        public IHttpActionResult GetProductivityGroundUpByProject(HealthReportRequestModel request)
        {
            try
            {
                var productivity = ReportRepository.GetProductivityGroundUp(request.ProjectId, request.ReleaseId, request.MonthId);
                for (int i = 0; i < productivity.Count; i++)
                {
                    if (i % 4 == 0)
                    {
                        productivity[i].spanEffort = 9;
                    }
                }
                return Ok(productivity);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Gets the producity enhanced.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetProductivityEnhancedByProject(HealthReportRequestModel request)
        {
            try
            {
                var productivity = ReportRepository.GetProductivityEnhanced(request.ProjectId, request.ReleaseId, request.MonthId);
                for (int i = 0; i < productivity.Count; i++)
                {
                    if (i % 4 == 0)
                    {
                        productivity[i].spanEffort = 9;
                    }
                }
                return Ok(productivity);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Gets the defect density ground up.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetDefectDensityGroundUpByProject(HealthReportRequestModel request)
        {
            try
            {
                var defectDensity = ReportRepository.GetDefectDensityGroundUp(request.ProjectId, request.ReleaseId, request.MonthId);
                for (int i = 0; i < defectDensity.Count; i++)
                {
                    if (i % 4 == 0)
                    {
                        defectDensity[i].spanEffort = 9;
                    }
                }
                return Ok(defectDensity);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Gets the defect density enhanced.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetDefectDensityEnhancedByProject(HealthReportRequestModel request)
        {
            try
            {
                var defectDensity = ReportRepository.GetDefectDensityEnhanced(request.ProjectId, request.ReleaseId, request.MonthId);
                for (int i = 0; i < defectDensity.Count; i++)
                {
                    if (i % 4 == 0)
                    {
                        defectDensity[i].spanEffort = 9;
                    }
                }
                return Ok(defectDensity);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

    }
}
