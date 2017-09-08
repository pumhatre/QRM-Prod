
using QRMService.Business.ViewModel;
using QRMService.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Business
{
    public class UserProcessor
    {
        private QRMEntities _entities;
        public UserProcessor()
        {
            _entities = new QRMEntities();
        }
        public UserDetailsViewModel GetUser(string userName,string password)
        {
            var loggedInuser = _entities.UserDetails.Where(user => user.UserName == userName && user.Password == password);
            if (loggedInuser != null)
            {
                return loggedInuser.AutoMapList<UserDetail, UserDetailsViewModel>(new List<UserDetailsViewModel>()).FirstOrDefault();
            }
            else
                return null;
        }
    }
}