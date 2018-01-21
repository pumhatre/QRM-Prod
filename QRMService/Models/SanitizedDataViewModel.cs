using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class SanitizedDataViewModel
    {
        
        public List<EffortSanityValidationModel> effortSanityValidatonModel { get; set; }
        public List<DefectDataModel> SanitizedDefectData { get; set; }
        public List<DefectDataModel> InvalidDefectData { get; set; }
        public List<DefectSanityValidationModel> defectSanityValidationModel { get; set; }

        public int ProjectId { get; set; }
        public int ProjectReleaseId { get; set; }
        public int MonthId { get; set; }

    }
}