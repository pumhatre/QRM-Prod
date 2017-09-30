using System.Web;
using System.Web.Optimization;

namespace QRM_App
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new ScriptBundle("~/modernizr").Include(
                   "~/Assets/misc/modernizr.min.js"));

            bundles.Add(new ScriptBundle("~/bootstrap").Include(
                     "~/Assets/Bootstrap/js/bootstrap.js",
                     "~/Assets/misc/respond.min.js"));

            //Moved bootstrap css to own style tag in the _layout page.  This is to remove it from the optimizations which was breaking the fonts and icons.
            bundles.Add(new StyleBundle("~/styles").IncludeDirectory("~/Assets", "*.css", true));


            bundles.Add(new ScriptBundle("~/ng").Include(
                        "~/Assets/ng/angular.min.js",
                        "~/Assets/ng/angular-route.min.js",
                        "~/Assets/ng/angular-cookies.min.js",
                        "~/Assets/ng/angular-animate.min.js",
                        "~/Assets/ng/angular-touch.min.js",
                        "~/Assets/ng/angular-confirm.js"));

            bundles.Add(new ScriptBundle("~/uigrid").Include(
                        "~/Assets/ng/ui-bootstrap-tpls-2.5.0.min.js",
                       "~/Assets/ng/Ui-grid/ui-grid.min.js"));

            bundles.Add(new ScriptBundle("~/app").IncludeDirectory("~/Assets/app", "*.js", true));

            bundles.Add(new ScriptBundle("~/jquery").Include(
                        "~/Assets/jquery/jquery.min.js"));

            bundles.Add(new ScriptBundle("~/custom").Include(
                      "~/Content/js/fastclick.js",
                      "~/Content/js/nprogress.js",
                      "~/Content/js/date.js",
                      "~/Content/js/moment.min.js",
                      "~/Content/js/daterangepicker.js",
                      "~/Content/js/custom.min.js"));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = false;
        }
    }
}
