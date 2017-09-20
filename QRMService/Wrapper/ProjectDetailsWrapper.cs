using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace QRMService.Wrapper
{
    [DataContract]
    public class ProjectDetailsWrapper
    {
        [DataMember]
        public int ProjectID { get; set; }

        [DataMember]
        public string ProjectName { get; set; }
    }
}