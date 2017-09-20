using QRMService.Models;
using QRMService.Repositories;
using System.Collections.Generic;
using System.Web.Http;

namespace QRMService.Controllers
{
    public class RoleController : ApiController
    {
        /// <summary>
        /// Gets the Roles list.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetRoles()
        {
            try
            {
                var data = RoleRepository.GetRoles();
                return Ok(data);
            }
            catch(System.Exception e)
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// Saves the Roles list.
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult SaveRoles(List<RoleModel> roles)
        {
            try
            {
                RoleRepository.SaveRoles(roles);
                return Ok();
            }
            catch (System.Exception e)
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// Saves the Roles list.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult DeleteRole(int id)
        {
            try
            {
                RoleRepository.DeleteRole(id);
                return Ok();
            }
            catch (System.Exception e)
            {
                return BadRequest();
            }
        }
    }
}