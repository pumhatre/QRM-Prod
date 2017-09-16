using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRM_App.Models
{
    public class ProjectBindingModel
    {
        public int ProjectID { get; set; }
        public string ProjectName { get; set; }
        public string ServiceLine { get; set; }
        public string  Capability{ get; set; }
        public  string ProjectManager { get; set; }
        public string ClientName { get; set; }
        public DateTime StartDate{ get; set; }
        public DateTime EndDate { get; set; }
        public string GDM { get; set; }
        public string Technology { get; set; }
        public string Industry { get; set; }
        public string LifeCycle { get; set; }
        public string Solution { get; set; }
        public string Director { get; set; }
        public string SeniorManager { get; set; }
        public DateTime ProjectStartDate { get; set; }
        public DateTime ProjectEndDate { get; set; }


    }
}