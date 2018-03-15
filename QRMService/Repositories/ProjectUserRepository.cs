using QRMService.DataBase;
using QRMService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QRMService.Repositories
{
    public class ProjectUserRepository
    {

        /// <summary>
        /// Gets all project users.
        /// </summary>
        /// <returns></returns>
        public static List<SelectListItem> GetUsersList()
        {
            using (var db = new QRMEntities())
            {
                return db.UserDetails
                    .Select(x => new SelectListItem
                    {
                        Text = x.LastName +", " + x.FirstName,
                        Value = x.UserId.ToString()

                    }).OrderBy(y => y.Text).ToList();
            }
        }


        public static List<ProjectUserAssociationModel> GetProjectUsersById(int ProjectId)
        {
            using (var db = new QRMEntities())
            {
                var projectUsers = (from pr in db.UserProjectAssociations
                                       join p in db.ProjectMasters on pr.ProjectId equals p.ProjectID
                                       join ud in db.UserDetails on pr.UserId equals ud.UserId
                                       where pr.ProjectId == ProjectId  &&  p.IsActive == true
                                       select new ProjectUserAssociationModel
                                       {
                                           ProjectUserId = pr.UserProjectId,
                                           ProjectID = p.ProjectID,
                                           ProjectUserName = ud.LastName + ", " + ud.FirstName,
                                           ProjectName = p.ProjectName
                                       }).OrderBy(a => a.ProjectID).ToList();
                return projectUsers;
            }
        }




        /// <summary>
        /// Gets all project users.
        /// </summary>
        /// <returns></returns>
        public static List<ProjectUserAssociationModel> GetAllProjectUsers()
        {
            using (var db = new QRMEntities())
            {
                var projectUsers = (from pr in db.UserProjectAssociations
                                       join p in db.ProjectMasters on pr.ProjectId equals p.ProjectID
                                       join ud in db.UserDetails on pr.UserId equals ud.UserId
                                       where p.IsActive == true
                                       select new ProjectUserAssociationModel
                                       {
                                           ProjectUserId = pr.UserProjectId,
                                           ProjectID = p.ProjectID,
                                           ProjectUserName = ud.LastName + ", " + ud.FirstName,
                                           ProjectName = p.ProjectName

                                       }).OrderBy(a => a.ProjectName).ToList();
                return projectUsers;
            }
        }



        /// <summary>
        /// Inserts the project user.
        /// </summary>
        /// <param name="projectId">The project identifier.</param>
        /// <param name="userName">Name of the user.</param>
        /// <returns></returns>
        public static ProjectUserResponseModel InsertProjectUser(int projectId, int userId)
        {
            var response = new ProjectUserResponseModel();
            using (var db = new QRMEntities())
            {
                var projectUser = db.UserProjectAssociations.Where(a => a.ProjectId == projectId && a.UserId == userId).FirstOrDefault();
                if (projectUser == null)
                {
                    var userProjectId = db.UserProjectAssociations.OrderByDescending(p => p.UserProjectId).FirstOrDefault().UserProjectId;
                    var projectUserAssoc = new UserProjectAssociation
                    {

                        UserProjectId = userProjectId + 1,
                        ProjectId = projectId,
                        UserId = userId
                    };
                    db.UserProjectAssociations.Add(projectUserAssoc);
                    db.SaveChanges();
                    response.IsSuccess = true;
                    response.ResponseMessage = "Project User added successfully";
                }
                else
                {
                    response.ResponseMessage = "Project User Association already exists.";
                }
                return response;
            }
        }
    }
}