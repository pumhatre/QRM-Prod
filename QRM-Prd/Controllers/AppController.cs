﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QRM_Prd.Controllers
{
    /// <summary>
    /// Create an ActionResult and PartialView for each angular partial view you want to attatch to a route in the angular app.js file.
    /// </summary>
    public class AppController : Controller
    {
        public ActionResult SignIn()
        {
            return PartialView();
        }
        public ActionResult Home()
        {
            return PartialView("~/Views/App/Home.cshtml");
        }

        public ActionResult MetrixAssociation()
        {
            return PartialView("~/Views/App/MetrixAssociation.cshtml");
        }
    }
}