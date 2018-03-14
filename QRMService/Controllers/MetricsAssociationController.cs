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

        
        public IHttpActionResult SaveMetricsAssociation([FromBody]ProjectMetricsAssociationModel modelData)
        {
            var data = MetricsAssociationRepository.SaveMetricsAssociation(modelData);
            return Ok(data);
        }
        [HttpPost]
        public IHttpActionResult GetSavedMetricsAssociation(SearchModel searchModel)
        {
            var data = MetricsAssociationRepository.GetSavedMetricsAssociation(Convert.ToInt32(searchModel.ProjectId),
                Convert.ToInt32(searchModel.ReleaseId),(searchModel.MonthId));
            return Ok(data);
        }
        [HttpPost]
        public IHttpActionResult GetSelectedProjectMonth(int projectId,int releaseId)
        {
            var data = MetricsAssociationRepository.GetSelectedProjectMonth(projectId,releaseId);
            return Ok(data);
        }

        public class SearchModel
        {
            public string ProjectId { get; set; }
            public string ReleaseId { get; set; }
            public List<int> MonthId { get; set; }
        }
    }
}