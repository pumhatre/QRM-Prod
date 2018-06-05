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
    public class ChartController : ApiController
    {

        /// <summary>
        /// Gets all effort ditribution  details
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetEffortDistribution(HealthReportRequestModel request)
        {
            try
            {
                var effortDistribution = ChartRepository.GetEffortDistribution(request.ProjectId, request.ReleaseId);
                SingleChartList obj = new SingleChartList();
                foreach (var item in effortDistribution)
                {
                    obj.Label.Add(item.EffortType);
                }
                return Ok(effortDistribution);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Gets all test case  ditribution  details
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetTestCaseDistribution(HealthReportRequestModel request)
        {
            try
            {
                var testCaseDistribution = ChartRepository.GetTestCaseDistribution(request.ProjectId, request.ReleaseId);
                return Ok(testCaseDistribution);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Gets all test case complexity ditribution  details
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetTestCaseComplexityDistribution(HealthReportRequestModel request)
        {
            try
            {
                var testCaseComplexityDistribution = ChartRepository.GetTestCaseComplexityDistribution(request.ProjectId, request.ReleaseId);
                return Ok(testCaseComplexityDistribution);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        /// <summary>
        /// Gets all Detected Phase Distribution
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetDefectDetectedPhaseDistribution(HealthReportRequestModel request)
        {
            try
            {
                var defectDetectedPhaseDistribution = ChartRepository.GetDefectDetectedPhaseDistribution(request.ProjectId, request.ReleaseId);
                return Ok(defectDetectedPhaseDistribution);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
    }
}
