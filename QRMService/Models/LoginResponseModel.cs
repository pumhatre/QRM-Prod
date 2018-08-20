using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class LoginResponseModel
    {
        public int UserId { get; set; }

        public string UserName { get; set; }

        public int RoleId { get; set; }

        public string RoleName { get; set; }

        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }
    }
}