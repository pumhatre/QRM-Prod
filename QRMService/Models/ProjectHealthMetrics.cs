﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class ProjectHealthMetrics
    {
    }


    public class ProjectEffort
    {
        public int? CompleteHours { get; set; }
        public int? WIPHours { get; set; }
        public int? NotStartedHours { get; set; }
        public int? TotalHours { get; set; }
        public string DashBoardType { get; set; }
        public string DashboardSubtype { get; set; }
        public int spanEffort { get; set; }
        public int ReleaseId { get; set; }
        public int MonthId { get; set; }
    }

    //Dev


    public class ProjectTesting
    {
        public int? PreSitComponent { get; set; }
        public int? PreSitE2E { get; set; }
        public int? SitComponent { get; set; }
        public int? SitE2E { get; set; }
        public bool? IsManualORAutomatic { get; set; }
        public string DashboardSubtype { get; set; }
        public string DashBoardType { get; set; }
    }
    //Test

    public class ProjectDefects
    {
        public int? Overall { get; set; }
        public int? Rejected { get; set; }
        public int? Closed { get; set; }
        public int? Open { get; set; }
        public string DashBoardType { get; set; }
    }


    public class ProjectWidget
    {
        public string DashboardSubtype { get; set; }
        public string DashBoardType { get; set; }
        public int? CompletedHours { get; set; }
        public int? WipHours { get; set; }
        public int? NotStartedHours { get; set; }
        public int? TotalHours { get; set; }
        public int spanWidget { get; set; }
    }

    public class ProjectVariance
    {
        public string DashboardType { get; set; }
        public string EffortVariance { get; set; }
        public string Rework { get; set; }
        public string UnitTestEffectiveness { get; set; }
        public string SystemTestEffectiveness { get; set; }
        public string SITDefectDetectionRate { get; set; }
        public string ComponentDefectRejectionRate { get; set; }
        public string E2EDefectRejectionRate { get; set; }
    }

}