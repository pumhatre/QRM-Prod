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
    
    public partial class TestingDataStaging
    {
        public int TestingDataStagingId { get; set; }
        public string TestingPhase { get; set; }
        public string TestingType { get; set; }
        public string Module { get; set; }
        public string Release { get; set; }
        public Nullable<int> PlannedNoOfTestCasesDesigned { get; set; }
        public Nullable<int> ActualNumberOfTestCasesDesigned { get; set; }
        public Nullable<int> NoOfTestCasesReviewComments { get; set; }
        public Nullable<System.DateTime> PlannedStartDate { get; set; }
        public Nullable<System.DateTime> PlannedEndDate { get; set; }
        public Nullable<System.DateTime> ActualStartDate { get; set; }
        public Nullable<System.DateTime> ActualEndDate { get; set; }
        public string TestDesignStatus { get; set; }
        public Nullable<decimal> TestCasePreparationPlanned { get; set; }
        public Nullable<decimal> TestCaseReviewPlanned { get; set; }
        public Nullable<decimal> TestCaseReworkPlanned { get; set; }
        public Nullable<decimal> TestCasePreparationActual { get; set; }
        public Nullable<decimal> TestCaseReviewActual { get; set; }
        public Nullable<decimal> TestCaseReworkActual { get; set; }
        public Nullable<int> TestCasedPlannedForExecution { get; set; }
        public Nullable<decimal> PlannedEffortforExecution { get; set; }
        public string ExecutionStatus { get; set; }
        public Nullable<int> TestCasesExecuted { get; set; }
        public Nullable<decimal> ActualEffortForExecution { get; set; }
        public Nullable<int> TotalCasesPassed { get; set; }
        public Nullable<int> DefectsFound { get; set; }
        public Nullable<int> DefectsRejected { get; set; }
        public int ProjectId { get; set; }
        public Nullable<int> ProjectReleaseId { get; set; }
        public Nullable<int> MonthId { get; set; }
        public string Iteration { get; set; }
        public string TestingSubphase { get; set; }
        public Nullable<int> SimpleTestCasesDesign { get; set; }
        public Nullable<int> MediumTestCasesDesign { get; set; }
        public Nullable<int> ComplexTestCasesDesign { get; set; }
        public Nullable<int> VeryComplexTestCasesDesign { get; set; }
        public Nullable<int> SimpleTestCasesExecution { get; set; }
        public Nullable<int> MediumTestCasesExecution { get; set; }
        public Nullable<int> ComplexTestCasesExecution { get; set; }
        public Nullable<int> VeryComplexTestCasesExecution { get; set; }
    
        public virtual MonthMaster MonthMaster { get; set; }
        public virtual ProjectMaster ProjectMaster { get; set; }
        public virtual ProjectReleaseMaster ProjectReleaseMaster { get; set; }
    }
}
