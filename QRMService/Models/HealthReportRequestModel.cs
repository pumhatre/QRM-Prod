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
}