using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class ChartDataModel
    {
        public List<string> labels { get; set; }
        public List<Dataset> datasets { get; set; }
    }

    public class Dataset
    {
        public List<int> data { get; set; }
        public string label { get; set; }
        public string borderColor { get; set; }
        public bool fill { get; set; }
        public List<string> backgroundColor { get; set; }
        public string pointBorderColor { get; set; }
        public string pointBackgroundColor { get; set; }

    }

}