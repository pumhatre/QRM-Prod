using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;

namespace QRMFrameworkHelpers
{
    public class ReadOnlyStoredProcCollection : ConfigurationElementCollection
    {
        public ReadOnlyStoredProcedureSection this[int index]
        {
            get
            {
                return (ReadOnlyStoredProcedureSection)BaseGet(index);
            }
            set
            {
                if (BaseGet(index) != null)
                {
                    BaseRemoveAt(index);
                }
                BaseAdd(index, value);
            }
        }

        public void Add(ReadOnlyStoredProcedureSection readOnlyStoredProcedureSection)
        {
            BaseAdd(readOnlyStoredProcedureSection);
        }

        protected override ConfigurationElement CreateNewElement()
        {
            return new ReadOnlyStoredProcedureSection();
        }

        protected override object GetElementKey(ConfigurationElement element)
        {
            return ((ReadOnlyStoredProcedureSection)element).Name;
        }
    }
}
