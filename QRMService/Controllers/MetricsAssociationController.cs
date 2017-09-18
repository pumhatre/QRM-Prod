using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using QRMService.Models;
using QRMService.Repositories;

namespace QRMService.Controllers
{
    public class MetricsAssociationController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetMetricsList()
        {
            var data = MetricsAssociationRepository.GetMetricsAssociationList();
            return Ok(data);
        }

        
        public IHttpActionResult GetProjectReleaseList(int projectId)
        {
            var data = MetricsAssociationRepository.GetProjectReleaseList(projectId);
            return Ok(data);
        }
    }
}