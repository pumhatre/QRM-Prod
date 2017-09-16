using QRMService.DataBase;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using QRMService.Models;
using System.Data.Entity;

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

    }
}