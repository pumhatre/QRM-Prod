using QRMService.Models;
using QRMService.Repositories;
using System.Collections.Generic;
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
    }
}