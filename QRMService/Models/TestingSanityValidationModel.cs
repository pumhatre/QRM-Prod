using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class TestingSanityValidationModel
    {
        public int TestingDataStagingId { get; set; }
        public Int64 RowNumber { get; set; }
        public string Release { get; set; }
        public string Iteration { get; set; }
        public string TestingType { get; set; }
        public string TestingPhase { get; set; }
        public string TestingSubPhase { get; set; }
        public string TestingExecutionType { get; set; }
        public string ErrorDescription { get; set; }
        public string[] ErrorArray { get; set; }
    }
}