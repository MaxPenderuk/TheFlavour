using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TheFlavour.Models;
using TheFlavour.ViewModels;
using RestSharp;
using RestSharp.Authenticators;

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

            homeModel.PhoneNumber = "0844.335.1211";

            return View(homeModel);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }


        // GET: Home/Contact
        public ActionResult Contact()
        {
            // Dictionary that contains contact info for view.
            // Dictionary<className, new Tuple<title, content>>();
            Dictionary<string, Tuple<string, string>> info = new Dictionary<string, Tuple<string, string>>();
            info.Add("address", new Tuple<string, string>("ADDRESS", "Opposite Croma, Road 36, Jubilee Hills, Hyderabad"));
            info.Add("openning-hours", new Tuple<string, string>("OPENING HOURS", "12 Noon to 9 PM"));
            info.Add("phone-number", new Tuple<string, string>("PHONE NUMBER", "Opposite Croma, Road 36, Jubilee Hills, Hyderabad"));
            
            ViewBag.Info = info;
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public int Contact([Bind(Include = "FullName, Email, Message")] ContactForm contactForm, int form_id)
        {
            // If form is valid -> send a message via MailGun.
            if (ModelState.IsValid)
            {
                RestClient client = new RestClient();
                client.BaseUrl = new Uri("https://api.mailgun.net/v3");
                client.Authenticator = new HttpBasicAuthenticator("api",
                    "key-df53234228b396feac9da6e2cc066c01");
                RestRequest request = new RestRequest();
                request.AddParameter("domain",
                    "sandbox24405ccf53df416781e7bcf22d0261aa.mailgun.org", ParameterType.UrlSegment);
                request.Resource = "{domain}/messages";
                request.AddParameter("to", "jaspergrom@gmail.com");
                request.AddParameter("from", contactForm.Email);
                request.AddParameter("subject", "`Contact us` form");
                request.AddParameter("text", contactForm.Message);
                request.Method = Method.POST;
                client.Execute(request);
                return 1;
            }

            return 0;
        }
        
    }
}