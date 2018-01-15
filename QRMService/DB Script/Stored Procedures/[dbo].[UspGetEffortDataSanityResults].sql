CREATE PROCEDURE [dbo].[UspGetEffortDataSanityResults] 
	-- Add the parameters for the stored procedure here
	@Project VARCHAR(50),
	@Month VARCHAR(25),
	@Release Int 
	
AS
BEGIN TRY

	IF  OBJECT_ID('Tempdb..#tmpEffortSanityResult') IS NOT NULL
	BEGIN DROP TABLE  #tmpEffortSanityResult END
		
	SELECT
	ES.EffortDataStagingId,
	CASE WHEN ( SELECT COUNT(1) FROM dbo.ReferenceTable WHERE ReferenceTableName = 'EffortTaskType' AND ReferenceValue = ES.TaskType ) = 1 THEN CAST(1 AS bit) ELSE  CAST(0 AS bit) END AS IsValidTaskType ,
	CASE WHEN ( SELECT COUNT(1) FROM dbo.ReferenceTable WHERE ReferenceTableName = 'EffortStatus' AND ReferenceValue = ES.Status ) = 1 THEN CAST(1 AS bit) ELSE  CAST(0 AS bit) END AS IsValidStatus ,
	CASE WHEN ( SELECT COUNT(1) FROM dbo.ReferenceTable WHERE ReferenceTableName = 'ComponentType' AND ReferenceValue = ES.ComponentType ) = 1 THEN CAST(1 AS bit) ELSE  CAST(0 AS bit) END AS IsValidComponentType,
	CASE WHEN ( SELECT COUNT(1) FROM dbo.ReferenceTable WHERE ReferenceTableName = 'EffortWidgetType' AND ReferenceValue = ES.WidgetType ) = 1 THEN CAST(1 AS bit) ELSE  CAST(0 AS bit) END AS IsValidWidgetType,
	CASE WHEN ( SELECT COUNT(1) FROM dbo.ReferenceTable WHERE ReferenceTableName = 'Complexity' AND ReferenceValue = ES.Complexity ) = 1 THEN CAST(1 AS bit) ELSE  CAST(0 AS bit)END AS IsValidComplexity,
	CASE WHEN ( SELECT COUNT(1) FROM dbo.ReferenceTable WHERE ReferenceTableName = 'CMMIRollUp' AND ReferenceValue = ES.CMMIRollUp ) = 1 THEN CAST(1 AS bit) ELSE  CAST(0 AS bit) END AS IsValidCMMIRollup,
	--CASE WHEN ( SELECT COUNT(1) FROM dbo.ReferenceTable WHERE ReferenceTableName = 'ReviewType' AND ReferenceValue = ES.ReviewType ) = 1 THEN CAST(1 AS bit) ELSE  CAST(0 AS bit) END AS IsValidReviewType,
	CAST(1 AS bit) AS IsValidReviewType

	INTO #tmpEffortSanityResult

	FROM dbo.EffortDataStaging ES
	
	WHERE ProjectMasterId = @Project AND MonthId = @Month AND ProjectReleaseId = @Release



	SELECT EffortDataStagingId,
	 IsValidTaskType,
	 IsValidStatus,
	 IsValidComponentType,
	 IsValidWidgetType,
	 IsValidComplexity,
	 IsValidCMMIRollup,
	 IsValidReviewType

	 FROM #tmpEffortSanityResult

-- Drop Temp Tables
	DROP TABLE #tmpEffortSanityResult
	
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


