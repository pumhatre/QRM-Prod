app.service('uploadService', ['$http', 'config', function ($http, config) {
    this.UploadFile = function (files, saveData) {
        let webWorker = new Worker(config.baseUrl+'Assets/app/workers/uploadWorker.js');
        var message = {
            files: files,
            config: config,
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
                        Datatype: "string",
                        isMandatory: true
                    },
                    "ComponentType":{
                        ExcelName:  "Component Type",
                        Datatype: "string"
                    },
                    "WidgetType": {
                        ExcelName: "Object/ Widget Type",
                        Datatype: "string"
                    },
                    "Complexity":{
                        ExcelName: "Complexity",
                        Datatype: "string"
                    },
                    "TaskType":{
                        ExcelName: "Task Type",
                        Datatype: "string"
                    },
                    "BaselinedEffort":{
                        ExcelName: "Baselined Effort(hrs)",
                        Datatype:"nullablefloat"
                    },
                    "ActualEffort":{
                        ExcelName: "Actual Effort",
                        Datatype: "nullablefloat"
                    },
                    "Status":{
                        ExcelName: "Status",
                        Datatype: "string"
                    },
                    "CMMIRollUp": {
                        ExcelName: "CMMI Rollup",
                        Datatype: "string"
                    },
                    //"SEQ": {
                    //    ExcelName: "SEQ",
                    //    Datatype: "string"
                    //},
                    "ScheduledStartDate": {
                        ExcelName: "Scheduled Start Date",
                        Datatype: "nullabledatetime",
                        isDateProperty: true
                    },
                    "ScheduledEndDate": {
                        ExcelName: "Scheduled End Date",
                        Datatype: "nullabledatetime",
                        isDateProperty: true
                    },
                    "ActualStartDate": {
                        ExcelName: "Actual Start Date",
                        Datatype: "nullabledatetime",
                        isDateProperty: true
                    },
                    "ActualEndDate":{
                        ExcelName: "Actual End Date",
                        Datatype: "nullabledatetime",
                        isDateProperty: true
                    },
                    "ProjectID": {
                        ExcelName: "Project",
                        Datatype: "string"
                    },
                    "Release": {
                        ExcelName: "Release",
                        Datatype: "string"
                    },
                    "Module": {
                        ExcelName: "Module",
                        Datatype: "string"
                    },
                    "ComponentName": {
                        ExcelName: "Object/ Component Name",
                        Datatype: "string"
                    },
                    "ReviewType": {
                        ExcelName: "Review Type",
                        Datatype: "string"
                    },
                    "Remarks": {
                        ExcelName: "Remarks",
                        Datatype: "string"
                    }
                },
                "Defect Data": {
                    "DefectID": {
                        ExcelName: "Defect ID",
                        Datatype: "string",
                        isMandatory: true
                    },
                    "WidgetComponentID": {
                        ExcelName: "Object/ Widget ID",
                        Datatype: "string"
                    },
                    "DetectedStage": {
                        ExcelName: "Defect Detected Stage",
                        Datatype: "string"
                    },
                    "ReportedDate": {
                        ExcelName: "Reported Date",
                        Datatype: "nullabledatetime",
                        isDateProperty: true
                    },
                    "ReportedBy": {
                        ExcelName: "Reported By",
                        Datatype: "string"
                    },
                    "DefectDescription": {
                        ExcelName: "Defect Description",
                        Datatype: "string"
                    },
                    "Status": {
                        ExcelName: "Status",
                        Datatype: "string"
                    },
                    "DefectInfectedStage": {
                        ExcelName: "Defect Injected Stage",
                        Datatype: "string"
                    },
                    "ExpectedDetectionPhase": {
                        ExcelName: "Expected Detection Phase",
                        Datatype: "string"
                    },
                    "DefectType": {
                        ExcelName: "Defect Type",
                        Datatype: "string"
                    },
                    "Cause": {
                        ExcelName: "Cause",
                        Datatype: "string"
                    },
                    "ReviewType": {
                        ExcelName: "Review Type",
                        Datatype: "string"
                    },
                    "DefectSeverity": {
                        ExcelName: "Defect Severity",
                        Datatype: "string"
                    },
                    "FixedOnDate": {
                        ExcelName: "Fixed On Date",
                        Datatype: "nullabledatetime",
                        isDateProperty: true
                    },
                    "Remarks": {
                        ExcelName: "Remarks/ Notes",
                        Datatype: "string"
                    }
                },
                "Testing Data": {
                    "TestingPhase": {
                        ExcelName: "Testing Phase",
                        Datatype: "string",
                        isMandatory: true
                    },
                    "TestingType": {
                        ExcelName: "Testing Type",
                        Datatype: "string"
                    },
                    "Module": {
                        ExcelName: "Module",
                        Datatype: "string"
                    },
                    "Release": {
                        ExcelName: "Release",
                        Datatype: "string"
                    },
                    "PlannedNoOfTestCasesDesigned": {
                        ExcelName: "Planned No. of Test cases Designed",
                        Datatype: "int"
                    },
                    "ActualNumberOfTestCasesDesigned": {
                        ExcelName: "Actual No. of Test cases Designed",
                        Datatype: "int"
                    },
                    "NoOfTestCasesReviewComments": {
                        ExcelName: "No. of Test Case Review Comments",
                        Datatype: "nullableint"
                    },
                    "PlannedStartDate": {
                        ExcelName: "Test Design Planned Start Date",
                        Datatype: "nullabledatetime",
                        isDateProperty: true
                    },
                    "PlannedEndDate": {
                        ExcelName: "Test Design Plannned End Date",
                        Datatype: "nullabledatetime",
                        isDateProperty: true
                    },
                    "ActualStartDate": {
                        ExcelName: "Test Design Actual Start Date",
                        Datatype: "nullabledatetime",
                        isDateProperty: true
                    },
                    "ActualEndDate": {
                        ExcelName: "Test Design Actual End Date",
                        Datatype: "nullabledatetime",
                        isDateProperty: true
                    },
                    "TestDesignStatus": {
                        ExcelName: "Test Design Status",
                        Datatype: "string"
                    },
                    "ManualOrAutomatedExecution": {
                        ExcelName: "Manual execution or Automated?",
                        Datatype: "string"
                    },
                    "TestCasePreparationPlanned": {
                        ExcelName: "Planned Test Case Preparation (Design)",
                        Datatype: "nullablefloat"
                    },
                    "TestCaseReviewPlanned": {
                        ExcelName: "Planned Test Case Review (Design)",
                        Datatype: "nullablefloat"
                    },
                    "TestCaseReworkPlanned": {
                        ExcelName: "Planned Test Case Rework (Design)",
                        Datatype: "nullablefloat"
                    },
                    "TestCasePreparationActual": {
                        ExcelName: "Actual Test Case Preparation (Design)",
                        Datatype: "nullablefloat"
                    },
                    "TestCaseReviewActual": {
                        ExcelName: "Actual Test Case Review (Design)",
                        Datatype: "nullablefloat"
                    },
                    "TestCaseReworkActual": {
                        ExcelName: "Actual Test Case Rework (Design)",
                        Datatype: "nullablefloat"
                    },
                    "TestCasedPlannedForExecution": {
                        ExcelName: "No. of Test cases Planned for execution",
                        Datatype: "nullableint"
                    },
                    "PlannedEffortforExecution": {
                        ExcelName: "Planned Effort for Test Execution",
                        Datatype: "int"
                    },
                    "ExecutionStatus": {
                        ExcelName: "Test Execution Status",
                        Datatype: "string"
                    },
                    "TestCasesExecuted": {
                        ExcelName: "No. of Test cases Executed",
                        Datatype: "int"
                    },
                    "ActualEffortForExecution": {
                        ExcelName: "Actual Effort for Test Execution",
                        Datatype: "int"
                    },
                    "TotalCasesPassed": {
                        ExcelName: "Total Test Cases passed",
                        Datatype: "int"
                    },
                    "DefectsFound": {
                        ExcelName: "Total Defects found",
                        Datatype: "int"
                    },
                    "DefectsRejected": {
                        ExcelName: "Defects Rejected (rejected by Dev team)",
                        Datatype: "int"
                    },
                    "DefectsRejectedByQA": {
                        ExcelName: "Defects Retest Rejected (rejected by QA team)",
                        Datatype: "int"
                    },
                    "Iteration" : {
                        ExcelName: "Iteration/Cycle",
                        Datatype: "string"
                    },
                    "TestingSubphase" : {
                        ExcelName: "Testing Sub-phase",
                        Datatype: "string"
                    },
                    "SimpleTestCasesDesign" : {
                        ExcelName: "Simple (Test Design)",
                        Datatype: "nullableint"
                    },
                    "MediumTestCasesDesign" : {
                        ExcelName: "Medium (Test Design)",
                        Datatype: "nullableint"
                    },
                    "ComplexTestCasesDesign" : {
                        ExcelName: "Complex (Test Design)",
                        Datatype: "nullableint"
                    },
                    "VeryComplexTestCasesDesign" : {
                        ExcelName: "Very Complex (Test Design)",
                        Datatype: "nullableint"
                    },
                    "SimpleTestCasesExecution" : {
                        ExcelName: "Simple (Test Execution)",
                        Datatype: "nullableint"
                    },
                    "MediumTestCasesExecution" :  {
                        ExcelName: "Medium (Test Execution)",
                        Datatype: "nullableint"
                    },
                    "ComplexTestCasesExecution" : {
                        ExcelName: "Complex (Test Execution)",
                        Datatype: "nullableint"
                    },
                    "VeryComplexTestCasesExecution" : {
                        ExcelName: "Very Complex (Test Execution)",
                        Datatype: "nullableint"
                    },
                    "NormalizedTestCasesExecution" : {
                        ExcelName: "Normalized Size (Test Execution)",
                        Datatype: "nullableint"
                    },
                    "PlannedStartDateExecution" : {
                        ExcelName: "Planned Start Date (Test Execution)",
                        Datatype: "nullabledatetime",
                        isDateProperty: true
                    },
                    "PlannedEndDateExecution" : {
                        ExcelName: "Plannned End Date (Test Execution)",
                        Datatype: "nullabledatetime",
                        isDateProperty: true
                    },
                    "ActualStartDateExecution" : {
                        ExcelName: "Actual Start Date (Test Execution)",
                        Datatype: "nullabledatetime",
                        isDateProperty: true
                    },
                    "ActualEndDateExecution" : {
                        ExcelName: "Actual End Date (Test Execution)",
                        Datatype: "nullabledatetime",
                        isDateProperty: true
                    },
                    "NormalizedTestCasesDesign" : {
                        ExcelName: "Normalized Size (Test Design)",
                        Datatype: "nullableint"
                    },

                    "TestDesignProductivity": {
                        ExcelName: "Test Design Productivity",
                        Datatype: "nullablefloat"
                    },

                    "TestExectionProductivity": {
                        ExcelName: "Test Exection Productivity",
                        Datatype: "nullablefloat"
                    },

                    "DefectRejectionPer": {
                        ExcelName: "Defect Density",
                        Datatype: "nullablefloat"
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
        debugger;
        var updatedData = {};
        var map = {
            "Effort Data": "EffortData",
            "Defect Data": "DefectData",
            "Testing Data": "TestingData"
        };
        debugger;
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

    this.getDefectStagingData = function (defectData) {

        var request = {
            method: 'POST',
            data: defectData,
            url: config.apiUrl + 'api/Upload/GetDefectStagingData'
        };
        return $http(request).then(function (response) {
            return response;
        });
    };

    this.SaveDetailDataService = function (sanityData) {
        var req = {
            method: 'POST',
            data: sanityData,
            url: config.apiUrl + 'api/Upload/SaveStagingDatatoDetailsTable'
        };
        return $http(req).then(function (response) {
            return response;
        });
    };
  

}]);