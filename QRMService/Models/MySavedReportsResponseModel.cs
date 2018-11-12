using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class MySavedReportsResponseModel
    {
        public int UserReportAssociationID { get; set; }
        public Nullable<int> UserId { get; set; }
        public string ReportName { get; set; }
        public Nullable<int> ProjectReleaseID { get; set; }
        public Nullable<int> ProjectId { get; set; }
        public string ReportType { get; set; }
        public string Project { get; set; }
        public string Release { get; set; }
    }

    public class SavedReportResponse
    {
        public bool Status { get; set; }
        public string ResponseMesaage { get; set; }
    }
}