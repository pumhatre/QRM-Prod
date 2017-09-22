using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace QRMService.Wrapper
{
    [DataContract]
    public class ProjectMatricsDetailsWrapper
    {
        [DataMember]
        public int MetricMasterID { get; set; }

        [DataMember]
        public string MetricCategoryCode { get; set; }

        [DataMember]
        public string MetricCategoryDescription { get; set; }
    }
}