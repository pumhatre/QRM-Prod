//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace QRMService.DataBase
{
    using System;
    using System.Collections.Generic;
    
    public partial class UserReportAssociation
    {
        public int UserReportAssociationID { get; set; }
        public Nullable<int> UserId { get; set; }
        public string ReportName { get; set; }
        public Nullable<int> ProjectReleaseID { get; set; }
        public Nullable<int> MonthID { get; set; }
    }
}
