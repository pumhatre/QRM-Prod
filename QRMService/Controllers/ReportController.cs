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
        [HttpGet]
        public IHttpActionResult GetAllProjectEffort()
        {
            try
            {
                List<ProjectEffort> projectEffort = new List<ProjectEffort>();
                projectEffort.Add(new ProjectEffort() { CompleteHours = 1, DashboardSubtype = "Total Planned", NotStartedHours = 23, TotalHours = 24, DashBoardType = "Dev Dashboard(Hrs.)", WIPHours = 2 });
                projectEffort.Add(new ProjectEffort() { CompleteHours = 1, DashboardSubtype = "Total Actual", NotStartedHours = 23, TotalHours = 24, WIPHours = 2 });

                projectEffort.Add(new ProjectEffort() { CompleteHours = 1, DashboardSubtype = "Total Planned", NotStartedHours = 23, TotalHours = 24, DashBoardType = "Test Dashboard(Hrs.)", WIPHours = 2 });
                projectEffort.Add(new ProjectEffort() { CompleteHours = 1, DashboardSubtype = "Total Actual", NotStartedHours = 23, TotalHours = 24, WIPHours = 2 });

                projectEffort.Add(new ProjectEffort() { CompleteHours = 1, DashboardSubtype = "Total Planned", NotStartedHours = 23, TotalHours = 24, DashBoardType = "Project Effort(Hrs.)", WIPHours = 2 });
                projectEffort.Add(new ProjectEffort() { CompleteHours = 1, DashboardSubtype = "Total Actual", NotStartedHours = 23, TotalHours = 24, WIPHours = 2 });
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
                List<ProjectDefects> projectDefect = new List<ProjectDefects>();
                projectDefect.Add(new ProjectDefects() { Closed = 1, Open = 1, Overall = 2, Rejected = 23, PropertyName = "Functional Design" });
                projectDefect.Add(new ProjectDefects() { Closed = 1, Open = 1, Overall = 2, Rejected = 23, PropertyName = "Technical Design" });
                projectDefect.Add(new ProjectDefects() { Closed = 1, Open = 1, Overall = 2, Rejected = 23, PropertyName = "Code Review" });
                projectDefect.Add(new ProjectDefects() { Closed = 1, Open = 1, Overall = 2, Rejected = 23, PropertyName = "Unit Test" });
                projectDefect.Add(new ProjectDefects() { Closed = 1, Open = 1, Overall = 2, Rejected = 23, PropertyName = "Integ/Pre-SIT" });
                projectDefect.Add(new ProjectDefects() { Closed = 1, Open = 1, Overall = 2, Rejected = 23, PropertyName = "SIT E2E" });
                projectDefect.Add(new ProjectDefects() { Closed = 1, Open = 1, Overall = 2, Rejected = 23, PropertyName = "UAT" });
                projectDefect.Add(new ProjectDefects() { Closed = 1, Open = 1, Overall = 2, Rejected = 23, PropertyName = "Post" });
                projectDefect.Add(new ProjectDefects() { Closed = 1, Open = 1, Overall = 2, Rejected = 23, PropertyName = "Total" });
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
                List<ProjectTesting> projectTesting = new List<ProjectTesting>();
                projectTesting.Add(new ProjectTesting() { PropertyName="Manual",IsManualORAutomatic=true});
                projectTesting.Add(new ProjectTesting() {PropertyName = "# SIT TC's Planned", PreSitComponent = 1, PreSitE2E = 3, SitComponent = 4, SitE2E = 6 });
                projectTesting.Add(new ProjectTesting() {  PropertyName = "# of TC's Executed", PreSitComponent = 1, PreSitE2E = 3, SitComponent = 4, SitE2E = 6 });
                projectTesting.Add(new ProjectTesting() {  PropertyName = "# of Passed TC's", PreSitComponent = 1, PreSitE2E = 3, SitComponent = 4, SitE2E = 6 });
                projectTesting.Add(new ProjectTesting() { PropertyName = "# of Defect Identified", PreSitComponent = 1, PreSitE2E = 3, SitComponent = 4, SitE2E = 6 });
                projectTesting.Add(new ProjectTesting() { PropertyName = "Automation",IsManualORAutomatic=true });

                projectTesting.Add(new ProjectTesting() {  PropertyName = "# SIT TC's Planned", PreSitComponent = 1, PreSitE2E = 3, SitComponent = 4, SitE2E = 6 });
                projectTesting.Add(new ProjectTesting() {  PropertyName = "# of TC's Executed", PreSitComponent = 1, PreSitE2E = 3, SitComponent = 4, SitE2E = 6 });
                projectTesting.Add(new ProjectTesting() {  PropertyName = "# of Passed TC's", PreSitComponent = 1, PreSitE2E = 3, SitComponent = 4, SitE2E = 6 });
                projectTesting.Add(new ProjectTesting() {  PropertyName = "# of Defect Identified", PreSitComponent = 1, PreSitE2E = 3, SitComponent = 4, SitE2E = 6 });
                return Ok(projectTesting);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }


    }
}
