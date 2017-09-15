using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace QRMService.Controllers
{
    public class ProjectReleaseController : ApiController
    {
        public IHttpActionResult GetProjects()
        {
            return Ok();
        }
    }
}
