using System;
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
        public int CompleteHours { get; set; }
        public int WIPHours { get; set; }
        public int NotStartedHours { get; set; }
        public int TotalHours { get; set; }
        public string DashBoardType { get; set; }
        public string DashboardSubtype { get; set; }
    }

    //Dev


    public class ProjectTesting
    {
        public int? PreSitComponent { get; set; }
        public int? PreSitE2E { get; set; }
        public int? SitComponent { get; set; }
        public int? SitE2E { get; set; }
        public bool IsManualORAutomatic { get; set; }
        public string PropertyName { get; set; }
    }
    //Test

    public class ProjectDefects
    {
        public int Overall { get; set; }
        public int Rejected { get; set; }
        public int Closed { get; set; }
        public int Open { get; set; }
        public string PropertyName { get; set; }
    }
}