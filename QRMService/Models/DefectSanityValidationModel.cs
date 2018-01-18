using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class DefectSanityValidationModel
    {
        public int DefectDataStagingId { get; set; }

        //Data Sanity Validation Properties
        public bool IsValidDefectDetectedStage { get; set; }
        public bool IsValidDefectStatus { get; set; }
        public bool IsValidDefectInjectedStage { get; set; }
        public bool IsValidExpectedDetectionPhase { get; set; }
        public bool IsValidDefectType { get; set; }
        public bool IsValidDefectCause { get; set; }
        public bool IsValidDefectSeverity { get; set; }
        public bool IsValidReviewType { get; set; }
    }
}