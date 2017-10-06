using Newtonsoft.Json.Linq;
using QRMService.Models;
using QRMService.Repositories;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;

namespace QRMService.Controllers
{
    [RoutePrefix("api/Metrics")]
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

        [Route("SaveMetricsData")]
        [HttpPost]
        public HttpResponseMessage UpdateMetricsDetails()
        {
            MetricsRepository metricsRepository = new MetricsRepository();
            List<int> metricsMasterIds = new List<int>();
            string content = Request.Content.ReadAsStringAsync().Result;
            JObject json = JObject.Parse(content);

            List<MetricsModel> updatedMetrics = JsonConvert.DeserializeObject<List<MetricsModel>>(json.GetValue("metricsData").ToString());
            List<MetricsModel> deletedMetrics = JsonConvert.DeserializeObject<List<MetricsModel>>(json.GetValue("deletedMetrics").ToString());
            foreach (var metrics in deletedMetrics)
            {
                metricsMasterIds.Add(metrics.MetricsMasterId);
            }
            bool sucess = metricsRepository.updateDeleteMetrics(updatedMetrics, metricsMasterIds);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "OK");
            return response;
        }
    }
}