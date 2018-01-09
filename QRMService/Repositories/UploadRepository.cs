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

        public static DataTable GetDefectStaging(UploadViewModel upload)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("Project", upload.ProjectId));
            parameters.Add(new KeyValuePair<string, object>("Month", upload.MonthId));
            parameters.Add(new KeyValuePair<string, object>("Release", upload.ProjectReleaseId));
            return helper.GetDataTableByProcedure(Constants.UspGetDefectStagingData, "default", true, parameters.ToArray());
        }

        public static EffortMasterDataViewModel GetEffortMasterData()
        {
            EffortMasterDataViewModel EffortMasterVM = new EffortMasterDataViewModel();

            KeyValuePair<string, object> parameter1 = new KeyValuePair<string, object>("ProcessingDate", DateTime.Now);
            KeyValuePair<string, object>[] inputParameters = { parameter1 };

            var helper = new SqlClientHelper();
            var dataSet =helper.GetDataSetByProcedure(Constants.UspGetEffortMasterData, "default", true, inputParameters);
            if(dataSet != null)
            {
                if(dataSet.Tables.Count > 0)
                {
                    // get Task Type
                    DataTable taskTypeDataTable = dataSet.Tables[0];
                    if(taskTypeDataTable != null)
                    {
                        var effortTasktype = new List<string>();
                        taskTypeDataTable.AsEnumerable().ToList().ForEach(row =>
                        {
                            effortTasktype.Add(row.Field<string>("Tasktype"));

                        });
                        EffortMasterVM.EffortTaskType = effortTasktype;
                    }
                    else
                    {
                        EffortMasterVM.EffortTaskType = new List<string>();
                    }

                    //get effort task status
                    DataTable taskStatusDataTable = dataSet.Tables[1];
                    if(taskStatusDataTable != null)
                    {
                        var effortStatus = new List<string>();
                        taskStatusDataTable.AsEnumerable().ToList().ForEach(row =>
                        {
                            effortStatus.Add(row.Field<string>("EffortStatus"));
                        });
                        EffortMasterVM.EffortStatus = effortStatus;

                    }
                    else
                    {
                        EffortMasterVM.EffortStatus = new List<string>();
                    }
                    
                }
            }

            return EffortMasterVM;
            
        }

        public static DataTable GetEffortStaging(UploadViewModel upload)
        {
            var helper = new SqlClientHelper();
            List<KeyValuePair<string, object>> parameters = new List<KeyValuePair<string, object>>();
            parameters.Add(new KeyValuePair<string, object>("Project", upload.ProjectId));
            parameters.Add(new KeyValuePair<string, object>("Month", upload.MonthId));
            parameters.Add(new KeyValuePair<string, object>("Release", upload.ProjectReleaseId));
            return helper.GetDataTableByProcedure(Constants.UspGetEffortStagingData, "default", true, parameters.ToArray());

        }

        public static int DataSanityCheck(DataTable projectData, EffortMasterDataViewModel effortMasterData)
        {

            //effort Task Type master data
            var effortTaskType = new List<string>();

            if(effortMasterData != null && effortMasterData.EffortTaskType != null && effortMasterData.EffortTaskType.Count > 0)
            {
                effortTaskType = effortMasterData.EffortTaskType;
            }

            //effort Task Status master data
            var effortTaskStatus = new List<string>();
            if (effortMasterData != null && effortMasterData.EffortStatus != null && effortMasterData.EffortStatus.Count > 0)
            {
                effortTaskStatus = effortMasterData.EffortStatus;
            }

            //effort Staging Data
            var effortDataModel = new List<EffortDataModel>();
            int effortObjectComponentCount = 0;

            projectData.AsEnumerable().ToList().ForEach(row =>
            {
            effortDataModel.Add(new EffortDataModel
            {
                ActualEffort = row.Field<decimal?>(Constants.EffortTablesColumnName.ActualEffort.ToString()),
                ActualEndDate = row.Field<DateTime?>(Constants.EffortTablesColumnName.ActualEndDate.ToString()),
                ActualStartDate = row.Field<DateTime?>(Constants.EffortTablesColumnName.ActualStartDate.ToString()),
                BaselinedEffort = row.Field<decimal?>(Constants.EffortTablesColumnName.BaselinedEffort.ToString()),
                CMMIRollUp = row.Field<string>(Constants.EffortTablesColumnName.CMMIRollUp.ToString()),
                Complexity = row.Field<string>(Constants.EffortTablesColumnName.Complexity.ToString()),
                ComponentName = row.Field<string>(Constants.EffortTablesColumnName.ComponentName.ToString()),
                ComponentType = row.Field<string>(Constants.EffortTablesColumnName.ComponentType.ToString()),
                Module = row.Field<string>(Constants.EffortTablesColumnName.Module.ToString()),
                MonthId = row.Field<int>(Constants.EffortTablesColumnName.MonthId.ToString()),
                ObjectComponentID = row.Field<string>(Constants.EffortTablesColumnName.ObjectComponentID.ToString()),
                ProjectID = row.Field<string>(Constants.EffortTablesColumnName.ProjectID.ToString()),
                ProjectId = row.Field<int>(Constants.EffortTablesColumnName.ProjectMasterId.ToString()),
                ProjectReleaseId = row.Field<int>(Constants.EffortTablesColumnName.ProjectReleaseId.ToString()),
                Release = row.Field<string>(Constants.EffortTablesColumnName.Release.ToString()),
                Remarks = row.Field<string>(Constants.EffortTablesColumnName.Remarks.ToString()),
                ReviewType = row.Field<string>(Constants.EffortTablesColumnName.ReviewType.ToString()),
                SEQ = row.Field<string>(Constants.EffortTablesColumnName.SEQ.ToString()),
                ScheduledEndDate = row.Field<DateTime?>(Constants.EffortTablesColumnName.ScheduledEndDate.ToString()),
                ScheduledStartDate = row.Field<DateTime?>(Constants.EffortTablesColumnName.ScheduledStartDate.ToString()),
                Status = row.Field<string>(Constants.EffortTablesColumnName.Status.ToString()),
                TaskType = row.Field<string>(Constants.EffortTablesColumnName.TaskType.ToString()),
                WidgetType = row.Field<string>(Constants.EffortTablesColumnName.TaskType.ToString())

            });

                //Data Sanity Validations
                //Parallel.ForEach<EffortDataModel>(effortDataModel, (edm) => 
                //{
                //    //check for valid Task Type
                //    if (edm.TaskType != null && effortTaskType.Contains(edm.TaskType))
                //    {
                //        edm.IsValidTaskType = true;
                //    }
                //    else
                //    {
                //        edm.IsValidTaskType = false;
                //    }

                //    //check for valid effort Status
                //    if(edm.Status != null && effortTaskStatus.Contains(edm.Status))
                //    {
                //        edm.IsValidEffortStatus = true;
                //    }
                //    else
                //    {
                //        edm.IsValidEffortStatus = false;
                //    }

                //});

                // get the count of distinct objects in the effort model
                effortObjectComponentCount = effortDataModel.GroupBy(x => x.ObjectComponentID).Count();

            });

            return effortObjectComponentCount;


        }

    }
            
}