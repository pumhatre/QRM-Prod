﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class QRMEntities : DbContext
    {
        public QRMEntities()
            : base("name=QRMEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<DefectDataDetail> DefectDataDetails { get; set; }
        public virtual DbSet<MetricMaster> MetricMasters { get; set; }
        public virtual DbSet<MonthMaster> MonthMasters { get; set; }
        public virtual DbSet<ReferenceTable> ReferenceTables { get; set; }
        public virtual DbSet<RoleMaster> RoleMasters { get; set; }
        public virtual DbSet<TestingDataStaging> TestingDataStagings { get; set; }
        public virtual DbSet<TestingDetail> TestingDetails { get; set; }
        public virtual DbSet<UserDetail> UserDetails { get; set; }
        public virtual DbSet<UserProjectRoleAssociation> UserProjectRoleAssociations { get; set; }
        public virtual DbSet<DevMetric> DevMetrics { get; set; }
        public virtual DbSet<EffortDetail> EffortDetails { get; set; }
        public virtual DbSet<Period> Periods { get; set; }
        public virtual DbSet<ProjectWidgetDetail> ProjectWidgetDetails { get; set; }
        public virtual DbSet<ProjectMetricAssociation> ProjectMetricAssociations { get; set; }
        public virtual DbSet<PreferredReportMetricsAssociation> PreferredReportMetricsAssociations { get; set; }
        public virtual DbSet<UserReportAssociation> UserReportAssociations { get; set; }
        public virtual DbSet<ProjectMaster> ProjectMasters { get; set; }
        public virtual DbSet<ProjectReleaseMaster> ProjectReleaseMasters { get; set; }
        public virtual DbSet<DefectDataStaging> DefectDataStagings { get; set; }
        public virtual DbSet<EffortDataStaging> EffortDataStagings { get; set; }
    }
}
