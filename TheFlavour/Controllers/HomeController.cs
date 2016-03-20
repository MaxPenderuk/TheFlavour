using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.Entity;
using System.Web.Mvc;
using TheFlavour.Models;
using TheFlavour.ViewModels;
using RestSharp;
using RestSharp.Authenticators;
using PagedList;

namespace TheFlavour.Controllers
{
    public class HomeController : Controller
    {
        private DishesEntities db = new DishesEntities();

        public ActionResult Index()
        {
            HomeModel homeModel = new HomeModel() {
                ImagePath = new List<string>(),
                Offers = new List<SpecialOffer>()
            };

            // Path to the images we need for slider.
            string filePath = Server.MapPath(@"~/images/Home/Slides/");
            DirectoryInfo imgDir = new DirectoryInfo(filePath);
            
            foreach (var file in imgDir.GetFiles("*.jpg"))
            {
                homeModel.ImagePath.Add("http://" + Request.Url.Authority + "/images/Home/Slides/" + file.Name);
            }

            // Add info about offers to render.
            homeModel.Offers.Add(new SpecialOffer(
                     "http://" + Request.Url.Authority + "/images/Home/Events/offer1-200x200.jpg",
                    "breakfast menu only $19<sup>.50</sup>",
                    "Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor nequeu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim hasellus mirolestie magna non lorem ipsum dolor site amet."
                ));

            homeModel.Offers.Add(new SpecialOffer(
                    "http://" + Request.Url.Authority + "/images/Home/Events/offer21-200x200.jpg",
                    "cooking class tuesday",
                    "Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor nequeu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim hasellus mirolestie magna non lorem ipsum dolor site amet."
                ));

            homeModel.Offers.Add(new SpecialOffer(
                    "http://" + Request.Url.Authority + "/images/Home/Events/offer3-200x200.jpg",
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

        public ActionResult Menu(int? Id)
        {
            List<Menu> curMenu = db.Menus.Where(x => x.ID == Id).ToList();

            if (curMenu.Count == 0) return HttpNotFound();

            // Get all types of menu we have.
            var menu = (from row in db.Menus select row).ToList();

            // Pick all except the selected one, 'cause we wanna
            // use it like the links to the other menu types.
            var exceptId = menu.Except(curMenu);

            // The name of menu type and pic that matches it.
            ViewBag.LogoT = new Tuple<string, string>
                    (curMenu.First().Name, "http://" + Request.Url.Authority + curMenu.First().LogoLink);

            ViewBag.Menu = curMenu.First().Categories;
            ViewBag.ExceptCur = exceptId;

            return View();
        }

        public ActionResult Gallery()
        {
            return View();
        }

        public ActionResult Events()
        {
            return View();
        }

        public ActionResult Blog(int Id, int? auth, int? page)
        {
            var allGroups = (from x in db.Groups select x).ToList();
            var group = db.Groups.Where(x => x.ID == Id).FirstOrDefault(); 
            ViewBag.Group = allGroups;

            // Amount of articles on page.
            int pageSize = 6;
            int pageNumber = (page ?? 1);

            List<Article> article = new List<Article>();

            // If `All Categories` tab is active.
            if (Id == 6)
            {
                article = (from x in db.Articles select x).ToList();
            }
            else
            {
                article = group.Articles.ToList(); ;
            }

            var pagedlist = article.ToPagedList(pageNumber, pageSize);


            // To set the next & previous pages of paginator.
            if (pageNumber == 1)
            {
                ViewBag.Previous = "javascript:void(0);";
            }
            else
            {
                ViewBag.Previous = string.Format("/Blog/{0}?page={1}", Id, pageNumber - 1);
            }

            if (pageNumber == pagedlist.PageCount)
            {
                ViewBag.Next = "javascript:void(0);";
            }
            else
            {
                ViewBag.Next = string.Format("/Blog/{0}?page={1}", Id, pageNumber + 1);
            }

            // To keep track of selected group.
            ViewBag.GroupID = Id;

            return View(pagedlist);
        }
        
    }
}