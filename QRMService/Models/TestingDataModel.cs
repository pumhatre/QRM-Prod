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
        public string PlannedNoOfTestCasesDesigned { get; set; }
        public string ActualNumberOfTestCasesDesigned { get; set; }
        public string NoOfTestCasesReviewComments { get; set; }
        public string PlannedStartDate { get; set; }
        public string PlannedEndDate { get; set; }
        public string ActualStartDate { get; set; }
        public string ActualEndDate { get; set; }
        public string TestDesignStatus { get; set; }
        public string ManualExecutionOrAutomated { get; set; }
        public string TestCasePreparationPlanned { get; set; }
        public string TestCaseReviewPlanned { get; set; }
        public string TestCaseReworkPlanned { get; set; }
        public string TestCasePreparationActual { get; set; }
        public string TestCaseReviewActual { get; set; }
        public string TestCaseReworkActual { get; set; }
        public string TestCasedPlannedForExecution { get; set; }
        public string PlannedEffortforExecution { get; set; }
        public string ExecutionStatus { get; set; }
        public string TestCasesExecuted { get; set; }
        public string ActualEffortForExecution { get; set; }
        public string TotalCasesPassed { get; set; }
        public string DefectsFound { get; set; }
        public string DefectsRejected { get; set; }
        public string TestDesignProductivity { get; set; }
        public string TestExectionProductivity { get; set; }
        public string DefectRejectionPer { get; set; }
        public string MonthTestCaseCreationEndDate { get; set; }
        public int ProjectId { get; set; }
        public int ProjectReleaseId { get; set; }
        public int MonthId { get; set; }
    }
}