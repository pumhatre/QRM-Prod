using QRMService.DataBase;
using System.Collections.Generic;
using System.Linq;
using System;

namespace QRMService.Repositories
{
    public class ProjectRepository
    {

        public static  ProjectMaster  GetProjectDetails(int projectID)
        {
            using (var db = new QRMEntities())
            {
                return db.ProjectMasters.Where(a => a.ProjectID == projectID).FirstOrDefault();
            }

        }
        public static List<ProjectMaster> GetProjects( )
        {
            using (var db = new QRMEntities())
            {
                return db.ProjectMasters.ToList();
            }

        }

        public static object DeleteProject(int projectID)
        {

            return 1;
        }
    }
}