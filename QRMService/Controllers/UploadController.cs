using QRMFrameworkHelpers;
using QRMService.Models;
using QRMService.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace QRMService.Controllers
{
    public class UploadController : ApiController
    {
        // POST: Save excel data
        [HttpPost]
        public IHttpActionResult SaveExcelData(UploadViewModel upload)
        {
            UploadViewModel value = UploadRepository.SaveExcelData(upload);
            return Ok(value);
        }

        [HttpPost]
        public IHttpActionResult GetDefectStagingData(UploadViewModel upload)
        {
            //var defectResult = UploadRepository.GetDefectStaging(upload);

            var effortMasterData = UploadRepository.GetEffortMasterData();
            



            var effortResult = UploadRepository.GetEffortStaging(upload);

            var effortDataCount = UploadRepository.DataSanityCheck(effortResult, effortMasterData);

            var dataSanityresult = new List<DataSanityModel>();
            dataSanityresult.Add(new DataSanityModel { EffortComponentCount = effortDataCount, DefectComponentCount = 0 });

            return Ok(dataSanityresult);
        }


    }
}