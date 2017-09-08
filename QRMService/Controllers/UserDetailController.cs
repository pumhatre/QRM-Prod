using QRMService.Business;
using QRMService.Business.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace QRMService.Controllers
{
    public class UserDetailController : ApiController
    {

        public UserDetailsViewModel Post([FromBody]string value)
        {
            return new UserProcessor().GetUser("admin", "admin123");
        }

        
    }
}
