using QRMService.Models;
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



        [HttpGet]
        public IHttpActionResult GetProjectsMasterList()
        {
            var data = ProjectRepository.GetProjectsMasterList();
            return Ok(data);
        }

        [HttpPost]
        public IHttpActionResult InsertUpdateProjectMaster(ProjectMasterModel projectMaster)
        {

            var response = ProjectRepository.UpdateProjectRelease(projectMaster);
            return Ok(response);
        }


        [HttpPost]
        public IHttpActionResult DeleteProjectMaster(ProjectMasterModel projectMaster)
        {

            var response = ProjectRepository.DeleteProject(projectMaster.ProjectID);
            return Ok(response);
        }

    }
}