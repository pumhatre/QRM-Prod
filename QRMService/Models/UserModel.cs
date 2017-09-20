using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class UserModel
    {
        public int userId { get; set; }
        public string firstName { get; set; }
        public string middleName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public int? roleId { get; set; }
        public int userProjectRoleId { get; set; }
        public bool IsDeleted { get; set; }
    }
    public class ProjectUserModel
    {
        public List<UserModel> userDetails { get; set; }
        public List<int> proejectList { get; set; }
    }
    public class DeletedUser
    {
        public int userId { get; set; } 
    }
}