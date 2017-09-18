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
    public class MetricsController : ApiController
    {
        /// <summary>
        /// Gets all project releases.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetMetricsDetails()
        {
            var response = MetricsRepository.GetMetricsDetails();
            return Ok(response);
        }
    }
}