app.service('uploadService', ['$http', 'config', function ($http, config) {
    this.UploadFile = function (files, saveData) {
        let webWorker = new Worker(config.baseUrl+'Assets/app/workers/uploadWorker.js');
        var message = {
            files: files,
            config: config,
            neededSheets: ["Effort Data", "Defect Data", "Testing Data"],
            neededSheetsMandatory:{
                "Effort Data": "ObjectComponentID",
                "Defect Data": "DefectID",
                "Testing Data": "TestingPhase"
            },
            sheetColumnsRendering: {
                "Testing Data": {
                    "N2": "Planned Test Case Preparation",
                    "O2": "Planned Test Case Review",
                    "P2": "Planned Test Case Rework",
                    "Q2": "Actual Test Case Preparation",
                    "R2": "Actual Test Case Review",
                    "S2": "Actual Test Case Rework"
                }
            },
            neededSheetsViewModels: {
                "Effort Data": {
                    "ObjectComponentID": "Object/ Component ID",
                    "ComponentType": "Component Type",
                    "WidgetType": "Object/ Widget Type",
                    "Complexity": "Complexity",
                    "TaskType": "Task Type",
                    "BaselinedEffort": "Baselined Effort(hrs)",
                    "ActualEffort": "Actual Effort",
                    "Status": "Status",
                    "CMMIRollUp": "CMMI Rollup",
                    "SEQ": "SEQ",
                    "ScheduledStartDate": "Scheduled Start Date",
                    "ScheduledEndDate": "Scheduled End Date",
                    "ActualStartDate": "Actual Start Date",
                    "ActualEndDate": "Actual End Date",
                    "ProjectID": "Project",
                    "Release": "Release",
                    "Module": "Module",
                    "ComponentName": "Object/ Component Name",
                    "ReviewType": "Review Type",
                    "Remarks": "Remarks"
                },
                "Defect Data": {
                    "DefectID": "Defect ID",
                    "WidgetComponentID": "Object/ Widget ID",
                    "DetectedStage": "Defect Detected Stage",
                    "ReportedDate": "Reported Date",
                    "ReportedBy": "Reported By",
                    "DefectDescription": "Defect Description",
                    "Status": "Status",
                    "DefectInfectedStage": "Defect Injected Stage",
                    "ExpectedDetectionPhase": "Expected Detection Phase",
                    "DefectType": "Defect Type",
                    "Cause": "Cause",
                    "ReviewType": "Review Type",
                    "DefectSeverity": "Defect Severity",
                    "FixedOnDate": "Fixed On Date",
                    "Remarks": "Remarks/ Notes"
                },
                "Testing Data": {
                    "TestingPhase": "Testing Phase",
                    "TestingType": "Testing Type",
                    "Module": "Module",
                    "Release": "Release/ Iteration",
                    "PlannedNoOfTestCasesDesigned": "Planned No. of Test cases Designed",
                    "ActualNumberOfTestCasesDesigned": "Actual No. of Test cases Designed",
                    "NoOfTestCasesReviewComments": "No. of Test Case Review Comments",
                    "PlannedStartDate": "Planned Start Date",
                    "PlannedEndDate": "Plannned End Date",
                    "ActualStartDate": "Actual Start Date",
                    "ActualEndDate": "Actual End Date",
                    "TestDesignStatus": "Test Design Status",
                    "ManualExecutionOrAutomated": "Manual execution or Automated?",
                    "TestCasePreparationPlanned": "Planned Test Case Preparation",
                    "TestCaseReviewPlanned": "Planned Test Case Review",
                    "TestCaseReworkPlanned": "Planned Test Case Rework",
                    "TestCasePreparationActual": "Actual Test Case Preparation",
                    "TestCaseReviewActual": "Actual Test Case Review",
                    "TestCaseReworkActual": "Actual Test Case Rework",
                    "TestCasedPlannedForExecution": "TC1-No. of Test cases Planned for execution",
                    "PlannedEffortforExecution": "TC1-Planned Effort for Test Execution",
                    "ExecutionStatus": "TC1 Execution Status",
                    "TestCasesExecuted": "TC1-No. of Test cases Executed",
                    "ActualEffortForExecution": "TC1-Actual Effort for Test Execution",
                    "TotalCasesPassed": "TC1-Total Test Cases passed",
                    "DefectsFound": "TC1-Defects found",
                    "DefectsRejected": "TC1-Defects Rejected",
                    "TestDesignProductivity": "Test Design Productivity",
                    "TestExectionProductivity": "TC1-Test Exection Productivity",
                    "DefectRejectionPer": "TC1-Defect Rejection %",
                    "MonthTestCaseCreationEndDate": "Month-Test Case Creation End Date"
                }
            }
        };
        webWorker.postMessage(message);
        webWorker.onmessage = function (e) {
            saveData(e.data);
        }
        
    }
}]);