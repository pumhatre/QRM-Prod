//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace QRMService.DataModels
{
    using System;
    using System.Collections.Generic;
    
    public partial class EffortDataStaging
    {
        public string ObjectComponentID { get; set; }
        public string ComponentType { get; set; }
        public string WidgetType { get; set; }
        public string Complexity { get; set; }
        public string TaskType { get; set; }
        public Nullable<decimal> BaselinedEffort { get; set; }
        public Nullable<decimal> ActualEffort { get; set; }
        public string Status { get; set; }
        public string CMMIRollUp { get; set; }
        public string SEQ { get; set; }
        public Nullable<System.DateTime> ScheduledStartDate { get; set; }
        public Nullable<System.DateTime> ScheduledEndDate { get; set; }
        public Nullable<System.DateTime> ActualStartDate { get; set; }
        public Nullable<System.DateTime> ActualEndDate { get; set; }
        public int ProjectID { get; set; }
        public string Release { get; set; }
        public string Module { get; set; }
        public string ComponentName { get; set; }
        public byte[] ReviewType { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> ProjectReleaseId { get; set; }
        public Nullable<int> MonthId { get; set; }
    
        public virtual MonthMaster MonthMaster { get; set; }
        public virtual ProjectMaster ProjectMaster { get; set; }
        public virtual ProjectReleaseMaster ProjectReleaseMaster { get; set; }
    }
}
