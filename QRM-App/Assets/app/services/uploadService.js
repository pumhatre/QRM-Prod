app.service('uploadService', ['$http', 'config', function ($http, config) {
    this.UploadFile = function (files, saveData) {
        let webWorker = new Worker(config.baseUrl+'Assets/app/workers/uploadWorker.js');
        var message = {
            files: files,
            config: config,
            neededSheets: ["Effort Data", "Defect Data", "Testing Data"],
            neededSheetsMandatory:{
                "Effort Data": "Object/ Component ID",
                "Defect Data": "Defect ID",
                "Testing Data": "Testing Phase"
            },
            neededSheetsViewModels: {
                "Effort Data": {
                    "Object/ Component ID": "Object/ Component ID",
                    "Component Type": "Component Type",
                    "Object/ Widget Type": "Object/ Widget Type",
                    "Complexity": "Complexity",
                    "Task Type": "Task Type",
                    "Baselined Effort(hrs)": "Baselined Effort(hrs)",
                    "Actual Effort":"Actual Effort",
                    "Status":"Status",
                    "CMMI Rollup":"CMMI Rollup",
                    "SEQ":"SEQ",
                    "Scheduled Start Date":"Scheduled Start Date",
                    "Scheduled End Date":"Scheduled End Date",
                    "Actual Start Date":"Actual Start Date",
                    "Actual End Date":"Actual End Date",
                    "Project":"Project",
                    "Release":"Release",
                    "Module":"Module",
                    "Object/ Component Name":"Object/ Component Name",
                    "Review Type":"Review Type",
                    "Remarks": "Remarks"
                },
                "Defect Data": {
                    "Defect ID":"Defect ID",
                    "Object/ Widget ID":"Object/ Widget ID",
                    "Defect Detected Stage":"Defect Detected Stage",
                    "Reported Date":"Reported Date",
                    "Reported By":"Reported By",
                    "Defect Description":"Defect Description",
                    "Status":"Status",
                    "Defect Injected Stage":"Defect Injected Stage",
                    "Expected Detection Phase":"Expected Detection Phase",
                    "Defect Type":"Defect Type",
                    "Cause":"Cause",
                    "Review Type":"Review Type",
                    "Defect Severity":"Defect Severity",
                    "Fixed On Date":"Fixed On Date",
                    "Remarks/ Notes": "Remarks/ Notes"

                },
                "Testing Data": {
                    "Testing Phase":"Testing Phase",
                    "Testing Type":"Testing Type",
                    "Module":"Module",
                    "Release/ Iteration":"Release/ Iteration",
                    "Planned No. of Test cases Designed":"Planned No. of Test cases Designed",
                    "Actual No. of Test cases Designed":"Actual No. of Test cases Designed",
                    "No. of Test Case Review Comments":"No. of Test Case Review Comments",
                    "Planned Start Date":"Planned Start Date",
                    "Plannned End Date":"Plannned End Date",
                    "Actual Start Date":"Actual Start Date",
                    "Actual End Date":"Actual End Date",
                    "Test Design Status":"Test Design Status",
                    "Manual execution or Automated?":"Manual execution or Automated?",
                    "Test Case Preparation":"Test Case Preparation",
                    "Test Case Review":"Test Case Review",
                    "Test Case Rework":"Test Case Rework",
                    "Test Case Preparation":"Test Case Preparation",
                    "Test Case Review":"Test Case Review",
                    "Test Case Rework":"Test Case Rework",
                    "TC1-No. of Test cases Planned for execution":"TC1-No. of Test cases Planned for execution",
                    "TC1-Planned Effort for Test Execution":"TC1-Planned Effort for Test Execution",
                    "TC1 Execution Status":"TC1 Execution Status",
                    "TC1-No. of Test cases Executed":"TC1-No. of Test cases Executed",
                    "TC1-Actual Effort for Test Execution":"TC1-Actual Effort for Test Execution",
                    "TC1-Total Test Cases passed":"TC1-Total Test Cases passed",
                    "TC1-Defects found":"TC1-Defects found",
                    "TC1-Defects Rejected":"TC1-Defects Rejected",
                    "Test Design Productivity":"Test Design Productivity",
                    "TC1-Test Exection Productivity":"TC1-Test Exection Productivity",
                    "TC1-Defect Rejection %":"TC1-Defect Rejection %",
                    "Month-Test Case Creation End Date": "Month-Test Case Creation End Date"
                }
            }
        };
        webWorker.postMessage(message);
        webWorker.onmessage = function (e) {
            saveData(e.data);
        }
        
    }
}]);