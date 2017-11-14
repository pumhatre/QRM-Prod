using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class EffortDataModel
    {
        public string ObjectComponentID { get; set; }
        public string ComponentType { get; set; }
        public string WidgetType { get; set; }
        public string Complexity { get; set; }
        public string TaskType { get; set; }
        public string BaselinedEffort { get; set; }
        public string ActualEffort { get; set; }
        public string Status { get; set; }
        public string CMMIRollUp { get; set; }
        public string SEQ { get; set; }
        public string ScheduledStartDate { get; set; }
        public string ScheduledEndDate { get; set; }
        public string ActualStartDate { get; set; }
        public string ActualEndDate { get; set; }
        public string ProjectID { get; set; }
        public string Release { get; set; }
        public string Module { get; set; }
        public string ComponentName { get; set; }
        public string ReviewType { get; set; }
        public string Remarks { get; set; }
        public int ProjectId { get; set; }
        public int ProjectReleaseId { get; set; }
        public int MonthId { get; set; }
    }
}