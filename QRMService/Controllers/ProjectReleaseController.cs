using QRMService.Repositories;
using System.Web.Http;

namespace QRMService.Controllers
{
    public class ProjectReleaseController : ApiController
    {

        public IHttpActionResult GetProjectDetails(int projectID)
        {
            var data = ProjectRepository.GetProjectDetails(projectID);

            return Ok(data);
        }
        public IHttpActionResult GetProjects()
        {
            var data = ProjectRepository.GetProjects();

            return Ok(data);
        }
        public IHttpActionResult DeleteProject(int projectID)
        {
            var data = ProjectRepository.DeleteProject(projectID);
            return Ok();
        }
        

    }
}
