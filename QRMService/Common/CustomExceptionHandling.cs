﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Filters;

namespace QRMService.Common
{
    public class CustomExceptionHandling: ExceptionFilterAttribute, IExceptionFilter

    {

        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {

            
        }
    }
}