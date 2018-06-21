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
    
    public partial class TestingDetail
    {
        public int TestingDetailsID { get; set; }
        public string TestingPhaseCode { get; set; }
        public string TestingTypeCode { get; set; }
        public string ReleaseId { get; set; }
        public Nullable<int> PlannedNumberOfTestCasesDesigned { get; set; }
        public Nullable<int> ActualNumberOfTestCasesDesigned { get; set; }
        public Nullable<System.DateTime> PlannedStartDate { get; set; }
        public Nullable<System.DateTime> PlannedEndDate { get; set; }
        public Nullable<System.DateTime> ActualStartDate { get; set; }
        public Nullable<System.DateTime> ActualEndDate { get; set; }
        public string TestDesignStatusCode { get; set; }
        public string TestExecutionTypeCode { get; set; }
        public Nullable<double> TestCasePreparationPlannedEffort { get; set; }
        public Nullable<double> TestCaseReviewPlannedEffort { get; set; }
        public Nullable<double> TestCaseReworkPlannedEffort { get; set; }
        public Nullable<double> TestCasePreparationActualEffort { get; set; }
        public Nullable<double> TestCaseReviewActualEffort { get; set; }
        public Nullable<double> TestCaseReworkActualEffort { get; set; }
        public Nullable<int> NumberOfTestCasesPlannedForExecution { get; set; }
        public Nullable<int> PlannedEffortForTestCaseExecution { get; set; }
        public string ExecutionStatusCode { get; set; }
        public Nullable<int> NumberOfTestCasesExecuted { get; set; }
        public Nullable<double> ActualEffortForTestCasesExecution { get; set; }
        public Nullable<int> TotalTestCasesPassed { get; set; }
        public Nullable<int> TotalDefectsFound { get; set; }
        public Nullable<int> TotalDefectsRejected { get; set; }
        public int ProjectId { get; set; }
        public Nullable<int> ProjectReleaseId { get; set; }
        public Nullable<int> MonthId { get; set; }
        public Nullable<int> SimpleTestCasesDesign { get; set; }
        public Nullable<int> MediumTestCasesDesign { get; set; }
        public Nullable<int> ComplexTestCasesDesign { get; set; }
        public Nullable<int> VeryComplexTestCasesDesign { get; set; }
        public Nullable<int> SimpleTestCasesExecution { get; set; }
        public Nullable<int> MediumTestCasesExecution { get; set; }
        public Nullable<int> ComplexTestCasesExecution { get; set; }
        public Nullable<int> VeryComplexTestCasesExecution { get; set; }
        public Nullable<int> NoofTestCases { get; set; }
        public string Iteration { get; set; }
        public string TestingSubphase { get; set; }
        public Nullable<int> NormalizedTestCasesExecution { get; set; }
        public Nullable<System.DateTime> PlannedStartDateExecution { get; set; }
        public Nullable<System.DateTime> PlannedEndDateExecution { get; set; }
        public Nullable<System.DateTime> ActualStartDateExecution { get; set; }
        public Nullable<System.DateTime> ActualEndDateExecution { get; set; }
        public string ManualOrAutomatedExecution { get; set; }
        public Nullable<int> NormalizedTestCasesDesign { get; set; }
        public string Module { get; set; }
    
        public virtual MonthMaster MonthMaster { get; set; }
        public virtual ProjectReleaseMaster ProjectReleaseMaster { get; set; }
        public virtual ProjectMaster ProjectMaster { get; set; }
    }
}
