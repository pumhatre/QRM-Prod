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
    public class HomeController : ApiController
    {

        [HttpGet]
        public IHttpActionResult GetMyProjects(int userId)
        {
            try
            {
                var projects = HomeRepository.GetUserProject(userId);
                return Ok(projects);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetProjectReviewDetail(int userId)
        {
            try
            {
                var projects = HomeRepository.GetProjectReviewDetail(userId);
                return Ok(projects);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
    }
}
