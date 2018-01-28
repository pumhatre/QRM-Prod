using QRMService.DataBase;
using QRMService.Models;
using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity.Validation;
using System.Data;
using QRMFrameworkHelpers;
using QRMService.Common;
using AutoMapper;
using System.Threading.Tasks;

namespace QRMService.Repositories
{
    public class UploadRepository
    {
        public static UploadViewModel SaveExcelData(UploadViewModel upload)
        {
            if (upload.DefectData != null && upload.DefectData.Count > 0)
                SaveDefectDataModel(upload.DefectData);
            if (upload.EffortData != null && upload.EffortData.Count > 0)
                SaveEffortDataModel(upload.EffortData);
            if (upload.TestingData != null && upload.TestingData.Count > 0)
                SaveTestingDataModel(upload.TestingData);
            return upload;
        }

        private static EffortDataModel SaveEffortDataModel(List<EffortDataModel> domainModel)
        {
            using (var db = new QRMEntities())
            {
                var projectId = domainModel[0].ProjectId;
                var monthId = domainModel[0].MonthId;
                var projectReleaseId = domainModel[0].ProjectReleaseId;
                db.EffortDataStagings.RemoveRange(db.EffortDataStagings.Where(x => x.ProjectMasterId == projectId && x.ProjectReleaseId == projectReleaseId && x.MonthId == monthId));
                db.SaveChanges();
                List<EffortDataStaging> obj = domainModel.Select(x => new EffortDataStaging
                {
                    ObjectComponentID = x.ObjectComponentID,
                    ComponentType = x.ComponentType,
                    WidgetType = x.WidgetType,
                    Complexity = x.Complexity,
                    TaskType = x.TaskType,
                    BaselinedEffort = x.BaselinedEffort,
                    ActualEffort = x.ActualEffort,
                    Status = x.Status,
                    CMMIRollUp = x.CMMIRollUp,
                    SEQ = x.SEQ,
                    ScheduledStartDate = x.ScheduledStartDate,
                    ScheduledEndDate = x.ScheduledEndDate,
                    ActualStartDate = x.ActualStartDate,
                    ActualEndDate = x.ActualEndDate,
                    ProjectID = x.ProjectID,
                    Release = x.Release,
                    Module = x.Module,
                    ComponentName = x.ComponentName,
                    ReviewType = x.ReviewType,
                    Remarks = x.Remarks,
                    ProjectReleaseId = x.ProjectReleaseId,
                    MonthId = x.MonthId,
                    ProjectMasterId = x.ProjectId

                }).ToList();
                db.EffortDataStagings.AddRange(obj);
                db.SaveChanges();
            }
            return null;
        }

        private static DefectDataModel SaveDefectDataModel(List<DefectDataModel> domainModel)
        {
            using (var db = new QRMEntities())
            {
                var projectId = domainModel[0].ProjectId;
                var monthId = domainModel[0].MonthId;
                var projectReleaseId = domainModel[0].ProjectReleaseId;
                db.DefectDataStagings.RemoveRange(db.DefectDataStagings.Where(x => x.ProjectId == projectId && x.ProjectReleaseId == projectReleaseId && x.MonthId == monthId));
                db.SaveChanges();
                List<DefectDataStaging> obj = domainModel.Select(x => new DefectDataStaging
                {
                    DefectID = x.DefectID,
                    WidgetComponentID = x.WidgetComponentID,
                    DetectedStage = x.DetectedStage,
                    ReportedDate = x.ReportedDate,
                    ReportedBy = x.ReportedBy,
                    DefectDescription = x.DefectDescription,
                    Status = x.Status,
                    DefectInfectedStage = x.DefectInfectedStage,
                    ExpectedDetectionPhase = x.ExpectedDetectionPhase,
                    DefectType = x.DefectType,
                    Cause = x.Cause,
                    ReviewType = x.ReviewType,
                    DefectSeverity = x.DefectSeverity,
                    FixedOnDate = x.FixedOnDate,
                    Remarks = x.Remarks,
                    ProjectId = x.ProjectId,
                    ProjectReleaseId = x.ProjectReleaseId,
                    MonthId = x.MonthId
                }).ToList();
                db.DefectDataStagings.AddRange(obj);
                db.SaveChanges();
            }
            return null;
        }

        private static TestingDataModel SaveTestingDataModel(List<TestingDataModel> domainModel)
        {
            using (var db = new QRMEntities())
            {
                var projectId = domainModel[0].ProjectId;
                var monthId = domainModel[0].MonthId;
                var projectReleaseId = domainModel[0].ProjectReleaseId;
                db.TestingDataStagings.RemoveRange(db.TestingDataStagings.Where(x => x.ProjectId == projectId && x.ProjectReleaseId == projectReleaseId && x.MonthId == monthId));
                db.SaveChanges();
                List<TestingDataStaging> obj = domainModel.Select(x => new TestingDataStaging
                {
                    TestingPhase = x.TestingPhase,
                    TestingType = x.TestingType,
                    Module = x.Module,
                    Release = x.Release,
                    TestDesignStatus = x.TestDesignStatus,
                    ExecutionStatus = x.ExecutionStatus,
                    PlannedNoOfTestCasesDesigned = x.PlannedNoOfTestCasesDesigned,
                    ActualNumberOfTestCasesDesigned = x.ActualNumberOfTestCasesDesigned,
                    NoOfTestCasesReviewComments = x.NoOfTestCasesReviewComments,
                    PlannedStartDate = x.PlannedStartDate,
                    PlannedEndDate = x.PlannedEndDate,
                    ActualStartDate = x.ActualStartDate,
                    ActualEndDate = x.ActualEndDate,
                    TestCasePreparationPlanned = x.TestCasePreparationPlanned,
                    TestCaseReviewPlanned = x.TestCaseReviewPlanned,
                    TestCaseReworkPlanned = x.TestCaseReworkPlanned,
                    TestCasePreparationActual = x.TestCasePreparationActual,
                    TestCaseReviewActual = x.TestCaseReviewActual,
                    TestCaseReworkActual = x.TestCaseReworkActual,
                    TestCasedPlannedForExecution = x.TestCasedPlannedForExecution,
                    PlannedEffortforExecution = x.PlannedEffortforExecution,
                    TestCasesExecuted = x.TestCasesExecuted,
                    ActualEffortForExecution = x.ActualEffortForExecution,
                    TotalCasesPassed = x.TotalCasesPassed,
                    DefectsFound = x.DefectsFound,
                    DefectsRejected = x.DefectsRejected,
                    ProjectId = x.ProjectId,
                    ProjectReleaseId = x.ProjectReleaseId,
                    MonthId = x.MonthId,
                    ActualEndDateExecution = x.ActualEndDateExecution,
                    ActualStartDateExecution = x.ActualStartDateExecution,
                    ManualOrAutomatedExecution = x.ManualOrAutomatedExecution,
                    MediumTestCasesDesign = x.MediumTestCasesDesign,
                    Iteration = x.Iteration,
                    ComplexTestCasesDesign = x.ComplexTestCasesDesign,
                    ComplexTestCasesExecution = x.ComplexTestCasesExecution,
                    SimpleTestCasesExecution = x.SimpleTestCasesExecution,
                    TestingSubphase = x.TestingSubphase,
                    MediumTestCasesExecution = x.MediumTestCasesExecution,
                    NormalizedTestCasesDesign = x.NormalizedTestCasesDesign,
                    NormalizedTestCasesExecution = x.NormalizedTestCasesExecution,
                    PlannedEndDateExecution = x.PlannedEndDateExecution,
                    PlannedStartDateExecution = x.PlannedStartDateExecution,
                    SimpleTestCasesDesign = x.SimpleTestCasesDesign,
                    VeryComplexTestCasesDesign = x.VeryComplexTestCasesDesign,
                    VeryComplexTestCasesExecution = x.VeryComplexTestCasesExecution,
                }).ToList();
                db.TestingDataStagings.AddRange(obj);
                db.SaveChanges();
            }
            return null;
        }
        

        public static SanitizedDataViewModel DataSanityCheck(UploadViewModel upload)
        {   
            //get the datasanity results from SP
            var dataSanityResult = ValidateDataSanity(upload);

            SanitizedDataViewModel vm = new SanitizedDataViewModel();
            vm.effortSanityValidatonModel = dataSanityResult;
            return vm;

        }

        private static List<EffortSanityValidationModel> ValidateDataSanity(UploadViewModel upload)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("Project", upload.ProjectId));
            parameters.Add(new KeyValuePair<string, object>("Month", upload.MonthId));
            parameters.Add(new KeyValuePair<string, object>("Release", upload.ProjectReleaseId));
            DataTable dtSanityValidation = helper.GetDataTableByProcedure(Constants.UspGetEffortDataSanityResults, "default", true, parameters.ToArray());

            List<EffortSanityValidationModel> effortSanityValidationList = new List<EffortSanityValidationModel>();

            dtSanityValidation.AsEnumerable().ToList().ForEach(row =>
            {
                effortSanityValidationList.Add(new EffortSanityValidationModel
                {
                    EffortDataStagingId = row.Field<int>(Constants.EffortSanityValidationColumnName.EffortDataStagingId.ToString()),
                    ObjectComponentID = row.Field<string>(Constants.EffortSanityValidationColumnName.ObjectComponentID.ToString()),
                    TaskType = row.Field<string>(Constants.EffortSanityValidationColumnName.TaskType.ToString()),
                    Status = row.Field<string>(Constants.EffortSanityValidationColumnName.Status.ToString()),
                    ComponentType = row.Field<string>(Constants.EffortSanityValidationColumnName.ComponentType.ToString()),
                    WidgetType = row.Field<string>(Constants.EffortSanityValidationColumnName.WidgetType.ToString()),
                    Complexity = row.Field<string>(Constants.EffortSanityValidationColumnName.Complexity.ToString()),
                    CMMIRollUp = row.Field<string>(Constants.EffortSanityValidationColumnName.CMMIRollUp.ToString())

                });
            });

            return effortSanityValidationList;

        }

        public static SanitizedDataViewModel SaveDetailData(SanitizedDataViewModel sanitizedViewModel)
        {
            if (sanitizedViewModel.effortSanityValidatonModel != null)
                SaveEffortDetailData(sanitizedViewModel);

            if (sanitizedViewModel.defectSanityValidationModel != null)
                SaveDefectDetailData(sanitizedViewModel);

            if (sanitizedViewModel.testSanityValidationModel != null)
                SaveTestingDetailData(sanitizedViewModel);


            return sanitizedViewModel;
        }

        private static void SaveEffortDetailData(SanitizedDataViewModel effortSanityModel)
        {
            //using (var db = new QRMEntities())
            //{
            //    var projectId = effortDataModel[0].ProjectId;
            //    var monthId = effortDataModel[0].MonthId;
            //    var projectReleaseId = effortDataModel[0].ProjectReleaseId;
            //    db.EffortDetails.RemoveRange(db.EffortDetails.Where(x => x.ProjectMasterId == projectId && x.ProjectReleaseId == projectReleaseId && x.MonthId == monthId));
            //    db.SaveChanges();
            //    List<EffortDetail> obj = effortDataModel.Select(x => new EffortDetail
            //    {
            //        //ComponentID = x.ObjectComponentID,
            //        ComponentTypeCode = x.ComponentType,
            //        ComplexityCode = x.Complexity,
            //        TaskTypeCode = x.TaskType,
            //        //BaselineEffort = x.BaselinedEffort,
            //        //ActualEffort = x.ActualEffort,
            //        StatusCode = x.Status,
            //        CMMIRollUpCode = x.CMMIRollUp,                    
            //        ScheduledStartDate = x.ScheduledStartDate,
            //        ScheduledEndDate = x.ScheduledEndDate,
            //        ActualStartDate = x.ActualStartDate,
            //        ActualEndDate = x.ActualEndDate,
            //        ProjectMasterId = x.ProjectId,
            //        ReleaseId = x.ProjectReleaseId,
            //        ModuleName = x.Module,
            //        ComponentName = x.ComponentName,
            //        ReviewTypeCode = x.ReviewType,
            //        Remarks = x.Remarks,
            //        ProjectReleaseId = x.ProjectReleaseId,
            //        MonthId = x.MonthId,
            //        WidgetType = x.WidgetType
            //    }).ToList();
            //    db.EffortDetails.AddRange(obj);
            //    db.SaveChanges();
            //}



            // call the sp to insert data into effort details table

            DataTable dataTable = new DataTable("udttEffortDataStagingType");
            dataTable.Columns.Add("EffortDataStagingId");

            foreach (var sanityEntity in effortSanityModel.effortSanityValidatonModel)
            {
                DataRow dr = dataTable.NewRow();
                dr["EffortDataStagingId"] = sanityEntity.EffortDataStagingId;
                dataTable.Rows.Add(dr);
            }

            

            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            if (dataTable.Rows.Count > 0)
            {
                parameters.Add(new KeyValuePair<string, object>("@EffortStagingIds", dataTable));
            }
            parameters.Add(new KeyValuePair<string, object>("Project", effortSanityModel.ProjectId));
            parameters.Add(new KeyValuePair<string, object>("Month", effortSanityModel.MonthId));
            parameters.Add(new KeyValuePair<string, object>("Release", effortSanityModel.ProjectReleaseId));

            DataTable dtSanityValidation = helper.GetDataTableByProcedure(Constants.UspSaveEffortDetailData, "default", true, parameters.ToArray());
            
        }

        public static SanitizedDataViewModel DataSanityCheckDefectData(UploadViewModel upload)
        {  
            //get the datasanity results from SP
           var dataSanityResult = ValidateDataSanityDefectData(upload);
            SanitizedDataViewModel vm = new SanitizedDataViewModel();
            vm.defectSanityValidationModel = dataSanityResult;
            return vm;

        }

        private static List<DefectSanityValidationModel> ValidateDataSanityDefectData(UploadViewModel upload)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("Project", upload.ProjectId));
            parameters.Add(new KeyValuePair<string, object>("Month", upload.MonthId));
            parameters.Add(new KeyValuePair<string, object>("Release", upload.ProjectReleaseId));
            DataTable dtSanityValidation = helper.GetDataTableByProcedure(Constants.UspGetDefectDataSanityResults, "default", true, parameters.ToArray());

            List<DefectSanityValidationModel> defectSanityValidationList = new List<DefectSanityValidationModel>();

            dtSanityValidation.AsEnumerable().ToList().ForEach(row =>
            {
                defectSanityValidationList.Add(new DefectSanityValidationModel
                {
                    DefectDataStagingId = row.Field<int>(Constants.DefectSanityValidationColumnName.DefectDataStagingId.ToString()),
                    DetectedStage = row.Field<string>(Constants.DefectSanityValidationColumnName.DetectedStage.ToString()),
                    Status = row.Field<string>(Constants.DefectSanityValidationColumnName.Status.ToString()),
                    DefectInfectedStage = row.Field<string>(Constants.DefectSanityValidationColumnName.DefectInfectedStage.ToString()),
                    ExpectedDetectionPhase = row.Field<string>(Constants.DefectSanityValidationColumnName.ExpectedDetectionPhase.ToString()),
                    DefectType = row.Field<string>(Constants.DefectSanityValidationColumnName.DefectType.ToString()),
                    Cause = row.Field<string>(Constants.DefectSanityValidationColumnName.Cause.ToString()),
                    DefectSeverity = row.Field<string>(Constants.DefectSanityValidationColumnName.DefectSeverity.ToString()),
                    ReviewType = row.Field<string>(Constants.DefectSanityValidationColumnName.ReviewType.ToString())
                });
            });

            return defectSanityValidationList;

        }

        private static void SaveDefectDetailData(SanitizedDataViewModel SanityModel)
        {
            // call the sp to insert data into effort details table

            DataTable dataTable = new DataTable("udttDefectDataStagingType");
            dataTable.Columns.Add("DefectDataStagingId");

            foreach (var sanityEntity in SanityModel.defectSanityValidationModel)
            {
                DataRow dr = dataTable.NewRow();
                dr["DefectDataStagingId"] = sanityEntity.DefectDataStagingId;
                dataTable.Rows.Add(dr);
            }
            

            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("@DefectStagingIds", dataTable));
            parameters.Add(new KeyValuePair<string, object>("Project", SanityModel.ProjectId));
            parameters.Add(new KeyValuePair<string, object>("Month", SanityModel.MonthId));
            parameters.Add(new KeyValuePair<string, object>("Release", SanityModel.ProjectReleaseId));

            DataTable dtSanityValidation = helper.GetDataTableByProcedure(Constants.UspSaveDefectDetailData, "default", true, parameters.ToArray());

        }

        public static DataTable GetTestStaging(UploadViewModel upload)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("Project", upload.ProjectId));
            parameters.Add(new KeyValuePair<string, object>("Month", upload.MonthId));
            parameters.Add(new KeyValuePair<string, object>("Release", upload.ProjectReleaseId));
            return helper.GetDataTableByProcedure(Constants.UspGetTestStagingData, "default", true, parameters.ToArray());
        }

        public static SanitizedDataViewModel DataSanityCheckTestData(UploadViewModel upload)
        {
            //get the datasanity results from SP
            var dataSanityResult = ValidateDataSanityTestData(upload);
            SanitizedDataViewModel vm = new SanitizedDataViewModel();
            vm.testSanityValidationModel = dataSanityResult;
            return vm;

        }
        private static List<TestingSanityValidationModel> ValidateDataSanityTestData(UploadViewModel upload)
        {   
            List<TestingSanityValidationModel> defectSanityValidationList = new List<TestingSanityValidationModel>();
            return defectSanityValidationList;
        }

        private static void SaveTestingDetailData(SanitizedDataViewModel SanityModel)
        {
            // call the sp to insert data into effort details table

            DataTable dataTable = new DataTable("udttTestDataStagingType");
            dataTable.Columns.Add("TestingDataStagingId");

            foreach (var sanityEntity in SanityModel.testSanityValidationModel)
            {
                DataRow dr = dataTable.NewRow();
                dr["TestingDataStagingId"] = sanityEntity.TestingDataStagingId;
                dataTable.Rows.Add(dr);
            }


            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("@TestStagingIds", dataTable));
            parameters.Add(new KeyValuePair<string, object>("Project", SanityModel.ProjectId));
            parameters.Add(new KeyValuePair<string, object>("Month", SanityModel.MonthId));
            parameters.Add(new KeyValuePair<string, object>("Release", SanityModel.ProjectReleaseId));

            DataTable dtSanityValidation = helper.GetDataTableByProcedure(Constants.UspSaveTestingDetailData, "default", true, parameters.ToArray());

        }


    }

}