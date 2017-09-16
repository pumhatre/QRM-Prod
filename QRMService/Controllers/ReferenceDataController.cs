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
    public class ReferenceDataController : ApiController
    {
      
        [HttpPost]
        public IHttpActionResult GetReferenceTable(ReferenceTableRequestModel request)
        {
            var data = ReferenceRepository.GetReferenceDataByTableName(request.TableName);
            return Ok(data);
        }

        [HttpPost]
        public IHttpActionResult GetReferenceValueByCode(ReferenceTableRequestModel request)
        {
            var data = ReferenceRepository.GetReferenceValueByCode(request.TableName,request.Code);
            return Ok(data);
        }


    }
}
