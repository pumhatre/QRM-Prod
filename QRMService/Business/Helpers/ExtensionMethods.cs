using AutoMapper;
using System.Collections.Generic;
using System.Globalization;
using System.Reflection;

namespace System.Collections.Generic
{
    public static partial class ExtensionMethods
    {
        /// <summary>
        /// Extension method to avoid null refrence error and Adds an object to the end of the System.Collections.Generic.List T.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="collection"></param>
        /// <param name="item">The object to be added to the end of the System.Collections.Generic.List T. The value can be null for reference types.</param>
        public static void AddSafe<T>(this List<T> collection, T item)
        {
            if (collection != null)
            {
                collection.Add(item);
            }
        }
    }
}

namespace System.Linq
{
    public static partial class ExtensionMethods
    {
        public static List<TDestination> AutoMapList<TSource, TDestination>(this IQueryable<TSource> source, List<TDestination> destination)
            where TSource : class
            where TDestination : class
        {
            destination = new List<TDestination>();

            if (source != null && source.Any())
            {
                Mapper.CreateMap<TSource, TDestination>();
                Mapper.Map<IQueryable<TSource>, IList<TDestination>>(source, destination);
            }

            //destination = destination.Count > 0 ? destination : null;

            return destination;
        }

        public static List<TDestination> AutoMapList<TSource, TDestination>(this List<TSource> source, List<TDestination> destination)
            where TSource : class
            where TDestination : class
        {
            destination = new List<TDestination>();

            if (source != null && source.Any())
            {
                Mapper.CreateMap<TSource, TDestination>();
                Mapper.Map<List<TSource>, IList<TDestination>>(source, destination);
            }

            //destination = destination.Count > 0 ? destination : null;

            return destination;
        }
    }
}

namespace System
{
    /// <summary>
    /// Extension methods class. Having this class available on all the projects to avoid null reference error.
    /// </summary>
    public static partial class ExtensionMethods
    {

        public static readonly DateTime HighDate = new DateTime(9999, 12, 31);

        public static TDestination AutoMapClass<TSource, TDestination>(this TSource source, TDestination destination)
            where TSource : class
            where TDestination : class
        {
            destination = Activator.CreateInstance(typeof(TDestination)) as TDestination;

            if (source != null)
            {
                Mapper.CreateMap<TSource, TDestination>();
                Mapper.Map<TSource, TDestination>(source, destination);
            }

            return destination;
        }

        /// <summary>
        /// Method to avoid calling StringHelper.ToString()
        /// </summary>
        /// <param name="s">The s.</param>
        /// <returns></returns>
        public static string ToStringSafe(this object s)
        {
            if (s == null) return string.Empty;
            else
            {
                string result = s.ToString();
                if (result == null) return string.Empty;
                else return result;
            }
        }

        /// <summary>
        /// Determines whether [is not empty] [the specified s].
        /// </summary>
        /// <param name="s">The s.</param>
        /// <returns>
        /// <c>true</c> if [is not empty] [the specified s]; otherwise, <c>false</c>.
        /// </returns>
        public static bool IsNotEmpty(this string s)
        {
            return !string.IsNullOrEmpty(s);
        }

        /// <summary>
        /// Converts the string to proper case.
        /// </summary>
        /// <param name="TextToFormat">The text to format.</param>
        /// <returns></returns>
        public static string ToProperCase(this string TextToFormat)
        {
            string properCase = string.Empty;
            if (TextToFormat != null)
            {
                properCase = new CultureInfo("en").TextInfo.ToTitleCase(TextToFormat.ToLower());
            }
            return properCase;
        }

        /// <summary>
        /// Converts the string to int
        /// </summary>
        /// <param name="s">The s.</param>
        /// <returns></returns>
        public static int ToIntSafe(this object s)
        {
            int outParameter = -1;
            string decimalType = "Decimal";
            if (s != null)
            {
                if (s.GetType().Name.Equals(decimalType))
                    outParameter = Convert.ToInt32(s);
                else
                    int.TryParse(s.ToString().Trim(), out outParameter);
            }

            return outParameter;
        }

        /// <summary>
        /// Toes the decimal safe.
        /// </summary>
        /// <param name="val">The val.</param>
        /// <returns></returns>
        public static decimal ToDecimalSafe(this object val)
        {
            decimal outParameter = 0M;
            if (val != null)
            {
                decimal.TryParse(val.ToStringSafe(), out outParameter);
            }
            return outParameter;
        }

        /// <summary>
        /// To datetime safe, returns null if val is invalid
        /// </summary>
        /// <param name="val">The val.</param>
        /// <returns></returns>
        public static DateTime? ToDatetimeSafe(this object val)
        {
            DateTime outParameter = DateTime.MinValue;

            bool parsingStatus = false;
            if (val != null)
            {
                parsingStatus = DateTime.TryParse(val.ToStringSafe(), out outParameter);
            }

            if (parsingStatus)
                return outParameter;
            else
                return null;
        }

        //Nidhi Gupta: KY 92791
        /// <summary>
        /// To ToHighDateWhenNull, returns high date when date is null. else returns the date.
        /// </summary>
        /// <param name="val">The val.</param>
        /// <returns></returns>
        public static DateTime ToHighDateWhenNull(this DateTime? val)
        {
            DateTime highDate = HighDate;

            if (val != null)
            {
                return val.Value;
            }
            else
            {
                return highDate;
            }
        }

        /// <summary>
        /// To check whether the is numberic or not
        /// </summary>
        /// <param name="s">THe s.</param>
        /// <returns></returns>
        public static bool IsNumeric(this string s)
        {
            float output;
            return float.TryParse(s, out output);
        }

        /// <summary>
        /// Get value of AppKey from WEB.Config file
        /// </summary>
        /// <param name="Key"></param>
        /// <returns></returns>
        public static string AppValue(this string Key)
        {
            return System.Configuration.ConfigurationManager.AppSettings[Key].ToStringSafe();
        }

        public static string GetCurrentMethod(this object source)
        {
            System.Diagnostics.StackFrame stackFrame = new System.Diagnostics.StackFrame(1);
            MethodBase methodBase = stackFrame.GetMethod();
            if (methodBase == null)
                return string.Empty;

            return methodBase.Name.ToStringSafe();
        }
    }
}