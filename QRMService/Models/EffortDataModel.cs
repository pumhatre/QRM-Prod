using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class EffortDataModel
    {
        public decimal? ActualEffort { get; set; }
        public DateTime? ActualEndDate { get; set; }
        public DateTime? ActualStartDate { get; set; }
        public decimal? BaselinedEffort { get; set; }
        public string CMMIRollUp { get; set; }
        public string Complexity { get; set; }
        public string ComponentName { get; set; }
        public string ComponentType { get; set; }
        public string Module { get; set; }
        public int MonthId { get; set; }
        public string ObjectComponentID { get; set; }
        public string ProjectID { get; set; }
        public int ProjectId { get; set; }
        public int ProjectReleaseId { get; set; }
        public string Release { get; set; }
        public string Remarks { get; set; }
        public string ReviewType { get; set; }
        public string SEQ { get; set; }
        public DateTime? ScheduledEndDate { get; set; }
        public DateTime? ScheduledStartDate { get; set; }
        public string Status { get; set; }
        public string TaskType { get; set; }
        public string WidgetType { get; set; }
    }
}