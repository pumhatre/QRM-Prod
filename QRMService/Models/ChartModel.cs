using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class ChartModel
    {
    }

    public class EffortDistribution
    {
        public string EffortType { get; set; }
        public string PlannedEffortPercentage { get; set; }
        public string ActualEffortPercentage { get; set; }
    }

    public class TestCaseDistribution
    {
    }

    public class TestCaseComplexityDistribution
    {
    }

    public class DefectDetectedPhaseDistribution
    {
    }
}