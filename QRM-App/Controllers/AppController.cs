﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QRM_App.Controllers
{
    /// <summary>
    /// Create an ActionResult and PartialView for each angular partial view you want to attatch to a route in the angular app.js file.
    /// </summary>
    public class AppController : Controller
    {
        public ActionResult Qrm()
        {
            return View("~/Views/App/Home.cshtml");
        }

        public ActionResult Register()
        {
            return PartialView();
        }
        public ActionResult SignIn()
        {
            return View();
        }
        public ActionResult Home()
        {
            return PartialView();
        }

        [Authorize]
        public ActionResult TodoManager()
        {
            return PartialView();
        }

        public ActionResult MetricsAssociation()
        {
            return PartialView();
        }

        public ActionResult Metrics()
        {
            return PartialView();
        }
        
        public ActionResult Project()
        {
            return PartialView();
        }

        public ActionResult Main()
        {
            return View("~/Views/Main/Index.cshtml");
        }

        public ActionResult UserConfiguration()
        {
            return PartialView();
        }

        public ActionResult Role()
        {
            return PartialView();
        }
        public ActionResult GenerateReport()
        {
            return PartialView();
        }
        public ActionResult HealthReport()
        {
            return PartialView();
        }
        public ActionResult ViewPreference()
        {
            return PartialView();
        }
        public ActionResult UploadWizard()
        {
            return PartialView();
        }
        public ActionResult ChartReports()
        {
            return PartialView();
        }
        public ActionResult MetricReports()
        {
            return PartialView();
        }
        public ActionResult SavedReports()
        {
            return PartialView();
        }
    }
}