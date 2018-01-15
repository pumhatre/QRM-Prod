USE [QRMPortal]
CREATE PROCEDURE [dbo].[UspGetEfforttagingData] 
	-- Add the parameters for the stored procedure here
	@Project VARCHAR(50),
	@Month VARCHAR(25),
	@Release Int 
	
AS

BEGIN TRY

BEGIN
	
	SELECT
	EffortDataStagingId,	
	ObjectComponentID,
	ActualEffort,
	BaselinedEffort,
	ActualStartDate,
	ActualEndDate,
	CMMIRollUp,
	Complexity,
	ComponentName,
	ComponentType,
	Module,
	MonthId,
	ProjectID,
	ProjectMasterId,
	ProjectReleaseId,
	Release,
	Remarks,
	ReviewType,
	SEQ,
	ScheduledStartDate,
	ScheduledEndDate,
	[Status],
	TaskType,
	WidgetType

	FROM dbo.EffortDataStaging
	WHERE ProjectMasterId = @Project AND MonthId = @Month AND ProjectReleaseId = @Release
	
END

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



