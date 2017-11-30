using QRMService.DataBase;
using QRMService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Repositories
{
    public class DefectStagingRepository
    {
        public static List<DefectDataStagingModel> GetDefectStagingData()
        {
            using (var db = new QRMEntities())
            {
                var defectStagingData = (from m in db.DefectDataStagings
                                         select new DefectDataStagingModel
                                         {
                                             DefectDataStagingId = m.DefectDataStagingId,
                                             DefectID = m.DefectID,
                                             WidgetComponentID = m.WidgetComponentID,
                                             DetectedStage = m.DetectedStage,
                                             ReportedDate = m.ReportedDate,
                                             ReportedBy = m.ReportedBy,
                                             DefectDescription = m.DefectDescription,
                                             status = m.Status,
                                             DefectInfectedStage = m.DefectInfectedStage,
                                             ExpectedDetectionPhase = m.ExpectedDetectionPhase,
                                             DefectType = m.DefectType,
                                             Cause = m.Cause,
                                             ReviewType = m.ReviewType,
                                             DefectSeverity = m.DefectSeverity,
                                             FixedOnDate = m.FixedOnDate,
                                             Remarks = m.Remarks

                                         }).ToList();
                return defectStagingData;
            }
        }
    }
}