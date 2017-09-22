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

        public bool updateDeleteUsers(List<MetricsModel> metricsList, List<int> deletedMetricsMasterIds)
        {
            using (QRMEntities context = new QRMEntities())
            {
                using (var transaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        foreach (var metrics in metricsList)
                        {
                            var metricsData = context.MetricMasters.Where(s => s.MetricMasterID == metrics.MetricsMasterId).FirstOrDefault();
                            if (!deletedMetricsMasterIds.Contains(metrics.MetricsMasterId))
                            {

                                if (metricsData != null)
                                {
                                    metricsData.MetricCategoryCode = metrics.CategoryCode;
                                    metricsData.MetricCategoryDescription = metrics.CategoryDescription;
                                    metricsData.MetricSubCategoryCode = metrics.SubCategoryCode;
                                    metricsData.MetricSubCategoryDescription = metrics.SubCategoryDescription;
                                    metricsData.MetricTypeCode = metrics.TypeCode;
                                    metricsData.MetricTypeDescription = metrics.TypeDescription;
                                }
                            }
                        }
                        if (deletedMetricsMasterIds.Count > 0)
                        {
                            foreach (var metricsId in deletedMetricsMasterIds)
                            {
                                context.MetricMasters.Remove(context.MetricMasters.Where(s => s.MetricMasterID == metricsId).FirstOrDefault());
                            }
                        }
                        context.SaveChanges();

                        transaction.Commit();

                    }
                    catch (System.Exception ex)
                    {
                        transaction.Rollback();
                    }
                }
            }
            return true;
        }

    }
}