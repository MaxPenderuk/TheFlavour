using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TheFlavour.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            // Path to images we need for slider.
            string filePath = Server.MapPath(@"~/images/Slides/");
            DirectoryInfo imgDir = new DirectoryInfo(filePath);
            List<string> imageNames = new List<string>();
            foreach (var file in imgDir.GetFiles("*.jpg"))
            {
                imageNames.Add(file.Name);
            }
            ViewBag.ImageNames = imageNames;

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}