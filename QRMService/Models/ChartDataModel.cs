using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class ChartDataModel
    {
        public List<string> labels { get; set; }
        public List<string> series { get; set; }
        public List<string> colors { get; set; }
        public List<int> values { get; set; }
        public List<ChartDataset> datasets { get; set; }
    }

    public class ChartDataset
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