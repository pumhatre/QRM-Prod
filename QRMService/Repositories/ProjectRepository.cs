﻿using QRMService.DataBase;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using QRMService.Models;
using System.Data.Entity;
using System;
using QRMService.Common;

namespace QRMService.Repositories
{
    public class ProjectRepository
    {
        /// <summary>
        /// Gets the projects list.
        /// </summary>
        /// <returns></returns>
        public static List<SelectListItem> GetProjectsList(int UserId)
        {
            List<SelectListItem> userProjectList = new List<SelectListItem>();
            using (var db = new QRMEntities())
            {
                var role = (from p in db.UserDetails
                            join r in db.RoleMasters on p.RoleId equals r.RoleId where r.IsActive == "Y" && p.UserId == UserId
                            select r.RoleName).ToList().FirstOrDefault();
                List<SelectListItem> userProjects= new List<SelectListItem>();
                if (role.ToString() != "SuperUser")
                {

                     userProjects = (from pm in db.ProjectMasters
                                        join od in db.UserProjectAssociations on pm.ProjectID equals od.ProjectId
                                        where od.UserId == UserId && pm.IsActive == true
                                        select new SelectListItem
                                        {
                                            Text = pm.ProjectName,
                                            Value = pm.ProjectID.ToString(),
                                        }).ToList();
                }
                else
                {
                    userProjects = db.ProjectMasters
                    .Where(a => a.IsActive == true)
                    .Select(a => new SelectListItem
                    {
                        Text = a.ProjectName,
                        Value = a.ProjectID.ToString()
                    }).OrderBy(b => b.Text).ToList();
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

        /// <summary>
        /// Gets the projects master list.
        /// </summary>
        /// <returns></returns>
        public static List<ProjectMasterModel> GetProjectsMasterList()
        {
            using (var db = new QRMEntities())
            {
                var projects = db.ProjectMasters.Where(x => x.IsActive == true).Select(a => new ProjectMasterModel()
                {
                    ProjectID = a.ProjectID,
                    ProjectName = a.ProjectName,
                    ServiceLineCode = a.ServiceLine,
                    Capability = a.Capability,
                    ProjectManager = a.ProjectManager,
                    ClientName = a.ClientName,
                    GDM = a.GDM,
                    TechnologyCode = a.Technology,
                    IndustryCode = a.Industry,
                    LifeCycle = a.LifeCycle,
                    Solution = a.Solution,
                    Director = a.Director,
                    SeniorManager = a.SeniorManager,
                    QualityController = a.QualityController,
                    ReviewDate = a.ReviewDate
                }).ToList();

                var refData = db.ReferenceTables.Where(a => a.ReferenceTableName == Constants.ServiceLineTableName ||
                  a.ReferenceTableName == Constants.TechnologyTableName ||
                  a.ReferenceTableName == Constants.IndustryTableName).ToList();

                foreach (var project in projects)
                {
                    var serviceLine = refData.Where(a => a.ReferenceTableName == Constants.ServiceLineTableName &&
                        a.ReferenceCode == project.ServiceLineCode).FirstOrDefault();
                    if (serviceLine != null)
                    {
                        project.ServiceLine = serviceLine.ReferenceValue;
                    }
                    var technology = refData.Where(a => a.ReferenceTableName == Constants.TechnologyTableName &&
                      a.ReferenceCode == project.TechnologyCode).FirstOrDefault();
                    if (technology != null)
                    {
                        project.Technology = technology.ReferenceValue;
                    }
                    var industry = refData.Where(a => a.ReferenceTableName == Constants.IndustryTableName &&
                     a.ReferenceCode == project.IndustryCode).FirstOrDefault();
                    if (industry != null)
                    {
                        project.Industry = industry.ReferenceValue;
                    }
                }

                return projects;
            }

        }

        /// <summary>
        /// Updates the project release.
        /// </summary>
        /// <param name="projectMaster">The project master.</param>
        /// <returns></returns>
        public static ProjectReleasesResponseModel UpdateProjectRelease(ProjectMasterModel projectMaster)
        {
            var response = new ProjectReleasesResponseModel();
            using (var db = new QRMEntities())
            {
                if (projectMaster.ProjectID == 0)
                {
                    var random = new Random();
                    var color = String.Format("#{0:X6}", random.Next(0x1000000)); // = "#A197B9"

                    var project = new ProjectMaster
                    {
                        ProjectID = projectMaster.ProjectID,
                        ProjectName = projectMaster.ProjectName,
                        ServiceLine = projectMaster.ServiceLineCode,
                        Capability = projectMaster.Capability,
                        ProjectManager = projectMaster.ProjectManager,
                        ClientName = projectMaster.ClientName,
                        GDM = projectMaster.GDM,
                        Technology = projectMaster.TechnologyCode,
                        Industry = projectMaster.IndustryCode,
                        LifeCycle = projectMaster.LifeCycle,
                        Solution = projectMaster.Solution,
                        Director = projectMaster.Director,
                        SeniorManager = projectMaster.SeniorManager,
                        QualityController = projectMaster.QualityController,
                        ReviewDate = projectMaster.ReviewDate.Value.ToLocalTime(),
                        ProjectColor = color,
                        IsActive = true
                    };

                    db.ProjectMasters.Add(project);
                    db.SaveChanges();
                    response.IsSuccess = true;
                    response.ResponseMessage = "Project added successfully";
                }
                else
                {

                    ProjectMaster project = db.ProjectMasters.Find(projectMaster.ProjectID);
                    project.ProjectName = projectMaster.ProjectName;
                    project.ServiceLine = projectMaster.ServiceLineCode;
                    project.Capability = projectMaster.Capability;
                    project.ProjectManager = projectMaster.ProjectManager;
                    project.ClientName = projectMaster.ClientName;
                    project.GDM = projectMaster.GDM;
                    project.Technology = projectMaster.TechnologyCode;
                    project.Industry = projectMaster.IndustryCode;
                    project.LifeCycle = projectMaster.LifeCycle;
                    project.Solution = projectMaster.Solution;
                    project.Director = projectMaster.Director;
                    project.SeniorManager = projectMaster.SeniorManager;
                    project.QualityController = projectMaster.QualityController;
                    project.ReviewDate = projectMaster.ReviewDate.Value.ToLocalTime();
                    db.Entry(project).State = EntityState.Modified;
                    db.SaveChanges();
                    response.IsSuccess = true;
                    response.ResponseMessage = "Project updated successfully";

                }


                return response;
            }
        }

        /// <summary>
        /// Gets the project details.
        /// </summary>
        /// <param name="projectID">The project identifier.</param>
        /// <returns></returns>
        public static ProjectMaster GetProjectDetails(int projectID)
        {
            using (var db = new QRMEntities())
            {
                return db.ProjectMasters.Where(a => a.ProjectID == projectID).FirstOrDefault();
            }

        }

        /// <summary>
        /// Deletes the project.
        /// </summary>
        /// <param name="projectID">The project identifier.</param>
        /// <returns></returns>
        public static ProjectReleasesResponseModel DeleteProject(int projectID)
        {
            var response = new ProjectReleasesResponseModel();
            using (var db = new QRMEntities())
            {
                var project = db.ProjectMasters.Where(a => a.ProjectID == projectID).FirstOrDefault();
                project.IsActive = false;
                db.Entry(project).State = EntityState.Modified;
                db.SaveChanges();
                response.IsSuccess = true;
            }
            return response;
        }
    }
}