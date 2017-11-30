using QRMFrameworkHelpers;
using QRMService.Common;
using QRMService.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace QRMService.Controllers
{
    public class DefectDataStagingController : ApiController
    {
        public IHttpActionResult GetDefectStagingData()
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("Project", "Kentucky"));
            parameters.Add(new KeyValuePair<string, object>("Month", "November"));
            parameters.Add(new KeyValuePair<string, object>("Release", 001));
            var data = helper.GetDataTableByProcedure(Constants.UspGetDefectStagingData, "default", true, parameters.ToArray());

            return Ok(data);
        }




    }
}
