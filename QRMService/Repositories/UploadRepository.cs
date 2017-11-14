using QRMService.DataBase;
using QRMService.Models;
using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;

namespace QRMService.Repositories
{
    public class UploadRepository
    {
        public static UploadViewModel SaveExcelData(UploadViewModel upload)
        {
             SaveDefectDataModel(upload.DefectData);
             return upload;
        }

        private static EffortDataModel SaveEffortDataModel(List<EffortDataModel> domainModel) {
            using (var db = new QRMEntities())
            {
                //int lastRoleId = db.EffortDataStagings.Count() == 0 ? 0 : db.EffortDataStagings.Max(x => x.RoleId);
                //foreach (var r in roles)
                //{
                //    db.EffortDataStagings.Add();
                //}
                //db.SaveChanges();
            }
            return null;
        }

        private static DefectDataModel SaveDefectDataModel(List<DefectDataModel> domainModel)
        {
            using (var db = new QRMEntities())
            {
                int lastDefectDataStagingId = db.DefectDataStagings.Count() == 0 ? 0 : db.DefectDataStagings.Max(x => x.DefectDataStagingId);
                List<DefectDataStaging> obj = domainModel.Select(x => new DefectDataStaging
                {
                    DefectDataStagingId= db.DefectDataStagings.Count() == 0 ? 0 : db.DefectDataStagings.Max(y => y.DefectDataStagingId),
                    DefectID = x.DefectID,
                    DefectDescription = x.DefectDescription,
                    Cause = x.Cause,
                    DefectInfectedStage =x.DefectInfectedStage,
                    DefectSeverity=x.DefectSeverity,
                    DefectType=x.DefectType,
                    DetectedStage=x.DetectedStage,
                    ExpectedDetectionPhase=x.ExpectedDetectionPhase,
                    ProjectId=x.ProjectId,
                    ProjectReleaseId=x.ProjectReleaseId,
                    MonthId=x.MonthId,
                    PeriodId= 2
                }).ToList();
                db.DefectDataStagings.AddRange(obj);
                db.SaveChanges();
            }
            return null;
        }
    }
}