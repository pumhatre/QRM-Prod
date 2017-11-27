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
                    "ObjectComponentID": {
                        ExcelName: "Object/ Component ID",
                        Datatype:""
                    },
                    "ComponentType":{
                        ExcelName:  "Component Type",
                        Datatype:""
                    },
                    "WidgetType": {
                        ExcelName: "Object/ Widget Type",
                        Datatype:""
                    },
                    "Complexity":{
                        ExcelName: "Complexity",
                        Datatype:""
                    },
                    "TaskType":{
                        ExcelName: "Task Type",
                        Datatype:""
                    },
                    "BaselinedEffort":{
                        ExcelName: "Baselined Effort(hrs)",
                        Datatype:""
                    },
                    "ActualEffort":{
                        ExcelName: "Actual Effort",
                        Datatype:""
                    },
                    "Status":{
                        ExcelName: "Status",
                        Datatype:""
                    },
                    "CMMIRollUp": {
                        ExcelName: "CMMI Rollup",
                        Datatype:""
                    },
                    "SEQ": {
                        ExcelName: "SEQ",
                        Datatype:""
                    },
                    "ScheduledStartDate": {
                        ExcelName: "Scheduled Start Date",
                        Datatype:""
                    },
                    "ScheduledEndDate": {
                        ExcelName: "Scheduled End Date",
                        Datatype:""
                    },
                    "ActualStartDate": {
                        ExcelName: "Actual Start Date",
                        Datatype:""
                    },
                    "ActualEndDate":{
                        ExcelName: "Actual End Date",
                        Datatype:""
                    },
                    "ProjectID": {
                        ExcelName: "Project",
                        Datatype:""
                    },
                    "Release": {
                        ExcelName: "Release",
                        Datatype:""
                    },
                    "Module": {
                        ExcelName: "Module",
                        Datatype:""
                    },
                    "ComponentName": {
                        ExcelName: "Object/ Component Name",
                        Datatype:""
                    },
                    "ReviewType": {
                        ExcelName: "Review Type",
                        Datatype:""
                    },
                    "Remarks": {
                        ExcelName: "Remarks",
                        Datatype:""
                    }
                },
                "Defect Data": {
                    "DefectID": {
                        ExcelName: "Defect ID",
                        Datatype:""
                    },
                    "WidgetComponentID": {
                        ExcelName: "Object/ Widget ID",
                        Datatype:""
                    },
                    "DetectedStage": {
                        ExcelName: "Defect Detected Stage",
                        Datatype:""
                    },
                    "ReportedDate": {
                        ExcelName: "Reported Date",
                        Datatype:""
                    },
                    "ReportedBy": {
                        ExcelName: "Reported By",
                        Datatype:""
                    },
                    "DefectDescription": {
                        ExcelName: "Defect Description",
                        Datatype:""
                    },
                    "Status": {
                        ExcelName: "Status",
                        Datatype:""
                    },
                    "DefectInfectedStage": {
                        ExcelName: "Defect Injected Stage",
                        Datatype:""
                    },
                    "ExpectedDetectionPhase": {
                        ExcelName: "Expected Detection Phase",
                        Datatype:""
                    },
                    "DefectType": {
                        ExcelName: "Defect Type",
                        Datatype:""
                    },
                    "Cause": {
                        ExcelName: "Cause",
                        Datatype:""
                    },
                    "ReviewType": {
                        ExcelName: "Review Type",
                        Datatype:""
                    },
                    "DefectSeverity": {
                        ExcelName: "Defect Severity",
                        Datatype:""
                    },
                    "FixedOnDate": {
                        ExcelName: "Fixed On Date",
                        Datatype:""
                    },
                    "Remarks": {
                        ExcelName: "Remarks/ Notes",
                        Datatype:""
                    }
                },
                "Testing Data": {
                    "TestingPhase": {
                        ExcelName: "Testing Phase",
                        Datatype: ""
                    },
                    "TestingType": {
                        ExcelName: "Testing Type",
                        Datatype: ""
                    },
                    "Module": {
                        ExcelName: "Module",
                        Datatype: ""
                    },
                    "Release": {
                        ExcelName: "Release",
                        Datatype: ""
                    },
                    "PlannedNoOfTestCasesDesigned": {
                        ExcelName: "Planned No. of Test cases Designed",
                        Datatype: ""
                    },
                    "ActualNumberOfTestCasesDesigned": {
                        ExcelName: "Actual No. of Test cases Designed",
                        Datatype: ""
                    },
                    "NoOfTestCasesReviewComments": {
                        ExcelName: "No. of Test Case Review Comments",
                        Datatype: ""
                    },
                    "PlannedStartDate": {
                        ExcelName: "Test Design Planned Start Date",
                        Datatype: ""
                    },
                    "PlannedEndDate": {
                        ExcelName: "Test Design Plannned End Date",
                        Datatype: ""
                    },
                    "ActualStartDate": {
                        ExcelName: "Test Design Actual Start Date",
                        Datatype: ""
                    },
                    "ActualEndDate": {
                        ExcelName: "Test Design Actual End Date",
                        Datatype: ""
                    },
                    "TestDesignStatus": {
                        ExcelName: "Test Design Status",
                        Datatype: ""
                    },
                    "ManualExecutionOrAutomated": {
                        ExcelName: "Manual execution or Automated?",
                        Datatype: ""
                    },
                    "TestCasePreparationPlanned": {
                        ExcelName: "Planned Test Case Preparation (Design)",
                        Datatype: ""
                    },
                    "TestCaseReviewPlanned": {
                        ExcelName: "Planned Test Case Review (Design)",
                        Datatype: ""
                    },
                    "TestCaseReworkPlanned": {
                        ExcelName: "Planned Test Case Rework (Design)",
                        Datatype: ""
                    },
                    "TestCasePreparationActual": {
                        ExcelName: "Actual Test Case Preparation (Design)",
                        Datatype: ""
                    },
                    "TestCaseReviewActual": {
                        ExcelName: "Actual Test Case Review (Design)",
                        Datatype: ""
                    },
                    "TestCaseReworkActual": {
                        ExcelName: "Actual Test Case Rework (Design)",
                        Datatype: ""
                    },
                    "TestCasedPlannedForExecution": {
                        ExcelName: "No. of Test cases Planned for execution",
                        Datatype: ""
                    },
                    "PlannedEffortforExecution": {
                        ExcelName: "Planned Effort for Test Execution",
                        Datatype: ""
                    },
                    "ExecutionStatus": {
                        ExcelName: "Test Execution Status",
                        Datatype: ""
                    },
                    "TestCasesExecuted": {
                        ExcelName: "No. of Test cases Executed",
                        Datatype: ""
                    },
                    "ActualEffortForExecution": {
                        ExcelName: "Actual Effort for Test Execution",
                        Datatype: ""
                    },
                    "TotalCasesPassed": {
                        ExcelName: "Total Test Cases passed",
                        Datatype: ""
                    },
                    "DefectsFound": {
                        ExcelName: "Total valid Defects found",
                        Datatype: ""
                    },
                    "DefectsRejected": {
                        ExcelName: "Defects Fix Rejected",
                        Datatype: ""
                    },
                    "Iteration" : {
                        ExcelName: "Iteration/Cycle",
                        Datatype: ""
                    },
                    "TestingSubphase" : {
                        ExcelName: "Testing Sub-phase",
                        Datatype: ""
                    },
                    "SimpleTestCasesDesign" : {
                        ExcelName: "Simple (Test Design)",
                        Datatype: ""
                    },
                    "MediumTestCasesDesign" : {
                        ExcelName: "Medium (Test Design)",
                        Datatype: ""
                    },
                    "ComplexTestCasesDesign" : {
                        ExcelName: "Complex (Test Design)",
                        Datatype: ""
                    },
                    "VeryComplexTestCasesDesign" : {
                        ExcelName: "Very Complex (Test Design)",
                        Datatype: ""
                    },
                    "SimpleTestCasesExecution" : {
                        ExcelName: "Simple (Test Execution)",
                        Datatype: ""
                    },
                    "MediumTestCasesExecution" :  {
                        ExcelName: "Medium (Test Execution)",
                        Datatype: ""
                    },
                    "ComplexTestCasesExecution" : {
                        ExcelName: "Complex (Test Execution)",
                        Datatype: ""
                    },
                    "VeryComplexTestCasesExecution" : {
                        ExcelName: "Very Complex (Test Execution)",
                        Datatype: ""
                    },
                    "NormalizedTestCasesExecution" : {
                        ExcelName: "Normalized Size (Test Execution)",
                        Datatype: ""
                    },
                    "PlannedStartDateExecution" : {
                        ExcelName: "Planned Start Date (Test Execution)",
                        Datatype: ""
                    },
                    "PlannedEndDateExecution" : {
                        ExcelName: "Plannned End Date (Test Execution)",
                        Datatype: ""
                    },
                    "ActualStartDateExecution" : {
                        ExcelName: "Actual Start Date (Test Execution)",
                        Datatype: ""
                    },
                    "ActualEndDateExecution" : {
                        ExcelName: "Actual End Date (Test Execution)",
                        Datatype: ""
                    },
                    "NormalizedTestCasesDesign" : {
                        ExcelName: "Normalized Size (Test Design)",
                        Datatype: ""
                    }
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