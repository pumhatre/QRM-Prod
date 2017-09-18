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

        public static ProjectReleasesResponseModel UpdateProjectRelease(ProjectMasterModel projectMaster)
        {
            var response = new ProjectReleasesResponseModel();
            using (var db = new QRMEntities())
            {
                ProjectMaster project = db.ProjectMasters.Find(projectMaster.ProjectID);

                if (project == null)
                {
                    project = new ProjectMaster
                    {
                        ProjectID = projectMaster.ProjectID,
                        ProjectName = projectMaster.ProjectName,
                        ServiceLine = projectMaster.ServiceLine,
                        Capability = projectMaster.Capability,
                        ProjectManager = projectMaster.ProjectManager,
                        ClientName = projectMaster.ClientName,
                        StartDate = projectMaster.StartDate,
                        Enddate = projectMaster.EndDate,
                        GDM = projectMaster.GDM,

                        Technology = projectMaster.Technology,
                        Industry = projectMaster.Industry,
                        LifeCycle = projectMaster.LifeCycle,
                        Solution = projectMaster.Solution,
                        Director = projectMaster.Director,
                        SeniorManager = projectMaster.SeniorManager,
                        ProjectStartDate = projectMaster.ProjectStartDate,
                        ProjectEndDate = projectMaster.ProjectEndDate,
                    };

                    db.ProjectMasters.Add(project);
                    db.SaveChanges();
                    response.IsSuccess = true;
                    response.ResponseMessage = "Project added successfully";
                }
                else
                {
                    project = new ProjectMaster
                    {
                        ProjectID = projectMaster.ProjectID,
                        ProjectName = projectMaster.ProjectName,
                        ServiceLine = projectMaster.ServiceLine,
                        Capability = projectMaster.Capability,
                        ProjectManager = projectMaster.ProjectManager,
                        ClientName = projectMaster.ClientName,
                        StartDate = projectMaster.StartDate,
                        Enddate = projectMaster.EndDate,
                        GDM = projectMaster.GDM,

                        Technology = projectMaster.Technology,
                        Industry = projectMaster.Industry,
                        LifeCycle = projectMaster.LifeCycle,
                        Solution = projectMaster.Solution,
                        Director = projectMaster.Director,
                        SeniorManager = projectMaster.SeniorManager,
                        ProjectStartDate = projectMaster.ProjectStartDate,
                        ProjectEndDate = projectMaster.ProjectEndDate,
                    };

                    db.SaveChanges();
                    response.IsSuccess = true;
                    response.ResponseMessage = "Project updated successfully";

                }


                return response;
            }
        }

        public static ProjectMaster GetProjectDetails(int projectID)
        {
            using (var db = new QRMEntities())
            {
                return db.ProjectMasters.Where(a => a.ProjectID == projectID).FirstOrDefault();
            }

        }
        public static List<ProjectMasterModel> GetProjectsMasterList()
        {
            using (var db = new QRMEntities())
            {
                return db.ProjectMasters.Select(a => new ProjectMasterModel()
                {
                    ProjectID = a.ProjectID,
                    ProjectName = a.ProjectName,
                    ServiceLine = a.ServiceLine,
                    Capability = a.Capability,
                    ProjectManager = a.ProjectManager,
                    ClientName = a.ClientName,
                    StartDate = a.StartDate.HasValue ? a.StartDate.Value : new DateTime(),
                    EndDate = a.Enddate.HasValue ? a.Enddate.Value : new DateTime(),
                    GDM = a.GDM,
                    Technology = a.Technology,
                    Industry = a.Industry,
                    LifeCycle = a.LifeCycle,
                    Solution = a.Solution,
                    Director = a.Director,
                    SeniorManager = a.SeniorManager,
                    ProjectStartDate = a.ProjectStartDate.HasValue ? a.ProjectStartDate.Value : new DateTime(),
                    ProjectEndDate = a.ProjectEndDate.HasValue ? a.ProjectEndDate.Value : new DateTime()
                }).ToList();
            }

        }

        public static object DeleteProject(int projectID)
        {

            return 1;
        }
    }
}