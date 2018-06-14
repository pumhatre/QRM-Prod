﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class SanitizedDataViewModel
    {
        
        public List<EffortSanityValidationModel> effortSanityValidatonModel { get; set; }

        public List<DefectSanityValidationModel> defectSanityValidationModel { get; set; }

        public List<TestingSanityValidationModel> testSanityValidationModel { get; set; }

        public int ProjectId { get; set; }
        public int ProjectReleaseId { get; set; }
        public int MonthId { get; set; }

        public int EffortTotalCount { get; set; }
        public int DefectTotalCount { get; set; }
        public int TestTotalCount { get; set; }

    }
}