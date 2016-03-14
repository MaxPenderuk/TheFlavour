using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TheFlavour.Models;

namespace TheFlavour.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            HomeModel homeModel = new HomeModel() {
                ImageNames = new List<string>(),
                Offers = new List<SpecialOffer>()
            };

            // Path to images we need for slider.
            string filePath = Server.MapPath(@"~/images/Home/Slides/");
            DirectoryInfo imgDir = new DirectoryInfo(filePath);
            
            foreach (var file in imgDir.GetFiles("*.jpg"))
            {
                homeModel.ImageNames.Add(file.Name);
            }

            // Add info about offers to render.
            homeModel.Offers.Add(new SpecialOffer(
                    "../images/Home/Events/offer1-200x200.jpg",
                    "breakfast menu only $19<sup>.50</sup>",
                    "Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor nequeu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim hasellus mirolestie magna non lorem ipsum dolor site amet."
                ));

            homeModel.Offers.Add(new SpecialOffer(
                    "../images/Home/Events/offer21-200x200.jpg",
                    "cooking class tuesday",
                    "Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor nequeu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim hasellus mirolestie magna non lorem ipsum dolor site amet."
                ));

            homeModel.Offers.Add(new SpecialOffer(
                    "../images/Home/Events/offer3-200x200.jpg",
                    "&#8220;HAPPY HOUR&#8221; through 2<sup>PM</sup> &#8211; 3<sup>PM</sup>",
                    "Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor nequeu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim hasellus mirolestie magna non lorem ipsum dolor site amet."
                ));

            return View(homeModel);
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