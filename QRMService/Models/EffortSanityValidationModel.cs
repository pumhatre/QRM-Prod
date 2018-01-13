using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class EffortSanityValidationModel
    {
        public int EffortDataStagingId { get; set; }
        //Data Sanity Validation Properties
        public bool? IsValidTaskType { get; set; }
        public bool? IsValidStatus { get; set; }
        public bool? IsValidComponentType { get; set; }
        public bool? IsValidWidgetType { get; set; }
        public bool? IsValidComplexity { get; set; }
        public bool? IsValidCMMIRollup { get; set; }
        public bool? IsValidReviewType { get; set; }
    }
}