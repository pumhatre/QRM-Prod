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

        public const string UspGetProjectEffortDashboard = "[Dbo].[uspGenerateProjectEffortDashboard]";
        public const string UspGetProjectTestingDashboard = "[Dbo].[uspGenerateProjectTestingDashboard]";
        public const string UspGetProjectDefectDashboard = "[Dbo].[uspGenerateProjectDefectsDashboard]";
        public const string UspGetProjectWidgetDashboard = "[Dbo].[uspGenerateProjectWidgetDashboard]";
        public const string UspGetProjectPerformanceDashboard = "[Dbo].[uspGenerateProjectvarianceDashboard]";

        public const string UspGetProjectEffortDashboardByProject = "[Dbo].[uspGetProjectEffortDashboardByProject]";
        public const string UspGetProjectTestingDashboardByProject = "[Dbo].[uspGetProjectTestingDashboardByProject]";
        public const string UspGetProjectDefectDashboardByProject = "[Dbo].[uspGetProjectDefectsDashboardByProject]";
        public const string UspGetProjectWidgetDashboardByProject = "[Dbo].[uspGetProjectWidgetDashboardByProject]";
        public const string UspGetProjectVarianceDashboardByProject = "[Dbo].[uspGetProjectVarianceDashboardByProject]";
        public const string UspExecuteDashboard = "[Dbo].[ExecuteMatricsProcedure]";
        public const string UspGetProjectData = "[Dbo].[UspGetProjectData]";


        #region Charts
        public const string UspGetEffortDistribution = "[Dbo].[uspGetEffortDistribution]";
        public const string UspGetTestCaseEffortDistribution = "[Dbo].[uspGetTestCaseEffortDistribution]";
        public const string UspGetTestCaseComplexityDistribution = "[Dbo].[uspGetTestCaseComplexityDistribution]";
        public const string UspGetDefectDetectedPhaseDistribution = "[Dbo].[uspGetDefectDetectedPhaseDistribution]";
        public const string UspGetDevelopementWidgetDashboard = "[Dbo].[uspGetDevelopementWidgetDashboard]";
        public const string UspGetSITDefectSeverityDistribution = "[Dbo].[uspGetSITDefectSeverityDistribution]";
        public const string UspGetDefectTypeDistribution = "[Dbo].[uspGetDefectTypeDistribution]";
        #endregion


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
            ErrorDescription,
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
            WidgetComponentId,
            DetectedStage,
            Status,
            DefectInfectedStage,
            ExpectedDetectionPhase,
            DefectType,
            Cause,
            DefectSeverity,
            ReviewType,
            ValidInjectedDetectedPhase,
            ValidDefectTypeCause,

            IsValidDefectDetectedStage,
            IsValidDefectStatus,
            IsValidDefectInjectedStage,
            IsValidExpectedDetectionPhase,
            IsValidDefectType,
            IsValidDefectCause,
            IsValidDefectSeverity,
            IsValidReviewType,
            IsValidInjectedDetectedPhase,
            IsValidDefectTypeCause

        }


        public enum ProjectEffortColumnName
        {
            DashBoardType,
            DashboardSubtype,
            Complete,
            Total,
            WorkinProgress,
            NotStarted,
            ReleaseId,
            MonthId

        }
        public enum ProjectTestingColumnName
        {
            DashBoardType,
            DashboardSubtype,
            PRESITComponent,
            PRESITE2E,
            SITComponent,
            SITE2E
        }
        public enum ProjectDefectColumnName
        {
            Overall,
            Rejected,
            Closed,
            Open,
            DashBoardType
        }

        public enum ProjectWidgetColumnName
        {
            DashBoardType,
            DashboardSubtype,
            CompleteHours,
            WipHours,
            NotStartedHours,
            TotalHours
        }

        public enum ProjectColumnName
        {
            userId ,
            firstName ,
            middleName,
            lastName,
            email,
            phone,
            roleId ,
            roleName ,
            projectName ,
            projectId,
            userProjectRoleId,
        }

        public enum ProjectVarianceColumnName
        {
            DashBoardType,
            EffortVariance,
            Rework,
            UnitTestEffectiveness,
            SystemTestEffectiveness,
            SITDefectDetectionRate,
            ComponentDefectRejectionRate,
            E2EDefectRejectionRate
        }

        public enum ProjectEffortDistributionColumnName
        {
            EffortType,
            PlannedEffortPercentage,
            ActualEffortPercentage
        }

        //public enum TestTablesColumnName
        //{
        //    TestingDataStagingId,
        //    TestingPhase,
        //    TestingType,
        //    Module,
        //    Release,

        //}

        public enum ProjectWidgetDashboardColumns
        {
            Weekend,
            PlannedCount,
            CompletedCount
        }

        public enum DefectDistributionColumns
        {
            DefectSeverity,
            DefectType,
            DefectCount,
            CountPercentage
        }
    }


}