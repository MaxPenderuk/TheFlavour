using System.Web;
using System.Web.Optimization;

namespace TheFlavour
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-1.10.2.min.js",
                        "~/Scripts/TheFlavour/jquery-migrate.min.js",
                        "~/Scripts/TheFlavour/jquery-ui.min.js",
                        "~/Scripts/TheFlavour/jquery.prettyPhoto.js"));

            bundles.Add(new ScriptBundle("~/bundles/layout").Include(
                    "~/Scripts/TheFlavour/slicknav.min.js",
                    "~/Scripts/TheFlavour/general.js",
                    "~/Scripts/TheFlavour/events.js",
                    "~/Scripts/TheFlavour/carouFredSel-6.2.1.js",
                    "~/Scripts/TheFlavour/cusel.min.js",
                    "~/Scripts/TheFlavour/parallax.js",
                    "~/Scripts/TheFlavour/scrollto.js"));

            bundles.Add(new ScriptBundle("~/bundles/gmap").Include(
                   "~/Scripts/TheFlavour/gmap.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/style.css",
                      "~/Content/prettyPhoto.css",
                      "~/Content/animate.css",
                      "~/Content/cusel.css",
                      "~/Content/shCore.css",
                      "~/Content/shThemeDefault.css"));
        }
    }
}
