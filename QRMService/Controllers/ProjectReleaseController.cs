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
    public class ProjectReleaseController : ApiController
    {
        /// <summary>
        /// Gets the project releases.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetProjectReleases(ProjectReleaseModel request)
        {
            var response = ProjectReleaseRepository.GetProjectReleasesByProjectId(request.ProjectID);
            return Ok(response);
        }

        /// <summary>
        /// Gets all project releases.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllProjectReleases()
        {
            var response = ProjectReleaseRepository.GetAllProjectReleases();
            return Ok(response);
        }

        /// <summary>
        /// Inserts the project release.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult InsertProjectRelease(ProjectReleaseModel request)
        {
            var response = new ProjectReleasesResponseModel();
            if (ModelState.IsValid)
            {
                response = ProjectReleaseRepository.InsertProjectRelease(request.ProjectID, request.ReleaseName);
            }
            else
            {
                response.IsSuccess = false;
                response.ResponseMessage = "Invalid input.";
            }
            return Ok(response);
        }

        /// <summary>
        /// Updates the project release.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult UpdateProjectRelease(ProjectReleaseModel request)
        {
            var response = ProjectReleaseRepository.UpdateProjectRelease(request.ProjectReleaseId, request.ReleaseName);
            return Ok(response);
        }

        /// <summary>
        /// Deletes the project release.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult DeleteProjectRelease(ProjectReleaseModel request)
        {
            var response = ProjectReleaseRepository.DeleteProjectRelease(request.ProjectReleaseId);
            return Ok(response);
        }

        /// <summary>
        /// Gets the project details.
        /// </summary>
        /// <param name="projectID">The project identifier.</param>
        /// <returns></returns>
        public IHttpActionResult GetProjectDetails(int projectID)
        {
            var data = ProjectRepository.GetProjectDetails(projectID);

            return Ok(data);
        }

        /// <summary>
        /// Deletes the project.
        /// </summary>
        /// <param name="projectID">The project identifier.</param>
        /// <returns></returns>
        public IHttpActionResult DeleteProject(int projectID)
        {
            var data = ProjectRepository.DeleteProject(projectID);
            return Ok();
           
        }
        

    }
}
