using QRMService.DataBase;
using QRMService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Repositories
{
    public class MySavedReportRepository
    {
        /// <summary>
        /// Saves the report.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <param name="projectId">The project identifier.</param>
        /// <param name="releaseId">The release identifier.</param>
        /// <param name="reportType">Type of the report.</param>
        /// <param name="reportName">Name of the report.</param>
        /// <returns></returns>
        public static bool SaveReport(int userId, int projectId, int releaseId, string reportType, string reportName)
        {
            using (var db = new QRMEntities())
            {
                var data = new UserReportAssociation { UserId = userId, ProjectId = projectId, ProjectReleaseID = releaseId, ReportType = reportType, ReportName = reportName, IsActive=true };
                db.UserReportAssociations.Add(data);
                db.SaveChanges();
                return true;
            }
        }

        /// <summary>
        /// Gets my saved reports.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns></returns>
        public static List<MySavedReportsResponseModel> GetMySavedReports(int userId)
        {
            using (var db = new QRMEntities())
            {
                var data = (from r in db.UserReportAssociations
                            join p in db.ProjectMasters on r.ProjectId equals p.ProjectID
                            join rl in db.ProjectReleaseMasters on r.ProjectReleaseID equals rl.ProjectReleaseId
                            where r.UserId == userId && r.IsActive == true
                            select new MySavedReportsResponseModel
                            {
                                ProjectId = r.ProjectId,
                                Project = p.ProjectName,
                                ProjectReleaseID = r.ProjectReleaseID,
                                Release = rl.ReleaseName,
                                ReportName = r.ReportName,
                                ReportType = r.ReportType,
                                UserId = r.UserId,
                                UserReportAssociationID = r.UserReportAssociationID
                            }).ToList();
                return data;
            }
        }

        /// <summary>
        /// Deletes my saved report.
        /// </summary>
        /// <param name="reportId">The report identifier.</param>
        /// <returns></returns>
        public static bool DeleteMySavedReport(int reportId)
        {
            using (var db = new QRMEntities())
            {
                var data = db.UserReportAssociations.Where(a=>a.UserReportAssociationID==reportId).FirstOrDefault();
                if (data != null)
                {
                    data.IsActive = false;
                    db.Entry(data).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                    return true;
                }
                return false;
            }
        }
    }
}