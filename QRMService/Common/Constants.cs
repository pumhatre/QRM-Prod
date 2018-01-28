using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Common
{
    public class Constants
    {
        public const string ServiceLineTableName = "ServiceLine";
        public const string TechnologyTableName = "Technology";
        public const string IndustryTableName = "Industry";
        public const string UspGetDefectStagingData = "[Dbo].[UspGetDefectStagingData]";
        public const string UspGetEffortStagingData = "[Dbo].[UspGetEfforttagingData]";
        public const string UspGetEffortMasterData = "[Dbo].[UspGetEffortMasterData]";
        public const string UspGetEffortDataSanityResults = "[Dbo].[UspGetEffortDataSanityResults]";
        public const string UspSaveEffortDetailData = "[Dbo].[UspSaveEffortDetailData]";
        public const string UspGetDefectDataSanityResults = "[Dbo].[UspGetDefectDataSanityResults]";
        public const string UspSaveDefectDetailData = "[Dbo].[UspSaveDefectDetailData]";
        public const string UspGetTestStagingData = "[Dbo].[UspGetTestStagingData]";
        public const string UspSaveTestingDetailData = "[Dbo].[UspSaveTestDetailData]";

        public enum EffortTablesColumnName
        {
            EffortDataStagingId,
            ActualEffort,
            ActualEndDate,
            ActualStartDate,
            BaselinedEffort,
            CMMIRollUp,
            Complexity,
            ComponentName,
            ComponentType,
            Module,
            MonthId,
            ObjectComponentID,
            ProjectID,
            ProjectMasterId,
            ProjectReleaseId,
            Release,
            Remarks,
            ReviewType,
            SEQ,
            ScheduledEndDate,
            ScheduledStartDate,
            Status,
            TaskType,
            WidgetType
        }

        public enum EffortSanityValidationColumnName
        {
            EffortDataStagingId,
            ObjectComponentID,
            TaskType,
            Status,
            ComponentType,
            WidgetType,
            Complexity,
            CMMIRollUp,

            IsValidTaskType,
            IsValidStatus,
            IsValidComponentType,
            IsValidWidgetType,
            IsValidComplexity,
            IsValidCMMIRollup,
            IsValidReviewType
        }

        public enum DefectTablesColumnName
        {
            DefectDataStagingId,
            DefectID,
            WidgetComponentID,
            DetectedStage,
            ReportedDate,
            ReportedBy,
            DefectDescription,
            Status,
            DefectInfectedStage,
            ExpectedDetectionPhase,
            DefectType,
            Cause,
            ReviewType,
            DefectSeverity,
            FixedOnDate,
            Remarks,
            ProjectId,
            ProjectReleaseId,
            MonthId
        }

        public enum DefectSanityValidationColumnName
        {
            DefectDataStagingId,
            DetectedStage,
            Status,
            DefectInfectedStage,
            ExpectedDetectionPhase,
            DefectType,
            Cause,
            DefectSeverity,
            ReviewType,

            IsValidDefectDetectedStage,
            IsValidDefectStatus,
            IsValidDefectInjectedStage,
            IsValidExpectedDetectionPhase,
            IsValidDefectType,
            IsValidDefectCause,
            IsValidDefectSeverity,
            IsValidReviewType
        }

        //public enum TestTablesColumnName
        //{
        //    TestingDataStagingId,
        //    TestingPhase,
        //    TestingType,
        //    Module,
        //    Release,

        //}

    }

 
}