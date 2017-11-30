using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QRMFrameworkHelpers
{
    public class ConfigManager
    {
        /// <summary>
        /// Determines whether [is read only stored procedure] [the specified stored procedure name].
        /// </summary>
        /// <param name="storedProcedureName">stored procedure name</param>
        /// <returns>
        /// true/false
        /// </returns>
        public static bool IsReadOnlyStoredProcedure(string storedProcedureName)
        {
            var enableApplicationIntent = ConfigurationManager.AppSettings.AllKeys.Contains(Constants.AvailabilityGroupKey) &&
                                          Convert.ToBoolean(ConfigurationManager.AppSettings[Constants.AvailabilityGroupKey]);

            var turnOffReadonly = false;
            var isReadonly = false;

            if (ConfigurationManager.AppSettings.AllKeys.Contains(Constants.ReadonlyFilePathKey))
            {
                turnOffReadonly = File.Exists(ConfigurationManager.AppSettings[Constants.ReadonlyFilePathKey]);
            }

            if (enableApplicationIntent && !turnOffReadonly)
            {
                var sections = (ReadOnlyStoredProcConfiguration)ConfigurationManager.GetSection(Constants.ReadonlyConfigSection);

                for (var index = 0; index < sections.TypeReadOnlyStoredProcedureSections.Count; index++)
                {
                    if (sections.TypeReadOnlyStoredProcedureSections[index].Name.ToLower() == storedProcedureName.ToLower())
                    {
                        isReadonly = true;
                        break;
                    }
                }
            }

            return isReadonly;
        }
    }
}
