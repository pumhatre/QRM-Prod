USE [master]
GO
/****** Object:  Database [QRMPortal]    Script Date: 9/25/2017 10:50:46 AM ******/
CREATE DATABASE [QRMPortal]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'QRMPortal', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\QRMPortal.mdf' , SIZE = 4096KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'QRMPortal_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\QRMPortal_log.ldf' , SIZE = 3072KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [QRMPortal] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [QRMPortal].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [QRMPortal] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [QRMPortal] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [QRMPortal] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [QRMPortal] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [QRMPortal] SET ARITHABORT OFF 
GO
ALTER DATABASE [QRMPortal] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [QRMPortal] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [QRMPortal] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [QRMPortal] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [QRMPortal] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [QRMPortal] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [QRMPortal] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [QRMPortal] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [QRMPortal] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [QRMPortal] SET  DISABLE_BROKER 
GO
ALTER DATABASE [QRMPortal] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [QRMPortal] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [QRMPortal] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [QRMPortal] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [QRMPortal] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [QRMPortal] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [QRMPortal] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [QRMPortal] SET RECOVERY FULL 
GO
ALTER DATABASE [QRMPortal] SET  MULTI_USER 
GO
ALTER DATABASE [QRMPortal] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [QRMPortal] SET DB_CHAINING OFF 
GO
ALTER DATABASE [QRMPortal] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [QRMPortal] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [QRMPortal] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'QRMPortal', N'ON'
GO
USE [QRMPortal]
GO
/****** Object:  Table [dbo].[DefectDataDetails]    Script Date: 9/25/2017 10:50:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[DefectDataDetails](
	[DefectDataDetailsId] [int] IDENTITY(1,1) NOT NULL,
	[DefectID] [varchar](50) NULL,
	[DetectedStage] [varchar](50) NULL,
	[ReportedDate] [datetime] NULL,
	[ReportedBy] [varchar](50) NULL,
	[DefectDescription] [varchar](max) NULL,
	[Status] [varchar](50) NULL,
	[DefectInfectedStage] [varchar](50) NULL,
	[ExpectedDetectionPhase] [varchar](50) NULL,
	[DefectType] [varchar](100) NULL,
	[Cause] [varchar](100) NULL,
	[ReviewType] [varbinary](50) NULL,
	[DefectSeverity] [varchar](50) NULL,
	[FixedOnDate] [datetime] NULL,
	[Remarks] [varchar](max) NULL,
	[ProjectId] [int] NOT NULL,
	[ProjectReleaseId] [int] NULL,
	[MonthId] [int] NULL,
 CONSTRAINT [PK_DefectDataDetails] PRIMARY KEY CLUSTERED 
(
	[DefectDataDetailsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[DefectDataStaging]    Script Date: 9/25/2017 10:50:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[DefectDataStaging](
	[DefectDataStagingId] [int] IDENTITY(1,1) NOT NULL,
	[DefectID] [varchar](50) NULL,
	[WidgetComponentID] [varchar](50) NULL,
	[DetectedStage] [varchar](50) NULL,
	[ReportedDate] [datetime] NULL,
	[ReportedBy] [varchar](50) NULL,
	[DefectDescription] [varchar](max) NULL,
	[Status] [varchar](50) NULL,
	[DefectInfectedStage] [varchar](50) NULL,
	[ExpectedDetectionPhase] [varchar](50) NULL,
	[DefectType] [varchar](100) NULL,
	[Cause] [varchar](100) NULL,
	[ReviewType] [varbinary](50) NULL,
	[DefectSeverity] [varchar](50) NULL,
	[FixedOnDate] [datetime] NULL,
	[Remarks] [varchar](max) NULL,
	[PeriodId] [int] NOT NULL,
	[ProjectId] [int] NOT NULL,
	[ProjectReleaseId] [int] NULL,
	[MonthId] [int] NULL,
 CONSTRAINT [PK_DefectDataStaging] PRIMARY KEY CLUSTERED 
(
	[DefectDataStagingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[DevMetrics]    Script Date: 9/25/2017 10:50:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[DevMetrics](
	[ProjectId] [int] NOT NULL,
	[ReleaseIteration] [varchar](50) NULL,
	[Module] [varchar](50) NULL,
	[WidgetID] [varchar](50) NULL,
	[ComponentType] [varchar](50) NULL,
	[WidgetType] [varchar](50) NULL,
	[Complexity] [varchar](50) NULL,
	[Status] [varchar](50) NULL,
	[ComplexityPoints] [int] NULL,
	[PlannedEffort] [float] NULL,
	[PEFDDDevelopment] [float] NULL,
	[PEFDDReview] [float] NULL,
	[PEFDDRework] [float] NULL,
	[PETDDDevelopment] [float] NULL,
	[PETDDReview] [float] NULL,
	[PETDDRework] [float] NULL,
	[PECoding] [float] NULL,
	[PECodeReview] [float] NULL,
	[PEUTCPreparation] [float] NULL,
	[PEUTCReview] [float] NULL,
	[PEUTCExecution] [float] NULL,
	[PECUTRework] [float] NULL,
	[PEOtherRework] [float] NULL,
	[ActualEffort] [float] NULL,
	[AEFDDDevelopment] [float] NULL,
	[AEFDDReview] [float] NULL,
	[AEFDDRework] [float] NULL,
	[AETDDDevelopment] [float] NULL,
	[AETDDReview] [float] NULL,
	[AETDDRework] [float] NULL,
	[AECoding] [float] NULL,
	[AECodeReview] [float] NULL,
	[AEUTCPreparation] [float] NULL,
	[AEUTCReview] [float] NULL,
	[AEUTCExecution] [float] NULL,
	[AECUTRework] [float] NULL,
	[AEOtherRework] [float] NULL,
	[TotalDEVdefects] [float] NULL,
	[FDDReviewDefects] [float] NULL,
	[TDDReviewDefects] [float] NULL,
	[CodeReviewDefects] [float] NULL,
	[UTCReviewDefects] [float] NULL,
	[UnitTestingDefects] [float] NULL,
	[TotalDEVDD] [float] NULL,
	[FDDDD] [float] NULL,
	[TDDDD] [float] NULL,
	[CodeReviewDD] [float] NULL,
	[UTCReviewDD] [float] NULL,
	[UnitTestingDD] [float] NULL,
	[TotalDEVDDR] [float] NULL,
	[FDDDDR] [float] NULL,
	[TDDDDR] [float] NULL,
	[CodeReviewDDR] [float] NULL,
	[UTCReviewDDR] [float] NULL,
	[UnitTestingDDR] [float] NULL,
	[TotalDEVProductivity] [float] NULL,
	[FDDProductivity] [float] NULL,
	[TDDProductivity] [float] NULL,
	[CodingProductivity] [float] NULL,
	[UTProductivity] [float] NULL,
	[PlannedStartdate] [datetime] NULL,
	[PlannedEnddate] [datetime] NULL,
	[ActualStartDate] [datetime] NULL,
	[ActualEndDate] [datetime] NULL,
	[ProjectReleaseId] [int] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[EffortDataStaging]    Script Date: 9/25/2017 10:50:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[EffortDataStaging](
	[ObjectComponentID] [varchar](50) NULL,
	[ComponentType] [varchar](50) NULL,
	[WidgetType] [varchar](50) NULL,
	[Complexity] [varchar](50) NULL,
	[TaskType] [varchar](50) NULL,
	[BaselinedEffort] [numeric](18, 0) NULL,
	[ActualEffort] [numeric](18, 0) NULL,
	[Status] [varchar](50) NULL,
	[CMMIRollUp] [varchar](50) NULL,
	[SEQ] [varchar](50) NULL,
	[ScheduledStartDate] [datetime] NULL,
	[ScheduledEndDate] [datetime] NULL,
	[ActualStartDate] [datetime] NULL,
	[ActualEndDate] [datetime] NULL,
	[ProjectID] [int] NOT NULL,
	[Release] [varchar](50) NULL,
	[Module] [varchar](50) NULL,
	[ComponentName] [varchar](50) NULL,
	[ReviewType] [varbinary](50) NULL,
	[Remarks] [varchar](max) NULL,
	[ProjectReleaseId] [int] NULL,
	[MonthId] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[EffortDetails]    Script Date: 9/25/2017 10:50:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[EffortDetails](
	[EffortId] [int] IDENTITY(1,1) NOT NULL,
	[ComponentId] [int] NULL,
	[ComponentTypeCode] [nvarchar](20) NULL,
	[ComplexityCode] [nvarchar](20) NULL,
	[TaskTypeCode] [nvarchar](20) NULL,
	[BaselineEffort] [int] NULL,
	[ActualEffort] [int] NULL,
	[StatusCode] [nvarchar](20) NULL,
	[CMMIRollUpCode] [nvarchar](20) NULL,
	[ScheduledStartDate] [date] NULL,
	[ScheduledEndDate] [date] NULL,
	[ActualStartDate] [date] NULL,
	[ActualEndDate] [date] NULL,
	[ProjectId] [int] NULL,
	[ReleaseId] [int] NULL,
	[ModuleName] [nvarchar](50) NULL,
	[ComponentName] [nvarchar](500) NULL,
	[ReviewTypeCode] [nvarchar](20) NULL,
	[Remarks] [nvarchar](500) NULL,
	[ProjectReleaseId] [int] NULL,
	[MonthId] [int] NULL,
	[WidgetType] [varchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[MetricMaster]    Script Date: 9/25/2017 10:50:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[MetricMaster](
	[MetricMasterID] [int] IDENTITY(1,1) NOT NULL,
	[MetricCategoryCode] [nvarchar](10) NULL,
	[MetricCategoryDescription] [nvarchar](500) NULL,
	[MetricSubCategoryCode] [nvarchar](10) NULL,
	[MetricSubCategoryDescription] [nvarchar](10) NULL,
	[MetricTypeCode] [nvarchar](10) NULL,
	[MetricTypeDescription] [nvarchar](10) NULL,
	[IsActive] [bit] NULL,
	[MetricsDescription] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[MetricMasterID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[MonthMaster]    Script Date: 9/25/2017 10:50:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[MonthMaster](
	[MonthId] [int] IDENTITY(1,1) NOT NULL,
	[MonthName] [varchar](3) NOT NULL,
	[Year] [int] NOT NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[SortOrder] [int] NULL,
 CONSTRAINT [PK_Period] PRIMARY KEY CLUSTERED 
(
	[MonthId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Period]    Script Date: 9/25/2017 10:50:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Period](
	[PeriodId] [int] IDENTITY(1,1) NOT NULL,
	[PeriodName] [varchar](50) NOT NULL,
	[Year] [int] NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NOT NULL,
	[SortOrder] [int] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PreferredReportMetricsAssociation]    Script Date: 9/25/2017 10:50:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PreferredReportMetricsAssociation](
	[PreferredReportMetricsAssociationID] [int] IDENTITY(1,1) NOT NULL,
	[ProjectReleaseID] [int] NULL,
	[MonthId] [int] NULL,
	[MetricAssociationID] [int] NULL,
	[UserReportAssociationID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[PreferredReportMetricsAssociationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ProjectMaster]    Script Date: 9/25/2017 10:50:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ProjectMaster](
	[ProjectID] [int] IDENTITY(1,1) NOT NULL,
	[ProjectName] [varchar](max) NULL,
	[ServiceLine] [varchar](50) NULL,
	[Capability] [varchar](50) NULL,
	[ProjectManager] [nvarchar](100) NULL,
	[ClientName] [nvarchar](100) NULL,
	[StartDate] [datetime] NULL,
	[Enddate] [datetime] NULL,
	[GDM] [nvarchar](50) NULL,
	[Technology] [varchar](100) NULL,
	[Industry] [varchar](100) NULL,
	[LifeCycle] [varchar](100) NULL,
	[Solution] [varchar](100) NULL,
	[Director] [varchar](100) NULL,
	[SeniorManager] [varchar](100) NULL,
	[ProjectStartDate] [datetime] NULL,
	[ProjectEndDate] [datetime] NULL,
	[IsActive] [bit] NULL CONSTRAINT [DF_ProjectMaster_IsActive]  DEFAULT ((1)),
 CONSTRAINT [PK_ProjectMaster] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ProjectMetricAssociation]    Script Date: 9/25/2017 10:50:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectMetricAssociation](
	[ProjectMetricAssociationID] [int] IDENTITY(1,1) NOT NULL,
	[MetricMasterID] [int] NOT NULL,
	[IsActive] [bit] NULL,
	[MonthId] [int] NULL,
	[ProjectId] [int] NOT NULL,
	[ReleaseId] [int] NOT NULL,
 CONSTRAINT [PK__ProjectM__57485570605D2B9E] PRIMARY KEY CLUSTERED 
(
	[ProjectMetricAssociationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ProjectReleaseMaster]    Script Date: 9/25/2017 10:50:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectReleaseMaster](
	[ProjectReleaseId] [int] IDENTITY(1,1) NOT NULL,
	[ProjectID] [int] NOT NULL,
	[ReleaseName] [nvarchar](100) NOT NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_Project_ReleaseId] PRIMARY KEY CLUSTERED 
(
	[ProjectReleaseId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


GO
/****** Object:  Table [dbo].[ProjectWidgetDetails]    Script Date: 9/25/2017 10:50:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ProjectWidgetDetails](
	[ProjectWidgetDetailID] [int] IDENTITY(1,1) NOT NULL,
	[ProjectID] [int] NOT NULL,
	[WidgetName] [varchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ReferenceTable]    Script Date: 9/25/2017 10:50:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ReferenceTable](
	[ReferenceTableId] [int] NOT NULL,
	[ReferenceTableName] [varchar](50) NULL,
	[ReferenceCode] [varchar](10) NULL,
	[ReferenceValue] [varchar](200) NULL,
 CONSTRAINT [PK_ReferenceTable] PRIMARY KEY CLUSTERED 
(
	[ReferenceTableId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[RoleMaster]    Script Date: 9/25/2017 10:50:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[RoleMaster](
	[RoleId] [int] NOT NULL,
	[RoleName] [varchar](50) NULL,
	[IsActive] [char](1) NULL,
 CONSTRAINT [PK_RoleMasterTable] PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TestingDataStaging]    Script Date: 9/25/2017 10:50:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TestingDataStaging](
	[TestingDataStagingId] [int] IDENTITY(1,1) NOT NULL,
	[TestingPhase] [varchar](50) NULL,
	[TestingType] [varchar](50) NULL,
	[Module] [varchar](50) NULL,
	[Release] [varchar](50) NULL,
	[PlannedNoOfTestCasesDesigned] [int] NULL,
	[ActualNumberOfTestCasesDesigned] [int] NULL,
	[NoOfTestCasesReviewComments] [int] NULL,
	[PlannedStartDate] [datetime] NULL,
	[PlannedEndDate] [datetime] NULL,
	[ActualStartDate] [datetime] NULL,
	[ActualEndDate] [datetime] NULL,
	[TestDesignStatus] [varchar](50) NULL,
	[TestCasePreparationPlanned] [numeric](18, 2) NULL,
	[TestCaseReviewPlanned] [numeric](18, 2) NULL,
	[TestCaseReworkPlanned] [numeric](18, 2) NULL,
	[TestCasePreparationActual] [numeric](18, 2) NULL,
	[TestCaseReviewActual] [numeric](18, 2) NULL,
	[TestCaseReworkActual] [numeric](18, 2) NULL,
	[TestCasedPlannedForExecution] [int] NULL,
	[PlannedEffortforExecution] [numeric](18, 2) NULL,
	[ExecutionStatus] [varchar](50) NULL,
	[TestCasesExecuted] [int] NULL,
	[ActualEffortForExecution] [numeric](18, 2) NULL,
	[TotalCasesPassed] [int] NULL,
	[DefectsFound] [int] NULL,
	[DefectsRejected] [int] NULL,
	[ProjectId] [int] NOT NULL,
	[ProjectReleaseId] [int] NULL,
	[MonthId] [int] NULL,
	[Iteration] [varchar](100) NULL,
	[TestingSubphase] [varchar](100) NULL,
	[SimpleTestCasesDesign] [int] NULL,
	[MediumTestCasesDesign] [int] NULL,
	[ComplexTestCasesDesign] [int] NULL,
	[VeryComplexTestCasesDesign] [int] NULL,
	[SimpleTestCasesExecution] [int] NULL,
	[MediumTestCasesExecution] [int] NULL,
	[ComplexTestCasesExecution] [int] NULL,
	[VeryComplexTestCasesExecution] [int] NULL,
 CONSTRAINT [PK_TestingDataStaging] PRIMARY KEY CLUSTERED 
(
	[TestingDataStagingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TestingDetails]    Script Date: 9/25/2017 10:50:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TestingDetails](
	[TestingDetailsID] [int] IDENTITY(1,1) NOT NULL,
	[TestingPhaseCode] [nvarchar](50) NULL,
	[TestingTypeCode] [nvarchar](50) NULL,
	[ReleaseId] [int] NULL,
	[PlannedNumberOfTestCasesDesigned] [int] NULL,
	[ActualNumberOfTestCasesDesigned] [int] NULL,
	[PlannedStartDate] [datetime] NULL,
	[PlannedEndDate] [datetime] NULL,
	[ActualStartDate] [datetime] NULL,
	[ActualEndDate] [datetime] NULL,
	[TestDesignStatusCode] [nvarchar](50) NULL,
	[TestExecutionTypeCode] [nvarchar](50) NULL,
	[TestCasePreparationPlannedEffort] [float] NULL,
	[TestCaseReviewPlannedEffort] [float] NULL,
	[TestCaseReworkPlannedEffort] [float] NULL,
	[TestCasePreparationActualEffort] [float] NULL,
	[TestCaseReviewActualEffort] [float] NULL,
	[TestCaseReworkActualEffort] [float] NULL,
	[NumberOfTestCasesPlannedForExecution] [int] NULL,
	[PlannedEffortForTestCaseExecution] [int] NULL,
	[ExecutionStatusCode] [nvarchar](50) NULL,
	[NumberOfTestCasesExecuted] [int] NULL,
	[ActualEffortForTestCasesExecution] [float] NULL,
	[TotalTestCasesPassed] [int] NULL,
	[TotalDefectsFound] [int] NULL,
	[TotalDefectsRejected] [int] NULL,
	[ProjectId] [int] NOT NULL,
	[ProjectReleaseId] [int] NULL,
	[MonthId] [int] NULL,
	[SimpleTestCasesDesign] [int] NULL,
	[MediumTestCasesDesign] [int] NULL,
	[ComplexTestCasesDesign] [int] NULL,
	[VeryComplexTestCasesDesign] [int] NULL,
	[SimpleTestCasesExecution] [int] NULL,
	[MediumTestCasesExecution] [int] NULL,
	[ComplexTestCasesExecution] [int] NULL,
	[VeryComplexTestCasesExecution] [int] NULL,
	[NoofTestCases] [int] NULL,
	[Iteration] [varchar](100) NULL,
	[TestingSubphase] [varchar](100) NULL,
 CONSTRAINT [PK__TestingD__C219DFD66AE1D132] PRIMARY KEY CLUSTERED 
(
	[TestingDetailsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[UserDetails]    Script Date: 9/25/2017 10:50:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[UserDetails](
	[UserId] [int] NOT NULL,
	[FirstName] [varchar](50) NULL,
	[MiddleName] [varchar](50) NULL,
	[LastName] [varchar](50) NULL,
	[Email] [varchar](50) NULL,
	[Phone] [varchar](50) NULL,
	[UserName] [varchar](50) NULL,
	[Password] [varchar](50) NULL,
 CONSTRAINT [PK_UserDetails] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[UserProjectRoleAssociation]    Script Date: 9/25/2017 10:50:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserProjectRoleAssociation](
	[UserProjectRoleId] [int] NOT NULL,
	[UserId] [int] NULL,
	[RoleId] [int] NULL,
	[ProjectId] [int] NULL,
 CONSTRAINT [PK_UserProjectRoleAssociation] PRIMARY KEY CLUSTERED 
(
	[UserProjectRoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[UserReportAssociation]    Script Date: 9/25/2017 10:50:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[UserReportAssociation](
	[UserReportAssociationID] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[ReportName] [varchar](200) NULL,
	[ProjectReleaseID] [int] NULL,
	[MonthID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[UserReportAssociationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[MetricMaster] ON 

INSERT [dbo].[MetricMaster] ([MetricMasterID], [MetricCategoryCode], [MetricCategoryDescription], [MetricSubCategoryCode], [MetricSubCategoryDescription], [MetricTypeCode], [MetricTypeDescription], [IsActive], [MetricsDescription]) VALUES (1, N'sd', N'sd', N'sd', N'sd', N'sd', N'sd', 1, NULL)
SET IDENTITY_INSERT [dbo].[MetricMaster] OFF
SET IDENTITY_INSERT [dbo].[ProjectMaster] ON 

INSERT [dbo].[ProjectMaster] ([ProjectID], [ProjectName], [ServiceLine], [Capability], [ProjectManager], [ClientName], [StartDate], [Enddate], [GDM], [Technology], [Industry], [LifeCycle], [Solution], [Director], [SeniorManager], [ProjectStartDate], [ProjectEndDate], [IsActive]) VALUES (1, N'State Auto', N'SI', NULL, N'Richard', N'California', CAST(N'2017-01-30 00:00:00.000' AS DateTime), CAST(N'2019-02-12 00:00:00.000' AS DateTime), NULL, N'NET', N'PBS', N'sd', NULL, N'qwsd', N'asas', NULL, NULL, NULL)
INSERT [dbo].[ProjectMaster] ([ProjectID], [ProjectName], [ServiceLine], [Capability], [ProjectManager], [ClientName], [StartDate], [Enddate], [GDM], [Technology], [Industry], [LifeCycle], [Solution], [Director], [SeniorManager], [ProjectStartDate], [ProjectEndDate], [IsActive]) VALUES (2, N'Oregon', N'SI', N'Consulting', N'Richard', N'State of Oregon', CAST(N'2017-01-30 00:00:00.000' AS DateTime), CAST(N'2019-02-12 00:00:00.000' AS DateTime), NULL, N'NET', N'PBS', N'sd', NULL, N'qwe', N'asd', NULL, NULL, NULL)
INSERT [dbo].[ProjectMaster] ([ProjectID], [ProjectName], [ServiceLine], [Capability], [ProjectManager], [ClientName], [StartDate], [Enddate], [GDM], [Technology], [Industry], [LifeCycle], [Solution], [Director], [SeniorManager], [ProjectStartDate], [ProjectEndDate], [IsActive]) VALUES (3, N'Kentucky', N'DD', NULL, N'Harris', N'US', CAST(N'2017-01-30 00:00:00.000' AS DateTime), CAST(N'2019-02-12 00:00:00.000' AS DateTime), NULL, N'JAVA', N'PBS', N'sdsqwe', NULL, N'qweas', N'qwe', NULL, NULL, NULL)
INSERT [dbo].[ProjectMaster] ([ProjectID], [ProjectName], [ServiceLine], [Capability], [ProjectManager], [ClientName], [StartDate], [Enddate], [GDM], [Technology], [Industry], [LifeCycle], [Solution], [Director], [SeniorManager], [ProjectStartDate], [ProjectEndDate], [IsActive]) VALUES (4, N'State Auto', N'SI', NULL, N'Richard', N'California', CAST(N'2017-01-30 00:00:00.000' AS DateTime), CAST(N'2019-02-12 00:00:00.000' AS DateTime), NULL, N'NET', N'PBS', N'qwe', NULL, N'ssds', N'asd', NULL, NULL, 1)
INSERT [dbo].[ProjectMaster] ([ProjectID], [ProjectName], [ServiceLine], [Capability], [ProjectManager], [ClientName], [StartDate], [Enddate], [GDM], [Technology], [Industry], [LifeCycle], [Solution], [Director], [SeniorManager], [ProjectStartDate], [ProjectEndDate], [IsActive]) VALUES (5, N'Oregon', N'SI', NULL, N'Richard', N'State of Oregon', CAST(N'2017-01-30 00:00:00.000' AS DateTime), CAST(N'2019-02-12 00:00:00.000' AS DateTime), NULL, N'NET', N'PBS', N'qwe', NULL, N'qweq', N'ASas', NULL, NULL, 1)
INSERT [dbo].[ProjectMaster] ([ProjectID], [ProjectName], [ServiceLine], [Capability], [ProjectManager], [ClientName], [StartDate], [Enddate], [GDM], [Technology], [Industry], [LifeCycle], [Solution], [Director], [SeniorManager], [ProjectStartDate], [ProjectEndDate], [IsActive]) VALUES (6, N'Kentucky', N'SI', NULL, N'Harris', N'US', CAST(N'2017-01-30 00:00:00.000' AS DateTime), CAST(N'2019-02-12 00:00:00.000' AS DateTime), NULL, N'JAVA', N'PBS', NULL, NULL, N'zzdzd', N'aasas', NULL, NULL, 1)
INSERT [dbo].[ProjectMaster] ([ProjectID], [ProjectName], [ServiceLine], [Capability], [ProjectManager], [ClientName], [StartDate], [Enddate], [GDM], [Technology], [Industry], [LifeCycle], [Solution], [Director], [SeniorManager], [ProjectStartDate], [ProjectEndDate], [IsActive]) VALUES (7, N'State Auto', N'SI', NULL, N'Richard', N'California', CAST(N'2017-01-30 00:00:00.000' AS DateTime), CAST(N'2019-02-12 00:00:00.000' AS DateTime), NULL, N'NET', N'PBS', N'qwe', NULL, N'qwe', N'new', NULL, NULL, 1)
INSERT [dbo].[ProjectMaster] ([ProjectID], [ProjectName], [ServiceLine], [Capability], [ProjectManager], [ClientName], [StartDate], [Enddate], [GDM], [Technology], [Industry], [LifeCycle], [Solution], [Director], [SeniorManager], [ProjectStartDate], [ProjectEndDate], [IsActive]) VALUES (8, N'Oregon', N'SI', N'Consulting', N'Richard', N'State of Oregon', CAST(N'2017-01-30 00:00:00.000' AS DateTime), CAST(N'2019-02-12 00:00:00.000' AS DateTime), NULL, N'NET', N'PBS', N'qwe', N'ads', NULL, N'dasd', NULL, NULL, 1)
INSERT [dbo].[ProjectMaster] ([ProjectID], [ProjectName], [ServiceLine], [Capability], [ProjectManager], [ClientName], [StartDate], [Enddate], [GDM], [Technology], [Industry], [LifeCycle], [Solution], [Director], [SeniorManager], [ProjectStartDate], [ProjectEndDate], [IsActive]) VALUES (9, N'Kentucky', N'SI', NULL, N'Harris', N'US', CAST(N'2017-01-30 00:00:00.000' AS DateTime), CAST(N'2019-02-12 00:00:00.000' AS DateTime), NULL, N'JAVA', N'PBS', N'qwe', NULL, NULL, N'testasas', NULL, NULL, 1)
INSERT [dbo].[ProjectMaster] ([ProjectID], [ProjectName], [ServiceLine], [Capability], [ProjectManager], [ClientName], [StartDate], [Enddate], [GDM], [Technology], [Industry], [LifeCycle], [Solution], [Director], [SeniorManager], [ProjectStartDate], [ProjectEndDate], [IsActive]) VALUES (10, N'State Auto', N'SI', N'Consulting', N'Richard', N'California', CAST(N'2017-01-30 00:00:00.000' AS DateTime), CAST(N'2019-02-12 00:00:00.000' AS DateTime), NULL, N'NET', N'PBS', N'asd', NULL, N'asd', N'asd', NULL, NULL, 1)
INSERT [dbo].[ProjectMaster] ([ProjectID], [ProjectName], [ServiceLine], [Capability], [ProjectManager], [ClientName], [StartDate], [Enddate], [GDM], [Technology], [Industry], [LifeCycle], [Solution], [Director], [SeniorManager], [ProjectStartDate], [ProjectEndDate], [IsActive]) VALUES (11, N'Oregon', N'SI', N'Consulting', N'Richard', N'State of Oregon', CAST(N'2017-01-30 00:00:00.000' AS DateTime), CAST(N'2019-02-12 00:00:00.000' AS DateTime), NULL, N'NET', N'PBS', NULL, NULL, NULL, N'ad', NULL, NULL, 1)
INSERT [dbo].[ProjectMaster] ([ProjectID], [ProjectName], [ServiceLine], [Capability], [ProjectManager], [ClientName], [StartDate], [Enddate], [GDM], [Technology], [Industry], [LifeCycle], [Solution], [Director], [SeniorManager], [ProjectStartDate], [ProjectEndDate], [IsActive]) VALUES (12, N'Kentucky', N'SI', N'Consulting', N'Harris', N'US', CAST(N'2017-01-30 00:00:00.000' AS DateTime), CAST(N'2019-02-12 00:00:00.000' AS DateTime), NULL, N'JAVA', N'PBS', N'qwe', N'a', NULL, N'asd', NULL, NULL, 0)
INSERT [dbo].[ProjectMaster] ([ProjectID], [ProjectName], [ServiceLine], [Capability], [ProjectManager], [ClientName], [StartDate], [Enddate], [GDM], [Technology], [Industry], [LifeCycle], [Solution], [Director], [SeniorManager], [ProjectStartDate], [ProjectEndDate], [IsActive]) VALUES (13, N'test', N'DD', NULL, N'ABhatt', N'OR', NULL, NULL, NULL, N'NET', N'PBS', N'test', NULL, N'test', N'test', NULL, NULL, NULL)
INSERT [dbo].[ProjectMaster] ([ProjectID], [ProjectName], [ServiceLine], [Capability], [ProjectManager], [ClientName], [StartDate], [Enddate], [GDM], [Technology], [Industry], [LifeCycle], [Solution], [Director], [SeniorManager], [ProjectStartDate], [ProjectEndDate], [IsActive]) VALUES (14, N'zxczc', N'DD', NULL, N'zxc', N'zxc', NULL, NULL, NULL, N'JAVA', N'PBS', N'zxc', NULL, N'zxc', N'xzc', NULL, NULL, NULL)
INSERT [dbo].[ProjectMaster] ([ProjectID], [ProjectName], [ServiceLine], [Capability], [ProjectManager], [ClientName], [StartDate], [Enddate], [GDM], [Technology], [Industry], [LifeCycle], [Solution], [Director], [SeniorManager], [ProjectStartDate], [ProjectEndDate], [IsActive]) VALUES (15, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[ProjectMaster] ([ProjectID], [ProjectName], [ServiceLine], [Capability], [ProjectManager], [ClientName], [StartDate], [Enddate], [GDM], [Technology], [Industry], [LifeCycle], [Solution], [Director], [SeniorManager], [ProjectStartDate], [ProjectEndDate], [IsActive]) VALUES (16, N'adsasd', N'SI', NULL, N'asd', N'asd', NULL, NULL, NULL, N'NET', N'PBS', N'asd', NULL, N'asd', N'asd', NULL, NULL, NULL)
INSERT [dbo].[ProjectMaster] ([ProjectID], [ProjectName], [ServiceLine], [Capability], [ProjectManager], [ClientName], [StartDate], [Enddate], [GDM], [Technology], [Industry], [LifeCycle], [Solution], [Director], [SeniorManager], [ProjectStartDate], [ProjectEndDate], [IsActive]) VALUES (17, N'sdsd', N'SI', NULL, N'sd', N'sdsd', NULL, NULL, NULL, N'JAVA', N'PBS', N'sds', NULL, N'sd', N'sd', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[ProjectMaster] OFF
SET IDENTITY_INSERT [dbo].[ProjectReleaseMaster] ON 

INSERT [dbo].[ProjectReleaseMaster] ([ProjectReleaseId], [ProjectID], [ReleaseName]) VALUES (7, 3, N'001')
INSERT [dbo].[ProjectReleaseMaster] ([ProjectReleaseId], [ProjectID], [ReleaseName]) VALUES (8, 3, N'002')
INSERT [dbo].[ProjectReleaseMaster] ([ProjectReleaseId], [ProjectID], [ReleaseName]) VALUES (9, 1, N'R1')
INSERT [dbo].[ProjectReleaseMaster] ([ProjectReleaseId], [ProjectID], [ReleaseName]) VALUES (10, 2, N'OR001')
SET IDENTITY_INSERT [dbo].[ProjectReleaseMaster] OFF
INSERT [dbo].[ReferenceTable] ([ReferenceTableId], [ReferenceTableName], [ReferenceCode], [ReferenceValue]) VALUES (1, N'ServiceLine', N'SI', N'SI')
INSERT [dbo].[ReferenceTable] ([ReferenceTableId], [ReferenceTableName], [ReferenceCode], [ReferenceValue]) VALUES (2, N'ServiceLine', N'DD', N'Deloitte Digital')
INSERT [dbo].[ReferenceTable] ([ReferenceTableId], [ReferenceTableName], [ReferenceCode], [ReferenceValue]) VALUES (3, N'ServiceLine', N'AMS', N'AMS')
INSERT [dbo].[ReferenceTable] ([ReferenceTableId], [ReferenceTableName], [ReferenceCode], [ReferenceValue]) VALUES (4, N'Technology', N'JAVA', N'Java')
INSERT [dbo].[ReferenceTable] ([ReferenceTableId], [ReferenceTableName], [ReferenceCode], [ReferenceValue]) VALUES (5, N'Technology', N'NET', N'Dot Net')
INSERT [dbo].[ReferenceTable] ([ReferenceTableId], [ReferenceTableName], [ReferenceCode], [ReferenceValue]) VALUES (6, N'Technology', N'SLF', N'Salesforce')
INSERT [dbo].[ReferenceTable] ([ReferenceTableId], [ReferenceTableName], [ReferenceCode], [ReferenceValue]) VALUES (7, N'Industry', N'PBS', N'Public Sector')
INSERT [dbo].[ReferenceTable] ([ReferenceTableId], [ReferenceTableName], [ReferenceCode], [ReferenceValue]) VALUES (8, N'Industry', N'INS', N'Insurance')
INSERT [dbo].[ReferenceTable] ([ReferenceTableId], [ReferenceTableName], [ReferenceCode], [ReferenceValue]) VALUES (9, N'Industry', N'CIP', N'C & IP')
INSERT [dbo].[RoleMaster] ([RoleId], [RoleName], [IsActive]) VALUES (1, N'SuperUser', N'1')
INSERT [dbo].[RoleMaster] ([RoleId], [RoleName], [IsActive]) VALUES (2, N'QRMUser', N'1')
INSERT [dbo].[UserDetails] ([UserId], [FirstName], [MiddleName], [LastName], [Email], [Phone], [UserName], [Password]) VALUES (1, N'Super', NULL, N'User', N'superuser@deloitte.com', N'123456', N'superuser', N'1234')
INSERT [dbo].[UserDetails] ([UserId], [FirstName], [MiddleName], [LastName], [Email], [Phone], [UserName], [Password]) VALUES (2, N'QRM', NULL, N'User', N'qrmuser@deloitte.com', N'123456', N'qrmuser', N'1234')
INSERT [dbo].[UserProjectRoleAssociation] ([UserProjectRoleId], [UserId], [RoleId], [ProjectId]) VALUES (1, 1, 1, NULL)
INSERT [dbo].[UserProjectRoleAssociation] ([UserProjectRoleId], [UserId], [RoleId], [ProjectId]) VALUES (2, 2, 2, NULL)
/****** Object:  Index [IX_UserProjectRoleAssociation]    Script Date: 9/25/2017 10:50:46 AM ******/
CREATE NONCLUSTERED INDEX [IX_UserProjectRoleAssociation] ON [dbo].[UserProjectRoleAssociation]
(
	[UserProjectRoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[DefectDataDetails]  WITH CHECK ADD  CONSTRAINT [FK_DefectDataDetails_MonthId] FOREIGN KEY([MonthId])
REFERENCES [dbo].[MonthMaster] ([MonthId])
GO
ALTER TABLE [dbo].[DefectDataDetails] CHECK CONSTRAINT [FK_DefectDataDetails_MonthId]
GO
ALTER TABLE [dbo].[DefectDataDetails]  WITH CHECK ADD  CONSTRAINT [FK_DefectDataDetails_ProjectMaster] FOREIGN KEY([ProjectId])
REFERENCES [dbo].[ProjectMaster] ([ProjectID])
GO
ALTER TABLE [dbo].[DefectDataDetails] CHECK CONSTRAINT [FK_DefectDataDetails_ProjectMaster]
GO
ALTER TABLE [dbo].[DefectDataDetails]  WITH CHECK ADD  CONSTRAINT [FK_DefectDataDetails_ReleaseId] FOREIGN KEY([ProjectReleaseId])
REFERENCES [dbo].[ProjectReleaseMaster] ([ProjectReleaseId])
GO
ALTER TABLE [dbo].[DefectDataDetails] CHECK CONSTRAINT [FK_DefectDataDetails_ReleaseId]
GO
ALTER TABLE [dbo].[DefectDataStaging]  WITH CHECK ADD  CONSTRAINT [FK_DefectDataStaging_MonthId] FOREIGN KEY([MonthId])
REFERENCES [dbo].[MonthMaster] ([MonthId])
GO
ALTER TABLE [dbo].[DefectDataStaging] CHECK CONSTRAINT [FK_DefectDataStaging_MonthId]
GO
ALTER TABLE [dbo].[DefectDataStaging]  WITH CHECK ADD  CONSTRAINT [FK_DefectDataStaging_Period] FOREIGN KEY([PeriodId])
REFERENCES [dbo].[MonthMaster] ([MonthId])
GO
ALTER TABLE [dbo].[DefectDataStaging] CHECK CONSTRAINT [FK_DefectDataStaging_Period]
GO
ALTER TABLE [dbo].[DefectDataStaging]  WITH CHECK ADD  CONSTRAINT [FK_DefectDataStaging_ProjectMaster] FOREIGN KEY([ProjectId])
REFERENCES [dbo].[ProjectMaster] ([ProjectID])
GO
ALTER TABLE [dbo].[DefectDataStaging] CHECK CONSTRAINT [FK_DefectDataStaging_ProjectMaster]
GO
ALTER TABLE [dbo].[DefectDataStaging]  WITH CHECK ADD  CONSTRAINT [FK_DefectDataStaging_ReleaseId] FOREIGN KEY([ProjectReleaseId])
REFERENCES [dbo].[ProjectReleaseMaster] ([ProjectReleaseId])
GO
ALTER TABLE [dbo].[DefectDataStaging] CHECK CONSTRAINT [FK_DefectDataStaging_ReleaseId]
GO
ALTER TABLE [dbo].[DevMetrics]  WITH CHECK ADD  CONSTRAINT [FK_DevMetrics_ProjectMaster] FOREIGN KEY([ProjectId])
REFERENCES [dbo].[ProjectMaster] ([ProjectID])
GO
ALTER TABLE [dbo].[DevMetrics] CHECK CONSTRAINT [FK_DevMetrics_ProjectMaster]
GO
ALTER TABLE [dbo].[DevMetrics]  WITH CHECK ADD  CONSTRAINT [FK_DevMetrics_ReleaseId] FOREIGN KEY([ProjectReleaseId])
REFERENCES [dbo].[ProjectReleaseMaster] ([ProjectReleaseId])
GO
ALTER TABLE [dbo].[DevMetrics] CHECK CONSTRAINT [FK_DevMetrics_ReleaseId]
GO
ALTER TABLE [dbo].[EffortDataStaging]  WITH CHECK ADD  CONSTRAINT [FK_EffortDataStaging_MonthId] FOREIGN KEY([MonthId])
REFERENCES [dbo].[MonthMaster] ([MonthId])
GO
ALTER TABLE [dbo].[EffortDataStaging] CHECK CONSTRAINT [FK_EffortDataStaging_MonthId]
GO
ALTER TABLE [dbo].[EffortDataStaging]  WITH CHECK ADD  CONSTRAINT [FK_EffortDataStaging_ProjectMaster1] FOREIGN KEY([ProjectID])
REFERENCES [dbo].[ProjectMaster] ([ProjectID])
GO
ALTER TABLE [dbo].[EffortDataStaging] CHECK CONSTRAINT [FK_EffortDataStaging_ProjectMaster1]
GO
ALTER TABLE [dbo].[EffortDataStaging]  WITH CHECK ADD  CONSTRAINT [FK_EffortDataStaging_ReleaseId] FOREIGN KEY([ProjectReleaseId])
REFERENCES [dbo].[ProjectReleaseMaster] ([ProjectReleaseId])
GO
ALTER TABLE [dbo].[EffortDataStaging] CHECK CONSTRAINT [FK_EffortDataStaging_ReleaseId]
GO
ALTER TABLE [dbo].[EffortDetails]  WITH CHECK ADD  CONSTRAINT [FK_EffortDetails_MonthId] FOREIGN KEY([MonthId])
REFERENCES [dbo].[MonthMaster] ([MonthId])
GO
ALTER TABLE [dbo].[EffortDetails] CHECK CONSTRAINT [FK_EffortDetails_MonthId]
GO
ALTER TABLE [dbo].[EffortDetails]  WITH CHECK ADD  CONSTRAINT [FK_EffortDetails_ProjectMaster] FOREIGN KEY([ProjectId])
REFERENCES [dbo].[ProjectMaster] ([ProjectID])
GO
ALTER TABLE [dbo].[EffortDetails] CHECK CONSTRAINT [FK_EffortDetails_ProjectMaster]
GO
ALTER TABLE [dbo].[EffortDetails]  WITH CHECK ADD  CONSTRAINT [FK_EffortDetails_ReleaseId] FOREIGN KEY([ProjectReleaseId])
REFERENCES [dbo].[ProjectReleaseMaster] ([ProjectReleaseId])
GO
ALTER TABLE [dbo].[EffortDetails] CHECK CONSTRAINT [FK_EffortDetails_ReleaseId]
GO
ALTER TABLE [dbo].[ProjectMetricAssociation]  WITH CHECK ADD  CONSTRAINT [FK_ProjectMetricAssociation_MetricMaster] FOREIGN KEY([MetricMasterID])
REFERENCES [dbo].[MetricMaster] ([MetricMasterID])
GO
ALTER TABLE [dbo].[ProjectMetricAssociation] CHECK CONSTRAINT [FK_ProjectMetricAssociation_MetricMaster]
GO
ALTER TABLE [dbo].[ProjectMetricAssociation]  WITH CHECK ADD  CONSTRAINT [FK_ProjectMetricAssociation_MonthId] FOREIGN KEY([MonthId])
REFERENCES [dbo].[MonthMaster] ([MonthId])
GO
ALTER TABLE [dbo].[ProjectMetricAssociation] CHECK CONSTRAINT [FK_ProjectMetricAssociation_MonthId]
GO
ALTER TABLE [dbo].[ProjectMetricAssociation]  WITH CHECK ADD  CONSTRAINT [FK_ProjectMetricAssociation_ProjectId] FOREIGN KEY([ProjectId])
REFERENCES [dbo].[ProjectMaster] ([ProjectID])
GO
ALTER TABLE [dbo].[ProjectMetricAssociation] CHECK CONSTRAINT [FK_ProjectMetricAssociation_ProjectId]
GO
ALTER TABLE [dbo].[ProjectMetricAssociation]  WITH CHECK ADD  CONSTRAINT [FK_ProjectMetricAssociation_ReleaseId] FOREIGN KEY([ReleaseId])
REFERENCES [dbo].[ProjectReleaseMaster] ([ProjectReleaseId])
GO
ALTER TABLE [dbo].[ProjectMetricAssociation] CHECK CONSTRAINT [FK_ProjectMetricAssociation_ReleaseId]
GO
ALTER TABLE [dbo].[ProjectWidgetDetails]  WITH CHECK ADD  CONSTRAINT [FK_ProjectWidgetDetails_ProjectMaster] FOREIGN KEY([ProjectID])
REFERENCES [dbo].[ProjectMaster] ([ProjectID])
GO
ALTER TABLE [dbo].[ProjectWidgetDetails] CHECK CONSTRAINT [FK_ProjectWidgetDetails_ProjectMaster]
GO
ALTER TABLE [dbo].[TestingDataStaging]  WITH CHECK ADD  CONSTRAINT [FK_TestingDataStaging_MonthId] FOREIGN KEY([MonthId])
REFERENCES [dbo].[MonthMaster] ([MonthId])
GO
ALTER TABLE [dbo].[TestingDataStaging] CHECK CONSTRAINT [FK_TestingDataStaging_MonthId]
GO
ALTER TABLE [dbo].[TestingDataStaging]  WITH CHECK ADD  CONSTRAINT [FK_TestingDataStaging_ProjectMaster] FOREIGN KEY([ProjectId])
REFERENCES [dbo].[ProjectMaster] ([ProjectID])
GO
ALTER TABLE [dbo].[TestingDataStaging] CHECK CONSTRAINT [FK_TestingDataStaging_ProjectMaster]
GO
ALTER TABLE [dbo].[TestingDataStaging]  WITH CHECK ADD  CONSTRAINT [FK_TestingDataStaging_ReleaseId] FOREIGN KEY([ProjectReleaseId])
REFERENCES [dbo].[ProjectReleaseMaster] ([ProjectReleaseId])
GO
ALTER TABLE [dbo].[TestingDataStaging] CHECK CONSTRAINT [FK_TestingDataStaging_ReleaseId]
GO
ALTER TABLE [dbo].[TestingDetails]  WITH CHECK ADD  CONSTRAINT [FK_TestingDetails_MonthId] FOREIGN KEY([MonthId])
REFERENCES [dbo].[MonthMaster] ([MonthId])
GO
ALTER TABLE [dbo].[TestingDetails] CHECK CONSTRAINT [FK_TestingDetails_MonthId]
GO
ALTER TABLE [dbo].[TestingDetails]  WITH CHECK ADD  CONSTRAINT [FK_TestingDetails_ProjectMaster] FOREIGN KEY([ProjectId])
REFERENCES [dbo].[ProjectMaster] ([ProjectID])
GO
ALTER TABLE [dbo].[TestingDetails] CHECK CONSTRAINT [FK_TestingDetails_ProjectMaster]
GO
ALTER TABLE [dbo].[TestingDetails]  WITH CHECK ADD  CONSTRAINT [FK_TestingDetails_ReleaseId] FOREIGN KEY([ProjectReleaseId])
REFERENCES [dbo].[ProjectReleaseMaster] ([ProjectReleaseId])
GO
ALTER TABLE [dbo].[TestingDetails] CHECK CONSTRAINT [FK_TestingDetails_ReleaseId]
GO
ALTER TABLE [dbo].[UserProjectRoleAssociation]  WITH CHECK ADD  CONSTRAINT [FK_UserProjectRoleAssociation_ProjectMaster] FOREIGN KEY([ProjectId])
REFERENCES [dbo].[ProjectMaster] ([ProjectID])
GO
ALTER TABLE [dbo].[UserProjectRoleAssociation] CHECK CONSTRAINT [FK_UserProjectRoleAssociation_ProjectMaster]
GO
ALTER TABLE [dbo].[UserProjectRoleAssociation]  WITH CHECK ADD  CONSTRAINT [FK_UserProjectRoleAssociation_RoleMasterTable] FOREIGN KEY([RoleId])
REFERENCES [dbo].[RoleMaster] ([RoleId])
GO
ALTER TABLE [dbo].[UserProjectRoleAssociation] CHECK CONSTRAINT [FK_UserProjectRoleAssociation_RoleMasterTable]
GO
ALTER TABLE [dbo].[UserProjectRoleAssociation]  WITH CHECK ADD  CONSTRAINT [FK_UserProjectRoleAssociation_UserDetails] FOREIGN KEY([UserId])
REFERENCES [dbo].[UserDetails] ([UserId])
GO
ALTER TABLE [dbo].[UserProjectRoleAssociation] CHECK CONSTRAINT [FK_UserProjectRoleAssociation_UserDetails]
GO
USE [master]
GO
ALTER DATABASE [QRMPortal] SET  READ_WRITE 
GO

ALTER TABLE dbo.EffortDataStaging ADD [EffortDataStagingId] int IDENTITY(1,1) not null;

ALTER TABLE dbo.EffortDataStaging 
ADD CONSTRAINT [PK_EffortDataStaging] PRIMARY KEY CLUSTERED 
(
	[EffortDataStagingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
 

ALTER TABLE dbo.DefectDataStaging DROP CONSTRAINT FK_DefectDataStaging_Period; 
ALTER TABLE dbo.DefectDataStaging DROP COLUMN PeriodId; 

ALTER TABLE dbo.EffortDataStaging DROP CONSTRAINT FK_EffortDataStaging_ProjectMaster1
ALTER TABLE dbo.EffortDataStaging ALTER COLUMN ProjectID VARCHAR(50);

ALTER TABLE dbo.EffortDataStaging ADD [ProjectMasterId] int not null;

ALTER TABLE [dbo].[EffortDataStaging]  WITH CHECK ADD  CONSTRAINT [FK_EffortDataStaging_ProjectMaster] FOREIGN KEY([ProjectMasterId])
REFERENCES [dbo].[ProjectMaster] ([ProjectID])

ALTER TABLE dbo.EffortDataStaging ALTER COLUMN ComponentName VARCHAR(max);

ALTER TABLE dbo.TestingDataStaging ADD NormalizedTestCasesExecution INT NULL;
ALTER TABLE dbo.TestingDataStaging ADD PlannedStartDateExecution DATETIME NULL;
ALTER TABLE dbo.TestingDataStaging ADD PlannedEndDateExecution DATETIME NULL;
ALTER TABLE dbo.TestingDataStaging ADD ActualStartDateExecution DATETIME NULL;
ALTER TABLE dbo.TestingDataStaging ADD ActualEndDateExecution DATETIME NULL;
ALTER TABLE dbo.TestingDataStaging ADD ManualOrAutomatedExecution Varchar(50) NULL;
ALTER TABLE dbo.TestingDataStaging ADD NormalizedTestCasesDesign INT NULL;

ALTER TABLE dbo.EffortDataStaging ALTER COLUMN ReviewType VARCHAR(50) NULL;
ALTER TABLE dbo.DefectDataStaging ALTER COLUMN ReviewType VARCHAR(50) NULL;


ALTER TABLE [dbo].[EffortDetails] DROP CONSTRAINT FK_EffortDetails_ProjectMaster
ALTER TABLE [dbo].[EffortDetails] ALTER COLUMN ProjectID VARCHAR(50);

ALTER TABLE [dbo].[EffortDetails] ADD [ProjectMasterId] int not null;

ALTER TABLE [dbo].[EffortDetails]  WITH CHECK ADD  CONSTRAINT [FK_EffortDetails_ProjectMaster] FOREIGN KEY([ProjectMasterId])
REFERENCES [dbo].[ProjectMaster] ([ProjectID])

ALTER TABLE [dbo].[EffortDetails] ALTER COLUMN ComponentName VARCHAR(max);

ALTER TABLE [dbo].[EffortDetails] ALTER COLUMN ReviewTypeCode VARCHAR(50) NULL;

-- test details scripts
ALTER TABLE dbo.TestingDetails ADD NormalizedTestCasesExecution INT NULL;
ALTER TABLE dbo.TestingDetails ADD PlannedStartDateExecution DATETIME NULL;
ALTER TABLE dbo.TestingDetails ADD PlannedEndDateExecution DATETIME NULL;
ALTER TABLE dbo.TestingDetails ADD ActualStartDateExecution DATETIME NULL;
ALTER TABLE dbo.TestingDetails ADD ActualEndDateExecution DATETIME NULL;
ALTER TABLE dbo.TestingDetails ADD ManualOrAutomatedExecution Varchar(50) NULL;
ALTER TABLE dbo.TestingDetails ADD NormalizedTestCasesDesign INT NULL;


---- defect details scripts
ALTER TABLE dbo.DefectDataDetails ALTER COLUMN ReviewType VARCHAR(50) NULL;


-- effort details scripts
ALTER TABLE [dbo].[EffortDetails] ALTER COLUMN ReleaseID VARCHAR(50);

ALTER TABLE [dbo].[EffortDetails] ALTER COLUMN ComponentID VARCHAR(50);



GO