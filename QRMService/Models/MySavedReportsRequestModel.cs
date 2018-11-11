using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class MySavedReportsRequestModel
    {
        public int UserId { get; set; }
        public int ProjectReleaseID { get; set; }
        public int ProjectId { get; set; }
        public string ReportType { get; set; }
        public string ReportName { get; set; }
        public int UserReportAssociationID { get; set; }
        public object SavedReportData { get; set; }
    }
}