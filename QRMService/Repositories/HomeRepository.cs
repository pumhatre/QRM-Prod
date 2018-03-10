using QRMService.DataBase;
using QRMService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Repositories
{
    public class HomeRepository
    {

        public static List<UserProjects> GetUserProject(int userId)
        {
            List<UserProjects> userProjectList = new List<UserProjects>();
            if (userId!=0)
            {
                using (var db = new QRMEntities())
                {
                    var userProjects = (from pm in db.ProjectMasters
                                        join od in db.UserProjectRoleAssociations on pm.ProjectID equals od.ProjectId
                                        where od.UserId == userId
                                        select new UserProjects
                                        {
                                            ProjectId=pm.ProjectID,
                                            ProjectName = pm.ProjectName,
                                            ServiceLine = pm.ServiceLine,
                                            ClientName = pm.ClientName,
                                            Technology = pm.Technology,
                                            Industry = pm.Industry,
                                            LifeCycle = pm.LifeCycle,
                                            Director = pm.Director,
                                            SeniorManager = pm.SeniorManager,
                                            ProjectManager = pm.ProjectManager,
                                        }).ToList();
                    if (userProjects.Count>0 && userProjects!=null)
                    {
                        foreach (var item in userProjects)
                        {
                            userProjectList.Add(item);
                        }
                    }
                }
            }
            return userProjectList;
        }
    }
}
