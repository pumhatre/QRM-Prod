using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class EffortSanityValidationModel
    {
        public int EffortDataStagingId { get; set; }
        public string ObjectComponentID { get; set; }
        public string TaskType { get; set; }
        public string Status { get; set; }
        public string ComponentType { get; set; }
        public string WidgetType { get; set; }
        public string Complexity { get; set; }
        public string CMMIRollUp { get; set; }



        //Data Sanity Validation Properties
        public bool IsValidTaskType { get; set; }
        public bool IsValidStatus { get; set; }
        public bool IsValidComponentType { get; set; }
        public bool IsValidWidgetType { get; set; }
        public bool IsValidComplexity { get; set; }
        public bool IsValidCMMIRollup { get; set; }
        public bool IsValidReviewType { get; set; }
    }
}