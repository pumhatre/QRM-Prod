using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class SanitizedDataViewModel
    {
        public int EffortComponentCount { get; set; }
        public int DefectComponentCount { get; set; }
        public List<EffortDataModel> SanitizedEffortData { get; set; }
        public List<EffortDataModel>  InvalidEffortData { get; set; }
        public List<EffortSanityValidationModel> effortSanityValidatonModel { get; set; }

    }
}