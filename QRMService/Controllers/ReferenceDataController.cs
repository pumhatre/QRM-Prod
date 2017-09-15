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
        public IHttpActionResult GetReferenceTable(string tableName)
        {

            var data = ReferenceRepository.GetReferenceDataByTable(tableName);
            return Ok(data);


        }


    }
}
