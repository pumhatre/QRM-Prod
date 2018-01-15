CREATE PROCEDURE [dbo].[UspSaveEffortDetailData] @EffortStagingIds [dbo].[udttEffortDataStagingType] READONLY,
	
	@Project VARCHAR(50),
	@Month VARCHAR(25),
	@Release Int 
	
AS
BEGIN TRY

	IF EXISTS(SELECT 1 FROM @EffortStagingIds)

	BEGIN
	IF OBJECT_ID('Tempdb..#tmpEffortStagingIds') IS NOT NULL
	BEGIN DROP TABLE #tmpEffortStagingIds END
	SELECT EffortDataStagingId
	INTO #tmpEffortStagingIds
	FROM @EffortStagingIds

	-- INSERT DATA INTO EFFORTDETAIL TABLES
	INSERT INTO dbo.EffortDetails(
			[ComponentId]
           ,[ComponentTypeCode]
           ,[ComplexityCode]
           ,[TaskTypeCode]
           ,[BaselineEffort]
           ,[ActualEffort]
           ,[StatusCode]
           ,[CMMIRollUpCode]
           ,[ScheduledStartDate]
           ,[ScheduledEndDate]
           ,[ActualStartDate]
           ,[ActualEndDate]
           ,[ProjectId]
           ,[ReleaseId]
           ,[ModuleName]
           ,[ComponentName]
           ,[ReviewTypeCode]
           ,[Remarks]
           ,[ProjectReleaseId]
           ,[MonthId]
           ,[WidgetType]
           ,[ProjectMasterId])

	SELECT 
	[ObjectComponentID],
	ComponentType,
	Complexity,
	TaskType,
	BaselinedEffort,
	ActualEffort,
	[Status],
	CMMIRollUp,
	ScheduledStartDate,
	ScheduledEndDate,
	ActualStartDate,
	ActualEndDate,
	ProjectId,
	Release,
	Module,
	ComponentName,
	ReviewType,
	Remarks,
	ProjectReleaseId,
	MonthId,
	NULL,
	ProjectMasterID

	FROM
	dbo.EffortDataStaging
	WHERE EffortDataStagingId NOT IN (SELECT EffortDataStagingId FROM #tmpEffortStagingIds)
	AND ProjectMasterId = @Project AND MonthId = @Month AND ProjectReleaseId = @Release


	END
	ELSE
	BEGIN
	-- INSERT DATA INTO EFFORTDETAIL TABLES
	INSERT INTO dbo.EffortDetails(
			[ComponentId]
           ,[ComponentTypeCode]
           ,[ComplexityCode]
           ,[TaskTypeCode]
           ,[BaselineEffort]
           ,[ActualEffort]
           ,[StatusCode]
           ,[CMMIRollUpCode]
           ,[ScheduledStartDate]
           ,[ScheduledEndDate]
           ,[ActualStartDate]
           ,[ActualEndDate]
           ,[ProjectId]
           ,[ReleaseId]
           ,[ModuleName]
           ,[ComponentName]
           ,[ReviewTypeCode]
           ,[Remarks]
           ,[ProjectReleaseId]
           ,[MonthId]
           ,[WidgetType]
           ,[ProjectMasterId])

	SELECT 
	[ObjectComponentID],
	ComponentType,
	Complexity,
	TaskType,
	BaselinedEffort,
	ActualEffort,
	[Status],
	CMMIRollUp,
	ScheduledStartDate,
	ScheduledEndDate,
	ActualStartDate,
	ActualEndDate,
	ProjectId,
	Release,
	Module,
	ComponentName,
	ReviewType,
	Remarks,
	ProjectReleaseId,
	MonthId,
	NULL,
	ProjectMasterID

	FROM
	dbo.EffortDataStaging 
	WHERE ProjectMasterId = @Project AND MonthId = @Month AND ProjectReleaseId = @Release
	END

-- Drop Temp Tables
	DROP TABLE #tmpEffortStagingIds
	
END TRY

BEGIN CATCH


		-- Error Handling Code


			DECLARE @error_seq INT


			DECLARE @ErrorNumber INT


			DECLARE @ErrorSeverity INT


			DECLARE @ErrorState INT


			DECLARE @ErrorProcedure NVARCHAR(126)


			DECLARE @ErrorLine INT


			DECLARE @ErrorMessage NVARCHAR(4000)


			SELECT


				@ErrorNumber    = ERROR_NUMBER(),


				@ErrorSeverity  = ERROR_SEVERITY(),


				@ErrorState     = ERROR_STATE(),


				@ErrorProcedure = ERROR_PROCEDURE(),


				@ErrorLine      = ERROR_LINE(),


				@ErrorMessage   = ERROR_MESSAGE();


			RAISERROR( 'Error #: %d in %s . Message:%s', @ErrorSeverity, @ErrorState, @error_seq, 


						@ErrorProcedure,  @ErrorMessage )


END CATCH
GO


