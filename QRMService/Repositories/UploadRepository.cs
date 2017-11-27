using QRMService.DataBase;
using QRMService.Models;
using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity.Validation;

namespace QRMService.Repositories
{
    public class UploadRepository
    {
        public static UploadViewModel SaveExcelData(UploadViewModel upload)
        {
            SaveDefectDataModel(upload.DefectData);
            SaveEffortDataModel(upload.EffortData);
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
                db.EffortDataStagings.RemoveRange(db.EffortDataStagings.Where(x => x.ProjectMasterId == projectId && x.ProjectReleaseId==projectReleaseId && x.MonthId==monthId));
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
                    DefectID=x.DefectID,
                    WidgetComponentID=x.WidgetComponentID,
                    DetectedStage=x.DetectedStage,
                    ReportedDate=x.ReportedDate,
                    ReportedBy=x.ReportedBy,
                    DefectDescription=x.DefectDescription,
                    Status=x.Status,
                    DefectInfectedStage=x.DefectInfectedStage,
                    ExpectedDetectionPhase=x.ExpectedDetectionPhase,
                    DefectType=x.DefectType,
                    Cause=x.Cause,
                    ReviewType=x.ReviewType,
                    DefectSeverity=x.DefectSeverity,
                    FixedOnDate=x.FixedOnDate,
                    Remarks=x.Remarks,
                    ProjectId=x.ProjectId,
                    ProjectReleaseId=x.ProjectReleaseId,
                    MonthId=x.MonthId
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
                    TestingPhase=x.TestingPhase,
                    TestingType=x.TestingType,
                    Module=x.Module,
                    Release=x.Release,
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
                    ProjectId =x.ProjectId,
                    ProjectReleaseId=x.ProjectReleaseId,
                    MonthId=x.MonthId,
                    ActualEndDateExecution=x.ActualEndDateExecution,
                    ActualStartDateExecution=x.ActualStartDateExecution,
                    ManualOrAutomatedExecution=x.ManualOrAutomatedExecution,
                    MediumTestCasesDesign=x.MediumTestCasesDesign,
                    Iteration=x.Iteration,
                    ComplexTestCasesDesign=x.ComplexTestCasesDesign,
                    ComplexTestCasesExecution=x.ComplexTestCasesExecution,
                    SimpleTestCasesExecution=x.SimpleTestCasesExecution,
                    TestingSubphase=x.TestingSubphase,
                    MediumTestCasesExecution=x.MediumTestCasesExecution,
                    NormalizedTestCasesDesign=x.NormalizedTestCasesDesign,
                    NormalizedTestCasesExecution=x.NormalizedTestCasesExecution,
                    PlannedEndDateExecution=x.PlannedEndDateExecution,
                    PlannedStartDateExecution=x.PlannedStartDateExecution,
                    SimpleTestCasesDesign=x.SimpleTestCasesDesign,
                    VeryComplexTestCasesDesign=x.VeryComplexTestCasesDesign,
                    VeryComplexTestCasesExecution=x.VeryComplexTestCasesExecution,
                }).ToList();
                db.TestingDataStagings.AddRange(obj);
                db.SaveChanges();
            }
            return null;
        }
    }
}