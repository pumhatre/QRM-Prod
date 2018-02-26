using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class UserSpecificModel
    {
    }

    public class UserProjects
    {
        public string ProjectName { get; set; }
        public string ServiceLine { get; set; }
        public string ClientName { get; set; }
        public string Technology { get; set; }
        public string Industry { get; set; }
        public string LifeCycle { get; set; }
        public string Director { get; set; }
        public string SeniorManager { get; set; }
        public string ProjectManager { get; set; }
    }
}