﻿using QRMFrameworkHelpers;
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
            
            SanitizedDataViewModel dataSanityVM = new SanitizedDataViewModel();
            
            // effort data sanity check
            var effortdataSanityVM = UploadRepository.DataSanityCheck(upload);
            dataSanityVM.effortSanityValidatonModel = effortdataSanityVM.effortSanityValidatonModel;
            dataSanityVM.EffortTotalCount = effortdataSanityVM.EffortTotalCount;

            // defect sanity check
            var dataSanityVMDefectResult = UploadRepository.DataSanityCheckDefectData(upload);
            dataSanityVM.defectSanityValidationModel = dataSanityVMDefectResult.defectSanityValidationModel;
            dataSanityVM.DefectTotalCount = dataSanityVMDefectResult.DefectTotalCount;


            // test sanity check
            //var testResult = UploadRepository.GetTestStaging(upload);
            var dataSanityVMTestResult = UploadRepository.DataSanityCheckTestData(upload);
            dataSanityVM.testSanityValidationModel = dataSanityVMTestResult.testSanityValidationModel;
            dataSanityVM.TestTotalCount = dataSanityVMTestResult.TestTotalCount;
            

            dataSanityVM.ProjectId = upload.ProjectId;
            dataSanityVM.MonthId = upload.MonthId;
            dataSanityVM.ProjectReleaseId = upload.ProjectReleaseId;
            
            return Ok(dataSanityVM);
        }


        [HttpPost]
        public IHttpActionResult SaveStagingDatatoDetailsTable(SanitizedDataViewModel sanitizedModel)
        {
            UploadRepository.SaveDetailData(sanitizedModel);
            

            return Ok();
        }


    }
}