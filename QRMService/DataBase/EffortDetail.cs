//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace QRMService.DataBase
{
    using System;
    using System.Collections.Generic;
    
    public partial class EffortDetail
    {
        public int EffortId { get; set; }
        public Nullable<int> ComponentId { get; set; }
        public string ComponentTypeCode { get; set; }
        public string ComplexityCode { get; set; }
        public string TaskTypeCode { get; set; }
        public Nullable<int> BaselineEffort { get; set; }
        public Nullable<int> ActualEffort { get; set; }
        public string StatusCode { get; set; }
        public string CMMIRollUpCode { get; set; }
        public string SEQ { get; set; }
        public Nullable<System.DateTime> ScheduledStartDate { get; set; }
        public Nullable<System.DateTime> ScheduledEndDate { get; set; }
        public Nullable<System.DateTime> ActualStartDate { get; set; }
        public Nullable<System.DateTime> ActualEndDate { get; set; }
        public Nullable<int> ProjectId { get; set; }
        public Nullable<int> ReleaseId { get; set; }
        public string ModuleName { get; set; }
        public string ComponentName { get; set; }
        public string ReviewTypeCode { get; set; }
        public string Remarks { get; set; }
        public int PeriodId { get; set; }
    
        public virtual Period Period { get; set; }
        public virtual ProjectMaster ProjectMaster { get; set; }
    }
}
