using System.Web;
using System.Web.Optimization;

namespace QRM_Prd
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {           

            //Moved bootstrap css to own style tag in the _layout page.  This is to remove it from the optimizations which was breaking the fonts and icons.
            bundles.Add(new StyleBundle("~/styles").IncludeDirectory("~/Content", "*.css", true));


            bundles.Add(new ScriptBundle("~/ng").Include(
                        "~/Assets/ng/angular.min.js",
                        "~/Assets/ng/angular-route.min.js",
                        "~/Assets/ng/angular-cookies.min.js"));

            bundles.Add(new ScriptBundle("~/app").IncludeDirectory("~/Assets/app", "*.js", true));

            bundles.Add(new ScriptBundle("~/jquery").Include(
                        "~/Content/js/jquery.min.js"));

            bundles.Add(new ScriptBundle("~/bootstrap").Include(
                    "~/Content/js/bootstrap.min.js"));

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
