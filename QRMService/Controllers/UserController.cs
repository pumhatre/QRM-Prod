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
        [Route("GetUserInfo")]
        [HttpGet]
        public HttpResponseMessage GetUserDetails(string projectId)
        {
            UserRepository userRepo = new UserRepository();
            var userData = userRepo.GetUsers(System.Int32.Parse(projectId));
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, userData);
            return response;
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