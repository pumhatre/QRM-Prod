using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class ProjectReviewModel
    {
        public int id { get; set; }
        public string name { get; set; }
        public string reviewDate { get; set; }
        public string color { get; set; }
    }

    public class UserProjects
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string ServiceLine { get; set; }
        public string ClientName { get; set; }
        public string Technology { get; set; }
        public string Industry { get; set; }
        public string LifeCycle { get; set; }
        public string Director { get; set; }
        public string SeniorManager { get; set; }
        public string ProjectManager { get; set; }
        public string QualityController { get; set; }
    }
}