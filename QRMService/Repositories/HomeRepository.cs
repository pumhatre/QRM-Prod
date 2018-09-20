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
            if (userId != 0)
            {
                using (var db = new QRMEntities())
                {
                    var userProjects = (from pm in db.ProjectMasters
                                        join od in db.UserProjectAssociations on pm.ProjectID equals od.ProjectId
                                        where od.UserId == userId && pm.IsActive == true
                                        select new UserProjects
                                        {
                                            ProjectId = pm.ProjectID,
                                            ProjectName = pm.ProjectName,
                                            ServiceLine = pm.ServiceLine,
                                            ClientName = pm.ClientName,
                                            Technology = pm.Technology,
                                            Industry = pm.Industry,
                                            LifeCycle = pm.LifeCycle,
                                            Director = pm.Director,
                                            SeniorManager = pm.SeniorManager,
                                            ProjectManager = pm.ProjectManager,
                                            QualityController = pm.QualityController
                                        }).ToList();
                    if (userProjects.Count > 0 && userProjects != null)
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
        public static List<ProjectReviewModel> GetProjectReviewDetail(int userId)
        {
            List<ProjectReviewModel> userProjectList = new List<ProjectReviewModel>();
            using (var db = new QRMEntities())
            {
                var role = (from p in db.UserDetails
                            join r in db.RoleMasters on p.RoleId equals r.RoleId
                            where r.IsActive == "Y" && p.UserId == userId
                            select r.RoleName).ToList().FirstOrDefault();
                List<ProjectReviewModel> userProjects = new List<ProjectReviewModel>();
                if (role.ToString() != "SuperUser")
                {

                     userProjects = (from pm in db.ProjectMasters
                                        join od in db.UserProjectAssociations on pm.ProjectID equals od.ProjectId
                                        where od.UserId == userId && pm.IsActive == true
                                        select new ProjectReviewModel
                                        {
                                            id = pm.ProjectID,
                                            color = pm.ProjectColor,
                                            name = pm.ProjectName,
                                            reviewDate = pm.ReviewDate.ToString()
                                        }).ToList();                   

                }
                else
                {
                    userProjects = db.ProjectMasters
                    .Where(a => a.IsActive == true)
                    .Select(a => new ProjectReviewModel
                    {
                        id = a.ProjectID,
                        color = a.ProjectColor,
                        name = a.ProjectName,
                        reviewDate = a.ReviewDate.ToString()
                    }).ToList();
                }
                if (userProjects.Count > 0 && userProjects != null)
                {
                    foreach (var item in userProjects)
                    {
                        userProjectList.Add(item);
                    }
                }
            }

            foreach (var project in userProjectList)
            {
                DateTime revDate = DateTime.Parse(project.reviewDate);
                project.reviewDate = revDate.ToString("MM/dd/yyyy");
            }

            return userProjectList;
        }


        public static List<ProjectUploadModel> GetUploadedData(int userId)
        {
            List<ProjectUploadModel> userProjectList = new List<ProjectUploadModel>();
            using (var db = new QRMEntities())
            {
                var role = (from p in db.UserDetails
                            join r in db.RoleMasters on p.RoleId equals r.RoleId
                            where r.IsActive == "Y" && p.UserId == userId
                            select r.RoleName).ToList().FirstOrDefault();
                List<ProjectUploadModel> userProjects = new List<ProjectUploadModel>();
                if (role.ToString() != "SuperUser")
                {

                    userProjects = (from pm in db.UploadDetails
                                    join od in db.UserProjectAssociations on pm.ProjectId equals od.ProjectId    
                                    join pr in db.ProjectMasters on pm.ProjectId equals pr.ProjectID
                                    join rl in db.ProjectReleaseMasters on pm.ReleaseId equals rl.ProjectReleaseId
                                    join mn in db.MonthMasters on pm.MonthId equals mn.MonthId
                                    where od.UserId == userId && pr.IsActive== true
                                    select new ProjectUploadModel
                                    {
                                        Project = pr.ProjectName,
                                        Release = rl.ReleaseName,
                                        Month = mn.MonthName

                                        
                                    }).ToList();

                }
                else
                {
                    userProjects =(from pm in db.UploadDetails
                           join pr in db.ProjectMasters on pm.ProjectId equals pr.ProjectID
                                   join rl in db.ProjectReleaseMasters on pm.ReleaseId equals rl.ProjectReleaseId
                                   join mn in db.MonthMasters on pm.MonthId equals mn.MonthId
                                   where  pr.IsActive == true
                                  select new ProjectUploadModel
                                  {
                                      Project = pr.ProjectName,
                                      Release = rl.ReleaseName,
                                      Month = mn.MonthName
                                  }).ToList();
                }




                if (userProjects.Count > 0 && userProjects != null)
                {
                    foreach (var item in userProjects)
                    {
                        
                        userProjectList.Add(item);
                    }
                }
            }

            

            return userProjectList;
        }
    }
}
