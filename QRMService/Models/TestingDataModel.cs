using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class TestingDataModel
    {
        public string TestingPhase { get; set; }
        public string TestingType { get; set; }
        public string Module { get; set; }
        public string Release { get; set; }
        public int PlannedNoOfTestCasesDesigned { get; set; }
        public int ActualNumberOfTestCasesDesigned { get; set; }
        public int? NoOfTestCasesReviewComments { get; set; }
        public DateTime? PlannedStartDate { get; set; }
        public DateTime? PlannedEndDate { get; set; }
        public DateTime? ActualStartDate { get; set; }
        public DateTime? ActualEndDate { get; set; }
        public string TestDesignStatus { get; set; }
        public string ManualExecutionOrAutomated { get; set; }
        public decimal? TestCasePreparationPlanned { get; set; }
        public decimal? TestCaseReviewPlanned { get; set; }
        public decimal? TestCaseReworkPlanned { get; set; }
        public decimal? TestCasePreparationActual { get; set; }
        public decimal? TestCaseReviewActual { get; set; }
        public decimal? TestCaseReworkActual { get; set; }
        public int? TestCasedPlannedForExecution { get; set; }
        public int PlannedEffortforExecution { get; set; }
        public string ExecutionStatus { get; set; }
        public int TestCasesExecuted { get; set; }
        public int ActualEffortForExecution { get; set; }
        public int TotalCasesPassed { get; set; }
        public int DefectsFound { get; set; }
        public int DefectsRejected { get; set; }
        public double TestDesignProductivity { get; set; }
        public double TestExectionProductivity { get; set; }
        public double DefectRejectionPer { get; set; }
        public string MonthTestCaseCreationEndDate { get; set; }
        public int ProjectId { get; set; }
        public int ProjectReleaseId { get; set; }
        public int MonthId { get; set; }
    }
}