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
    
    public partial class ProjectReleaseMaster
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ProjectReleaseMaster()
        {
            this.DefectDataDetails = new HashSet<DefectDataDetail>();
            this.DefectDataStagings = new HashSet<DefectDataStaging>();
            this.DevMetrics = new HashSet<DevMetric>();
            this.EffortDataStagings = new HashSet<EffortDataStaging>();
            this.EffortDetails = new HashSet<EffortDetail>();
            this.TestingDataStagings = new HashSet<TestingDataStaging>();
            this.TestingDetails = new HashSet<TestingDetail>();
        }
    
        public int ProjectReleaseId { get; set; }
        public Nullable<int> ProjectID { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DefectDataDetail> DefectDataDetails { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DefectDataStaging> DefectDataStagings { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DevMetric> DevMetrics { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EffortDataStaging> EffortDataStagings { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EffortDetail> EffortDetails { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TestingDataStaging> TestingDataStagings { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TestingDetail> TestingDetails { get; set; }
    }
}
