using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;

namespace QRMFrameworkHelpers
{
    public class ReadOnlyStoredProcConfiguration : ConfigurationSection
    {
        [ConfigurationProperty("readOnlyStoredProcedures")]
        [ConfigurationCollection(typeof(ReadOnlyStoredProcCollection), AddItemName = "add")]
        public ReadOnlyStoredProcCollection TypeReadOnlyStoredProcedureSections
        {
            get
            {
                return (ReadOnlyStoredProcCollection)this["readOnlyStoredProcedures"];
            }
            set
            {
                this["readOnlyStoredProcedures"] = value;
            }
        }
    }
}
