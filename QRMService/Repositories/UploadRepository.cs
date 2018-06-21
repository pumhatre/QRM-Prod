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
using System.Text;

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
            int effortCount = 0;
            var dataSanityResult = ValidateDataSanity(upload,ref effortCount);
         
            SanitizedDataViewModel vm = new SanitizedDataViewModel();
            vm.effortSanityValidatonModel = dataSanityResult;
            vm.EffortTotalCount = effortCount;
            return vm;

        }

        private static List<EffortSanityValidationModel> ValidateDataSanity(UploadViewModel upload, ref int value)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("Project", upload.ProjectId));
            parameters.Add(new KeyValuePair<string, object>("Month", upload.MonthId));
            parameters.Add(new KeyValuePair<string, object>("Release", upload.ProjectReleaseId));
            DataSet dsSanityValidation = helper.GetDataSetByProcedure(Constants.UspGetEffortDataSanityResults, "default", true, parameters.ToArray());

            List<EffortSanityValidationModel> effortSanityValidationList = new List<EffortSanityValidationModel>();

            dsSanityValidation.Tables[1].AsEnumerable().ToList().ForEach(row =>
            {
                StringBuilder sb = new StringBuilder();

                //Review Type
                var isValidTaskType = row.Field<bool>(Constants.EffortSanityValidationColumnName.IsValidTaskType.ToString());
                var isValidStatus = row.Field<bool>(Constants.EffortSanityValidationColumnName.IsValidStatus.ToString());
                var isValidComponentType = row.Field<bool>(Constants.EffortSanityValidationColumnName.IsValidComponentType.ToString());
                var isValidWidgetType = row.Field<bool>(Constants.EffortSanityValidationColumnName.IsValidWidgetType.ToString());
                var isValidComplexity = row.Field<bool>(Constants.EffortSanityValidationColumnName.IsValidComplexity.ToString());
                var isValidCMMIRollup = row.Field<bool>(Constants.EffortSanityValidationColumnName.IsValidCMMIRollup.ToString());


                if (!isValidTaskType && row.Field<string>(Constants.EffortSanityValidationColumnName.TaskType.ToString()) != "-Missing-")
                    sb.Append("Invalid Task type").Append("|");
                if (!isValidStatus)
                    sb.Append("Invalid Status").Append("|");
                if (!isValidComponentType)
                    sb.Append("Invalid Component Type").Append("|");
                if (!isValidWidgetType)
                    sb.Append("Invalid Widget Type").Append("|");
                if (!isValidComplexity)
                    sb.Append("Invalid Complexity").Append("|");
                if (!isValidCMMIRollup)
                    sb.Append("Invalid CMMIRollup").Append("|");

                effortSanityValidationList.Add(new EffortSanityValidationModel
                {
                    EffortDataStagingId = row.Field<int>(Constants.EffortSanityValidationColumnName.EffortDataStagingId.ToString()),
                    ObjectComponentID = row.Field<string>(Constants.EffortSanityValidationColumnName.ObjectComponentID.ToString()),
                    TaskType = row.Field<string>(Constants.EffortSanityValidationColumnName.TaskType.ToString()),
                    Status = row.Field<string>(Constants.EffortSanityValidationColumnName.Status.ToString()),
                    ComponentType = row.Field<string>(Constants.EffortSanityValidationColumnName.ComponentType.ToString()),
                    WidgetType = row.Field<string>(Constants.EffortSanityValidationColumnName.WidgetType.ToString()),
                    Complexity = row.Field<string>(Constants.EffortSanityValidationColumnName.Complexity.ToString()),
                    CMMIRollUp = row.Field<string>(Constants.EffortSanityValidationColumnName.CMMIRollUp.ToString()),
                    ErrorArray = (sb.ToString().TrimEnd('|').Split('|') != null && sb.ToString().TrimEnd('|').Split('|').Count() == 1 && sb.ToString().TrimEnd('|').Split('|')[0] == "")
                    ? null : sb.ToString().TrimEnd('|').Split('|')
                });
            });
            value=Convert.ToInt32(dsSanityValidation.Tables[0].Rows[0]["TotalCount"]);

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
            ExecuteDashboard(Guid.NewGuid(), sanitizedViewModel.ProjectId, sanitizedViewModel.ProjectReleaseId, sanitizedViewModel.MonthId);

            return sanitizedViewModel;
        }
        /// <summary>
        /// Method to execute all the four stored proecudre once inserted to main table
        /// </summary>
        /// <param name="runId"></param>
        /// <param name="executionStep">1:belongs to execution from main table</param>
        /// <param name="createdby"></param>
        private static void ExecuteDashboard(Guid runId, int projectId, int releaseId, int monthId, int executionStep = 1, int createdby = 1)
        {
            try
            {
                var helper = new SqlClientHelper();
                List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
                parameters.Add(new KeyValuePair<string, object>("RunId", runId));
                parameters.Add(new KeyValuePair<string, object>("ExecutionStep", executionStep));
                parameters.Add(new KeyValuePair<string, object>("CreatedBy", createdby));
                parameters.Add(new KeyValuePair<string, object>("ProjectId", projectId));
                parameters.Add(new KeyValuePair<string, object>("ReleaseId", releaseId));
                parameters.Add(new KeyValuePair<string, object>("MonthId", monthId));
                helper.RunProcedure(Constants.UspExecuteDashboard, "default", true, parameters.ToArray());
            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

        private static void SaveEffortDetailData(SanitizedDataViewModel effortSanityModel)
        {
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
            int defectCount = 0;
            var dataSanityResult = ValidateDataSanityDefectData(upload,ref defectCount);
            SanitizedDataViewModel vm = new SanitizedDataViewModel();
            vm.defectSanityValidationModel = dataSanityResult;
            vm.DefectTotalCount = defectCount;
            return vm;

        }

        private static List<DefectSanityValidationModel> ValidateDataSanityDefectData(UploadViewModel upload, ref int value)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("Project", upload.ProjectId));
            parameters.Add(new KeyValuePair<string, object>("Month", upload.MonthId));
            parameters.Add(new KeyValuePair<string, object>("Release", upload.ProjectReleaseId));
            DataSet dsSanityValidation = helper.GetDataSetByProcedure(Constants.UspGetDefectDataSanityResults, "default", true, parameters.ToArray());

            List<DefectSanityValidationModel> defectSanityValidationList = new List<DefectSanityValidationModel>();

            dsSanityValidation.Tables[1].AsEnumerable().ToList().ForEach(row =>
            {
                StringBuilder sb = new StringBuilder();
                var defectSanityModel = new DefectSanityValidationModel();
                //Review Type
                var isValidDetectedStage = row.Field<bool>(Constants.DefectSanityValidationColumnName.IsValidDefectDetectedStage.ToString());
                var isValidDefectStatus = row.Field<bool>(Constants.DefectSanityValidationColumnName.IsValidDefectStatus.ToString());
                var isValidDefectInjectedStage = row.Field<bool>(Constants.DefectSanityValidationColumnName.IsValidDefectInjectedStage.ToString());
                var isValidExpectedDetectionPhase = row.Field<bool>(Constants.DefectSanityValidationColumnName.IsValidExpectedDetectionPhase.ToString());
                var isValidDefectType = row.Field<bool>(Constants.DefectSanityValidationColumnName.IsValidDefectType.ToString());
                var isValidDefectCause = row.Field<bool>(Constants.DefectSanityValidationColumnName.IsValidDefectCause.ToString());
                var isValidDefectSeverity = row.Field<bool>(Constants.DefectSanityValidationColumnName.IsValidDefectSeverity.ToString());
                var isValidReviewType = row.Field<bool>(Constants.DefectSanityValidationColumnName.IsValidReviewType.ToString());
                var isValidInjectedDetectedPhase = row.Field<bool>(Constants.DefectSanityValidationColumnName.IsValidInjectedDetectedPhase.ToString());
                var isValidDefectTypeCause = row.Field<bool>(Constants.DefectSanityValidationColumnName.IsValidDefectTypeCause.ToString());

                if (!isValidDetectedStage)
                    sb.Append("Invalid Detected Stage").Append("|");
                if (!isValidDefectStatus)
                    sb.Append("Invalid Status").Append("|");
                if (!isValidDefectInjectedStage)
                    sb.Append("Invalid Injected Stage").Append("|");
                if (!isValidExpectedDetectionPhase)
                    sb.Append("Invalid Expected Detection Phase").Append("|");
                if (!isValidDefectType)
                    sb.Append("Invalid Type").Append("|");
                if (!isValidDefectSeverity)
                    sb.Append("Invalid Severity").Append("|");
                if (!isValidReviewType && row.Field<string>(Constants.DefectSanityValidationColumnName.ReviewType.ToString()) != "-Missing-")
                    sb.Append("Invalid Review Type").Append("|");
                if (!isValidInjectedDetectedPhase)
                    sb.Append("Incorrect Expected Detection Phase Mapping").Append("|");
                if (!isValidDefectTypeCause)
                    sb.Append("Incorrect Defect Cause Mapping").Append("|");


                defectSanityValidationList.Add(new DefectSanityValidationModel
                {
                    DefectDataStagingId = row.Field<int>(Constants.DefectSanityValidationColumnName.DefectDataStagingId.ToString()),
                    WidgetComponentId = row.Field<string>(Constants.DefectSanityValidationColumnName.WidgetComponentId.ToString()),
                    DetectedStage = row.Field<string>(Constants.DefectSanityValidationColumnName.DetectedStage.ToString()),
                    Status = row.Field<string>(Constants.DefectSanityValidationColumnName.Status.ToString()),
                    DefectInfectedStage = row.Field<string>(Constants.DefectSanityValidationColumnName.DefectInfectedStage.ToString()),
                    ExpectedDetectionPhase = row.Field<string>(Constants.DefectSanityValidationColumnName.ExpectedDetectionPhase.ToString()),
                    DefectType = row.Field<string>(Constants.DefectSanityValidationColumnName.DefectType.ToString()),
                    Cause = row.Field<string>(Constants.DefectSanityValidationColumnName.Cause.ToString()),
                    DefectSeverity = row.Field<string>(Constants.DefectSanityValidationColumnName.DefectSeverity.ToString()),
                    ReviewType = row.Field<string>(Constants.DefectSanityValidationColumnName.ReviewType.ToString()),
                    ValidInjectedDetectedPhase = row.Field<string>(Constants.DefectSanityValidationColumnName.ValidInjectedDetectedPhase.ToString()),
                    ValidDefectTypeCause = row.Field<string>(Constants.DefectSanityValidationColumnName.ValidDefectTypeCause.ToString()),
                    ErrorDescription = sb.ToString().TrimEnd('|'),
                    ErrorArray = (sb.ToString().TrimEnd('|').Split('|') != null && sb.ToString().TrimEnd('|').Split('|').Count() == 1 && sb.ToString().TrimEnd('|').Split('|')[0] == "")
                    ? null : sb.ToString().TrimEnd('|').Split('|')

                });
            });
            value = Convert.ToInt32(dsSanityValidation.Tables[0].Rows[0]["TotalCount"]);
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
            int defectCount = 0;
            var dataSanityResult = ValidateDataSanityTestData(upload, ref defectCount);
            SanitizedDataViewModel vm = new SanitizedDataViewModel();
            vm.testSanityValidationModel = dataSanityResult;
            vm.TestTotalCount = defectCount;
            return vm;

        }
        private static List<TestingSanityValidationModel> ValidateDataSanityTestData(UploadViewModel upload, ref int value)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("Project", upload.ProjectId));
            parameters.Add(new KeyValuePair<string, object>("Month", upload.MonthId));
            parameters.Add(new KeyValuePair<string, object>("Release", upload.ProjectReleaseId));
            DataSet dsSanityValidation = helper.GetDataSetByProcedure(Constants.UspGetTestDataSanity, "default", true, parameters.ToArray());

            List<TestingSanityValidationModel> testSanityValidationList = new List<TestingSanityValidationModel>();

            dsSanityValidation.Tables[1].AsEnumerable().ToList().ForEach(row =>
            {
                StringBuilder sb = new StringBuilder();
                var defectSanityModel = new DefectSanityValidationModel();
                //Review Type
                var IsValidTestingType = row.Field<bool>(Constants.TestSanityValidationColumnName.IsValidTestingType.ToString());
                var IsValidTestingPhase = row.Field<bool>(Constants.TestSanityValidationColumnName.IsValidTestingPhase.ToString());
                var IsValidTestingSubPhase = row.Field<bool>(Constants.TestSanityValidationColumnName.IsValidTestingSubPhase.ToString());
                var IsValidTestingExecutionType = row.Field<bool>(Constants.TestSanityValidationColumnName.IsValidTestExecutionType.ToString());


                if (!IsValidTestingType)
                {
                    if (row.Field<string>(Constants.TestSanityValidationColumnName.TestingType.ToString()) == "-Missing-")
                        sb.Append("Missing Testing Type").Append("|");
                    else
                        sb.Append("Invalid Testing Type").Append("|");
                }
                if (!IsValidTestingPhase)
                {
                    if (row.Field<string>(Constants.TestSanityValidationColumnName.TestingPhase.ToString()) == "-Missing-")
                        sb.Append("Missing Testing Phase").Append("|");
                    else
                    sb.Append("Invalid Testing Phase").Append("|");
                }
                if (!IsValidTestingSubPhase)
                {
                    if (row.Field<string>(Constants.TestSanityValidationColumnName.TestingSubPhase.ToString()) == "-Missing-")
                        sb.Append("Missing Testing SubPhase").Append("|");
                    else
                    sb.Append("Invalid Testing SubPhase").Append("|");
                }
                if (!IsValidTestingExecutionType)
                {
                    if (row.Field<string>(Constants.TestSanityValidationColumnName.TestExecutionType.ToString()) == "-Missing-")
                        sb.Append("Missing Test Execution Type").Append("|");
                    else
                    sb.Append("Invalid Test Execution Type").Append("|");
                }
                


                testSanityValidationList.Add(new TestingSanityValidationModel
                {
                    TestingDataStagingId = row.Field<int>(Constants.TestSanityValidationColumnName.TestingDataStagingId.ToString()),
                    RowNumber= row.Field<Int64>(Constants.TestSanityValidationColumnName.RowNumber.ToString()),
                    Release = row.Field<string>(Constants.TestSanityValidationColumnName.Release.ToString()),
                    Iteration = row.Field<string>(Constants.TestSanityValidationColumnName.Iteration.ToString()),
                    TestingType = row.Field<string>(Constants.TestSanityValidationColumnName.TestingType.ToString()),
                    TestingPhase = row.Field<string>(Constants.TestSanityValidationColumnName.TestingPhase.ToString()),
                    TestingSubPhase = row.Field<string>(Constants.TestSanityValidationColumnName.TestingSubPhase.ToString()),
                    TestingExecutionType = row.Field<string>(Constants.TestSanityValidationColumnName.TestExecutionType.ToString()),
                    
                    ErrorDescription = sb.ToString().TrimEnd('|'),
                    ErrorArray = (sb.ToString().TrimEnd('|').Split('|') != null && sb.ToString().TrimEnd('|').Split('|').Count() == 1 && sb.ToString().TrimEnd('|').Split('|')[0] == "")
                    ? null : sb.ToString().TrimEnd('|').Split('|')

                });
            });
            value = Convert.ToInt32(dsSanityValidation.Tables[0].Rows[0]["TotalCount"]);
            return testSanityValidationList;
           
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