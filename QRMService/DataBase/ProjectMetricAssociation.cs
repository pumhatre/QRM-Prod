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
    
    public partial class ProjectMetricAssociation
    {
        public int ProjectMetricAssociationID { get; set; }
        public int MetricMasterID { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<int> MonthId { get; set; }
        public int ProjectId { get; set; }
        public int ReleaseId { get; set; }
    
        public virtual MetricMaster MetricMaster { get; set; }
        public virtual MonthMaster MonthMaster { get; set; }
        public virtual ProjectReleaseMaster ProjectReleaseMaster { get; set; }
        public virtual ProjectMaster ProjectMaster { get; set; }
    }
}
