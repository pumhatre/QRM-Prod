using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;


namespace QRMService.Models
{
    public class ProjectMasterModel
    {

        public int ProjectID { get; set; }
        public string ProjectName { get; set; }
        public string ServiceLineCode { get; set; }
        public string ServiceLine { get; set; }
        public string Capability { get; set; }
        public string ProjectManager { get; set; }
        public string ClientName { get; set; }
        public string GDM { get; set; }
        public string TechnologyCode { get; set; }
        public string Technology { get; set; }
        public string IndustryCode { get; set; }
        public string Industry { get; set; }
        public string LifeCycle { get; set; }
        public string Solution { get; set; }
        public string Director { get; set; }
        public string SeniorManager { get; set; }
        public string QualityController { get; set; }
    }
}
