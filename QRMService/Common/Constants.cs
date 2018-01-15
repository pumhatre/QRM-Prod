﻿using System;
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
            IsValidTaskType,
            IsValidStatus,
            IsValidComponentType,
            IsValidWidgetType,
            IsValidComplexity,
            IsValidCMMIRollup,
            IsValidReviewType
        }
    }

 
}