using Newtonsoft.Json.Linq;
using QRMService.Models;
using QRMService.Repositories;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
namespace QRMService.Controllers
{
    [RoutePrefix("api/User")]
    public class UserController: ApiController
    {   

        
        [HttpPost]
        public IHttpActionResult InsertUpdateUser(UserModel user)
        {
            UserRepository userRepository = new UserRepository();
            var response = userRepository.InsertUpdateUsers(user);
            return Ok(response);
        }

        [HttpGet]
        public IHttpActionResult GetRoles()
        { 
            var response = RoleRepository.GetRolesList();
            return Ok(response);
        }


        [HttpPost]
        public IHttpActionResult DeleteUser(int UserId)
        {
            UserRepository userRepository = new UserRepository();
            var response = userRepository.DeleteUser(UserId);
            return Ok(response);
        }



        [Route("GetUserInfo")]
        [HttpGet]
        public HttpResponseMessage GetUserDetails(string projectId)
        {
            UserRepository userRepo = new UserRepository();
            projectId = string.IsNullOrEmpty(projectId) ? "0" : projectId;
            
            if(!string.IsNullOrEmpty(projectId) && projectId != "null")
            {
                var userData = userRepo.GetUsers(System.Int32.Parse(projectId));
                var response = Request.CreateResponse(HttpStatusCode.OK, userData);
                return response;
            }
            else
            {                
                var response = Request.CreateErrorResponse(HttpStatusCode.NoContent, "Error");
                return response;

            }           
            
        }

        [Route("SaveUserInfo")]
        [HttpPost]
        public HttpResponseMessage UpdateUserDetails1()
        {
            UserRepository userRepo = new UserRepository();
            List<int> userIds = new List<int>();
            string content = Request.Content.ReadAsStringAsync().Result;
            JObject json = JObject.Parse(content);
             
            List<UserModel> userModelData = JsonConvert.DeserializeObject<List<UserModel>>(json.GetValue("userData").ToString());
            List<DeletedUser> usersDeleted = JsonConvert.DeserializeObject<List<DeletedUser>>(json.GetValue("deletedUser").ToString());
            string projectId = json.GetValue("projectId").ToString();
            foreach (var user in usersDeleted)
            {
                userIds.Add(user.userId);
            }
            bool sucess = userRepo.updateDeleteUsers(userModelData, System.Int32.Parse(projectId), userIds);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "OK");
            return response;
        }



    }


}