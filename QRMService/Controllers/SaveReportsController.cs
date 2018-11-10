using QRMService.Models;
using QRMService.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace QRMService.Controllers
{
    public class SaveReportsController : ApiController
    {
        /// <summary>
        /// Saves the report.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult SaveReport(MySavedReportsRequestModel request)
        {
            try
            {
                var isSuccess = MySavedReportRepository.SaveReport(request.UserId, request.ProjectId, request.ProjectReleaseID, request.ReportType, request.ReportName, request.SavedReportData);
                return Ok(new { Success = isSuccess });
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Deletes my report.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult DeleteMyReport(MySavedReportsRequestModel request)
        {
            try
            {
                var isSuccess = MySavedReportRepository.DeleteMySavedReport(request.UserReportAssociationID);
                return Ok(new { Success = isSuccess });
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Gets my saved reports.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetMySavedReports(MySavedReportsRequestModel request)
        {
            try
            {
                var data = MySavedReportRepository.GetMySavedReports(request.UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
    }
}
