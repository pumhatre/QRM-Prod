using QRMService.DataBase;
using System.Collections.Generic;
using System.Linq;
using QRMService.Models;

namespace QRMService.Repositories
{
    public class MetricsRepository
    {
        /// <summary>
        /// Gets all project releases.
        /// </summary>
        /// <returns></returns>
        public static List<MetricsModel> GetMetricsDetails()
        {
            using (var db = new QRMEntities())
            {
                var metricsDetails = (from m in db.MetricMasters
                                       select new MetricsModel
                                       {
                                           MetricsMasterId = m.MetricMasterID,
                                           CategoryCode = m.MetricCategoryCode,
                                           CategoryDescription = m.MetricCategoryDescription,
                                           SubCategoryCode = m.MetricSubCategoryCode,
                                           SubCategoryDescription =m.MetricSubCategoryDescription,
                                           TypeCode = m.MetricTypeCode,
                                           TypeDescription = m.MetricTypeDescription,
                                       }).ToList();
                return metricsDetails;
            }
        }

    }
}