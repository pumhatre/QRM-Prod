using QRMService.DataBase;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using QRMService.Models;

namespace QRMService.Repositories
{
    public class RoleRepository
    {
        /// <summary>
        /// Gets the projects list.
        /// </summary>
        /// <returns></returns>
        public static List<SelectListItem> GetRolesList()
        {
            using (var db = new QRMEntities())
            {
                return db.RoleMasters.Select(a => new SelectListItem
                {
                    Text = a.RoleName,
                    Value = a.RoleId.ToString()
                }).OrderBy(b => b.Text).ToList();
            }
        }

        /// <summary>
        /// Gets the projects list.
        /// </summary>
        /// <returns></returns>
        public static List<SelectListItem> GetProjectList()
        {
            using (var db = new QRMEntities())
            {
                return db.ProjectMasters.Where(a=>a.IsActive==true).Select(a => new SelectListItem
                {
                    Text = a.ProjectName,
                    Value = a.ProjectID.ToString()
                }).OrderBy(b => b.Text).ToList();
            }
        }

        public static RoleMaster GetRoleDetails(int projectID)
        {
            using (var db = new QRMEntities())
            {
                return db.RoleMasters.Where(a => a.RoleId == projectID).FirstOrDefault();
            }

        }
        public static List<RoleModel> GetRoles()
        {
            using (var db = new QRMEntities())
            {
                var roles = (from r in db.RoleMasters
                             select new RoleModel
                             {
                                 RoleId = r.RoleId,
                                 RoleName = r.RoleName,
                                 IsActive = r.IsActive.Equals("Y")
                             }).ToList();
                return roles;
            }

        }

        public static void SaveRoles(List<RoleModel> roles)
        {
            using (var db = new QRMEntities())
            {
                int lastRoleId = db.RoleMasters.Count() == 0 ? 0 : db.RoleMasters.Max(x => x.RoleId);
                foreach (var r in roles)
                {
                    if (r.RoleId != 0)
                    {
                        var role = db.RoleMasters.FirstOrDefault(x => x.RoleId == r.RoleId);
                        role.RoleName = r.RoleName;
                        role.IsActive = r.IsActive ? "Y" : "N";
                    }
                    else
                    {
                        lastRoleId = lastRoleId + 1;
                        RoleMaster role = new RoleMaster()
                        {
                            RoleId = lastRoleId,
                            RoleName = r.RoleName,
                            IsActive = r.IsActive ? "Y" : "N"
                        };

                        db.RoleMasters.Add(role);
                    }
                }
            db.SaveChanges();
        }
    }

    public static void DeleteRole(int id)
    {
        using (var db = new QRMEntities())
        {

            db.RoleMasters.Remove(db.RoleMasters.FirstOrDefault(x => x.RoleId == id));
            db.SaveChanges();

        }

    }
}
}