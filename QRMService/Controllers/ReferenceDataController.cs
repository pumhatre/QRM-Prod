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

        /// <summary>
        /// Gets the reference table.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetReferenceTable(ReferenceTableRequestModel request)
        {
            var data = ReferenceRepository.GetReferenceDataByTableName(request.TableName);
            return Ok(data);
        }

        /// <summary>
        /// Gets the reference value by code.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetReferenceValueByCode(ReferenceTableRequestModel request)
        {
            var data = ReferenceRepository.GetReferenceValueByCode(request.TableName,request.Code);
            return Ok(data);
        }


    }
}
