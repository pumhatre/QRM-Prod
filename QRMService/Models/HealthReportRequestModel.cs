using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class HealthReportRequestModel
    {
        public int ProjectId { get; set; }

        public int ReleaseId { get; set; }

        public int MonthId { get; set; }

        public int UserId { get; set; }
    }

    public class TestingMetricsRequestModel
    {
        public int ProjectId { get; set; }
        public int ReleaseId { get; set; }
        public int MonthId { get; set; }       
        public string TestingPhase { get; set; }
        public string Iteration { get; set; }
        public string TestingSubPhase { get; set; }
        public string TestingType { get; set; }
        public string ManualOrAutomated { get; set; }
    }
}