using QRMService.DataBase;
using QRMService.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace QRMService.Repositories
{
    public class ProjectReleaseRepository
    {
        /// <summary>
        /// Gets the project releases by project identifier.
        /// </summary>
        /// <param name="ProjectId">The project identifier.</param>
        /// <returns></returns>
        public static List<ProjectReleaseModel> GetProjectReleasesByProjectId(int ProjectId)
        {
            using (var db = new QRMEntities())
            {
                var projectReleases = (from pr in db.ProjectReleaseMasters
                                       join p in db.ProjectMasters on pr.ProjectID equals p.ProjectID
                                       where pr.ProjectID== ProjectId && pr.IsActive==true && p.IsActive==true
                                       select new ProjectReleaseModel
                                       {
                                           ProjectReleaseId = pr.ProjectReleaseId,
                                           ProjectID = p.ProjectID,
                                           ProjectName = p.ProjectName,
                                           ReleaseName = pr.ReleaseName
                                       }).OrderBy(a => a.ProjectID).ToList();
                return projectReleases;
            }
        }

        /// <summary>
        /// Gets all project releases.
        /// </summary>
        /// <returns></returns>
        public static List<ProjectReleaseModel> GetAllProjectReleases()
        {
            using (var db = new QRMEntities())
            {
                var projectReleases = (from pr in db.ProjectReleaseMasters
                                       join p in db.ProjectMasters on pr.ProjectID equals p.ProjectID
                                       where pr.IsActive == true && p.IsActive == true
                                       select new ProjectReleaseModel
                                       {
                                           ProjectReleaseId = pr.ProjectReleaseId,
                                           ProjectID = p.ProjectID,
                                           ProjectName = p.ProjectName,
                                           ReleaseName = pr.ReleaseName
                                       }).OrderBy(a=>a.ProjectName).ToList();
                return projectReleases;
            }
        }

        /// <summary>
        /// Inserts the project release.
        /// </summary>
        /// <param name="projectId">The project identifier.</param>
        /// <param name="releaseName">Name of the release.</param>
        /// <returns></returns>
        public static ProjectReleasesResponseModel InsertProjectRelease(int projectId, string releaseName)
        {
            var response = new ProjectReleasesResponseModel();
            using (var db = new QRMEntities())
            {
                var projectRelease = db.ProjectReleaseMasters.Where(a => a.ProjectID == projectId && a.ReleaseName.ToLower().Trim() == releaseName.ToLower().Trim()).FirstOrDefault();
                if (projectRelease == null)
                {
                    var release = new ProjectReleaseMaster
                    {
                        ProjectID = projectId,
                        ReleaseName = releaseName,
                        IsActive=true
                    };
                    db.ProjectReleaseMasters.Add(release);
                    db.SaveChanges();
                    response.IsSuccess = true;
                    response.ResponseMessage = "Project Release added successfully";
                }
                else
                {
                    response.ResponseMessage = "Release Name already exists.";
                }
                return response;
            }
        }

        /// <summary>
        /// Updates the project release.
        /// </summary>
        /// <param name="projectId">The project identifier.</param>
        /// <param name="releaseName">Name of the release.</param>
        /// <returns></returns>
        public static ProjectReleasesResponseModel UpdateProjectRelease(int projectReleaseId, string releaseName)
        {
            var response = new ProjectReleasesResponseModel();
            using (var db = new QRMEntities())
            {
                var projectRelease = db.ProjectReleaseMasters.Where(a => a.ProjectReleaseId == projectReleaseId).FirstOrDefault();
                if (projectRelease != null)
                {
                    projectRelease.ReleaseName = releaseName.Trim();
                    db.Entry(projectRelease).State = EntityState.Modified;
                    db.SaveChanges();

                    response.IsSuccess = true;
                    response.ResponseMessage = "Project Release updated successfully";
                }
                else
                {
                    response.ResponseMessage = "Project Release does not exist.";
                }
                return response;
            }
        }

        /// <summary>
        /// Deletes the project release.
        /// </summary>
        /// <param name="projectReleaseId">The project release identifier.</param>
        /// <returns></returns>
        public static ProjectReleasesResponseModel DeleteProjectRelease(int projectReleaseId)
        {
            var response = new ProjectReleasesResponseModel();
            using (var db = new QRMEntities())
            {
                var projectRelease = db.ProjectReleaseMasters.Where(a => a.ProjectReleaseId == projectReleaseId).FirstOrDefault();
                if (projectRelease != null)
                {
                    projectRelease.IsActive = false;
                    db.Entry(projectRelease).State = EntityState.Modified;
                    db.SaveChanges();

                    response.IsSuccess = true;
                    response.ResponseMessage = "Project Release deleted successfully.";
                }
                else
                {
                    response.ResponseMessage = "Project Release does not exist.";
                }
                return response;
            }
        }
    }
}