using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class ProjectMetricDetailsModel
    {
        public int MetricMasterID { get; set; }
        public string MetricCategoryCode { get; set; }
        public string MetricCategoryDescription { get; set; }
    }
}