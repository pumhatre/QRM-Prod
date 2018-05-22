using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class MetricsModel
    {
        public int MetricsMasterId { get; set; }
        public string CategoryCode { get; set; }
        public string CategoryDescription { get; set; }
        public string SubCategoryCode { get; set; }
        public string SubCategoryDescription { get; set; }
        public string TypeCode { get; set; }
        public string TypeDescription { get; set; }
        public string MetricDescription { get; set; }
        public string FormulaDescription { get; set; }
    }
}