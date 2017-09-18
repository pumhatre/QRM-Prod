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
        public static bool ValidateUser(UserDetails userDetails)
        {
            using (var db = new QRMEntities())
            {

                var count =  db.UserDetails.Where(p => userDetails.UserName == p.UserName && userDetails.Password == p.Password).ToList().Count;

                return count > 0 ? true : false;
            }
        }

       

    }
}