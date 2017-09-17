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
    public class ProjectRepository
    {
        /// <summary>
        /// Gets the projects list.
        /// </summary>
        /// <returns></returns>
        public static List<SelectListItem> GetProjectsList()
        {
            using (var db = new QRMEntities())
            {
                return db.ProjectMasters.Select(a => new SelectListItem
                {
                    Text = a.ProjectName,
                    Value = a.ProjectID.ToString()
                }).OrderBy(b => b.Text).ToList();
            }
        }       

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