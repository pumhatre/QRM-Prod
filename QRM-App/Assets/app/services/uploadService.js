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
            dateProperties: [
                "ScheduledStartDate",
                "ScheduledEndDate",
                "ActualStartDate",
                "ActualEndDate",
                "ReportedDate",
                "FixedOnDate",
                "PlannedStartDate",
                "PlannedEndDate",
                "ActualStartDate",
                "ActualEndDate"
            ],
            sheetColumnsRendering: {
                //"Testing Data": {
                //    "N2": "Planned Test Case Preparation",
                //    "O2": "Planned Test Case Review",
                //    "P2": "Planned Test Case Rework",
                //    "Q2": "Actual Test Case Preparation",
                //    "R2": "Actual Test Case Review",
                //    "S2": "Actual Test Case Rework"
                //}
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
                    "Release": "Release",
                    "PlannedNoOfTestCasesDesigned": "Planned No. of Test cases Designed",
                    "ActualNumberOfTestCasesDesigned": "Actual No. of Test cases Designed",
                    "NoOfTestCasesReviewComments": "No. of Test Case Review Comments",
                    "PlannedStartDate": "Test Design Planned Start Date",
                    "PlannedEndDate": "Test Design Plannned End Date",
                    "ActualStartDate": "Test Design Actual Start Date",
                    "ActualEndDate": "Test Design Actual End Date",
                    "TestDesignStatus": "Test Design Status",
                    "ManualExecutionOrAutomated": "Manual execution or Automated?",
                    "TestCasePreparationPlanned": "Planned Test Case Preparation (Design)",
                    "TestCaseReviewPlanned": "Planned Test Case Review (Design)",
                    "TestCaseReworkPlanned": "Planned Test Case Rework (Design)",
                    "TestCasePreparationActual": "Actual Test Case Preparation (Design)",
                    "TestCaseReviewActual": "Actual Test Case Review (Design)",
                    "TestCaseReworkActual": "Actual Test Case Rework (Design)",
                    "TestCasedPlannedForExecution": "No. of Test cases Planned for execution",
                    "PlannedEffortforExecution": "Planned Effort for Test Execution",
                    "ExecutionStatus": "Test Execution Status",
                    "TestCasesExecuted": "No. of Test cases Executed",
                    "ActualEffortForExecution": "Actual Effort for Test Execution",
                    "TotalCasesPassed": "Total Test Cases passed",
                    "DefectsFound": "Total valid Defects found",
                    "DefectsRejected": "Defects Fix Rejected",
                    "Iteration" : "Iteration/Cycle",
                    "TestingSubphase" : "Testing Sub-phase",
                    "SimpleTestCasesDesign" : "Simple (Test Design)",
                    "MediumTestCasesDesign" : "Medium (Test Design)",
                    "ComplexTestCasesDesign" : "Complex (Test Design)",
                    "VeryComplexTestCasesDesign" : "Very Complex (Test Design)",
                    "SimpleTestCasesExecution" : "Simple (Test Execution)",
                    "MediumTestCasesExecution" : "Medium (Test Execution)",
                    "ComplexTestCasesExecution" : "Complex (Test Execution)",
                    "VeryComplexTestCasesExecution" : "Very Complex (Test Execution)",
                    "NormalizedTestCasesExecution" : "Normalized Size (Test Execution)",
                    "PlannedStartDateExecution" : "Planned Start Date (Test Execution)",
                    "PlannedEndDateExecution" : "Plannned End Date (Test Execution)",
                    "ActualStartDateExecution" : "Actual Start Date (Test Execution)",
                    "ActualEndDateExecution" : "Actual End Date (Test Execution)",
                    "NormalizedTestCasesDesign" : "Normalized Size (Test Design)"
                }
            }
        };
        webWorker.postMessage(message);
        webWorker.onmessage = function (e) {
            saveData(e.data);
        }
        
    }
    this.GetMonthList = function (config) {
        return $http.get(config.apiUrl + 'api/Report/GetAllMonthsList');
    }

    this.SaveExcelData = function (data) {
        var updatedData = {};
        var map = {
            "Effort Data": "EffortData",
            "Defect Data": "DefectData",
            "Testing Data": "TestingData"
        };
        _.each(data, function (value, key) {
            key = map[key] || key;
            updatedData[key] = value;
        });
        var req = {
            method: 'POST',
            data: updatedData,
            url: config.apiUrl + 'api/Upload/SaveExcelData'
        };
        return $http(req).then(function (reponse) {
            return reponse.data;
        });
    }
}]);