using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class UploadViewModel
    {
        public List<EffortDataModel> EffortData { get; set; }
        public List<DefectDataModel> DefectData { get; set; }
        public List<TestingDataModel> TestingData { get; set; }
     
        public int ProjectId { get; set; }
        public int ProjectReleaseId { get; set; }
        public int MonthId { get; set; }
    }
}