using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class DefectDataStagingModel
    {
        public int DefectDataStagingId { get; set; }
        public string DefectID { get; set; }
        public string WidgetComponentID { get; set; }
        public string DetectedStage { get; set; }
        public DateTime? ReportedDate { get; set; }
        public String ReportedBy { get; set; }
        public string DefectDescription { get; set; }
        public string status { get; set; }
        public string DefectInfectedStage { get; set; }
        public string ExpectedDetectionPhase { get; set; }
        public string DefectType { get; set; }
        public string Cause { get; set; }
        public string ReviewType { get; set; }
        public string DefectSeverity { get; set; }
        public DateTime? FixedOnDate { get; set; }
        public string Remarks { get; set; }




    }
}