using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class ProjectMetricsAssociationModel
    {
        public List<int> MetricsMasterIdList { get; set; }
        public int ProjectId { get; set; }
        public int ReleaseId { get; set; }
    }
}