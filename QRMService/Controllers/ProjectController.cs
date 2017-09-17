using QRMService.Repositories;
using System.Web.Http;

namespace QRMService.Controllers
{
    public class ProjectController : ApiController
    {
        /// <summary>
        /// Gets the projects list.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetProjectsList()
        {
            var data = ProjectRepository.GetProjectsList();
            return Ok(data);
        }
    }
}