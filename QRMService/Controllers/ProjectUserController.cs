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
    public class ProjectUserController : ApiController
    {


        /// <summary>
        /// Gets all project users.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetUsersList()
        {
            var response = ProjectUserRepository.GetUsersList();
            return Ok(response);
        }



        [HttpPost]
        public IHttpActionResult GetProjectUsersById(ProjectUserAssociationModel request)
        {
            var response = ProjectUserRepository.GetProjectUsersById(request.ProjectID,request.ProjectUserId);
            return Ok(response);
        }

        /// <summary>
        /// Gets all project releases.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllProjectUsers()
        {
            var response = ProjectUserRepository.GetAllProjectUsers();
            return Ok(response);
        }


        /// <summary>
        /// Inserts the project user.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult InsertProjectUser(ProjectUserAssociationModel request)
        {
            var response = new ProjectUserResponseModel();
            if (ModelState.IsValid)
            {
                response = ProjectUserRepository.InsertProjectUser(request.ProjectID, request.ProjectUserId);
            }
            else
            {
                response.IsSuccess = false;
                response.ResponseMessage = "Invalid input.";
            }
            return Ok(response);
        }

    }
}
