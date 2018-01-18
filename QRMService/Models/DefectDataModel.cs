using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class DefectDataModel
    {
        public string DefectID { get; set; }
        public string WidgetComponentID { get; set; }
        public string DetectedStage { get; set; }
        public DateTime? ReportedDate { get; set; }
        public string ReportedBy { get; set; }
        public string DefectDescription { get; set; }
        public string Status { get; set; }
        public string DefectInfectedStage { get; set; }
        public string ExpectedDetectionPhase { get; set; }
        public string DefectType { get; set; }
        public string Cause { get; set; }
        public string ReviewType { get; set; }
        public string DefectSeverity { get; set; }
        public DateTime? FixedOnDate { get; set; }
        public string Remarks { get; set; }
        public int ProjectId { get; set; }
        public int ProjectReleaseId { get; set; }
        public int MonthId { get; set; }

        public int DefectDataStagingId { get; set; }

        //Data Sanity Validation Properties
        public bool? IsValidDefectDetectedStage { get; set; }
        public bool? IsValidDefectStatus { get; set; }
        public bool? IsValidDefectInjectedStage { get; set; }
        public bool? IsValidExpectedDetectionPhase { get; set; }
        public bool? IsValidDefectType { get; set; }
        public bool? IsValidDefectCause { get; set; }
        public bool? IsValidDefectSeverity { get; set; }
        public bool? IsValidReviewType { get; set; }
    }    
}        
        