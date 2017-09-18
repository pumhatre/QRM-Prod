using QRMService.DataBase;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using QRMService.Models;
using System.Data.Entity;
using QRMService.DataBase;
using System.Collections.Generic;
using System.Linq;
using System;

namespace QRMService.Repositories
{
    public class LoginRepository
    {
        public static LoginResponseModel ValidateUser(UserDetails userDetails)
        {
            using (var db = new QRMEntities())
            {

                return (from u in db.UserDetails
                        join p in db.UserProjectRoleAssociations on u.UserId equals p.UserId
                        join r in db.RoleMasters on p.RoleId equals r.RoleId
                        where u.UserName == userDetails.UserName && u.Password == userDetails.Password
                        select new LoginResponseModel
                        {
                            UserName = u.UserName,
                            UserId = u.UserId,
                            RoleId = r.RoleId,
                            RoleName = r.RoleName
                        }).FirstOrDefault();
            }
        }



    }
}