using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace QRMService.Wrapper
{
    [DataContract]
    public class MonthDetailsWrapper
    {
        [DataMember]
        public int MonthId { get; set; }

        [DataMember]
        public string MonthName { get; set; }

    }
}