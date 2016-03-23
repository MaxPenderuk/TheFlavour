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
using PagedList;
using TheFlavour.App_Start;

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

        // GET: Home/About
        public ActionResult About()
        {
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
                // Get MailGun setup from `App_Start/Mail.cs`.
                Tuple<RestClient, RestRequest> clientRes = Mail.MailAuth();

                RestClient client = clientRes.Item1;
                RestRequest request = clientRes.Item2;

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

        // GET: Home/Menu
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

        // GET: Home/Gallery
        public ActionResult Gallery()
        {
            return View();
        }

        // GET: Home/Events
        public ActionResult Events()
        {
            return View();
        }

        // GET: Home/Blog
        public ActionResult Blog(int? auth, string currentFilter, string searchString, int? page, int? categoryID, int Id = 6)
        {
            var allGroups = (from x in db.Groups select x).ToList();
            var group = db.Groups.Where(x => x.ID == Id).FirstOrDefault(); 
            ViewBag.Group = allGroups;
            
            List<Article> article = new List<Article>();

            if (!String.IsNullOrEmpty(searchString))
            {
                page = 1;
                article = db.Articles.Where(x => x.Title.Contains(searchString)).ToList();
            }

            ViewBag.SearchString = searchString;

            // If `All Categories` tab is active
            // and we didn't select author.
            if (auth == null && string.IsNullOrEmpty(searchString))
            {
                article = (Id == 6) ? (from x in db.Articles select x).ToList()
                    : group.Articles.ToList();
            }
            else if (string.IsNullOrEmpty(searchString) && auth != null)
            {
                article = db.Articles.Where(x => x.Author_ID == auth).ToList();
                ViewBag.Author = db.Authors.Find(auth).Name;
            }

            // Amount of articles on page.
            int pageSize = 6;
            int pageNumber = (page ?? 1);

            var pagedlist = article.ToPagedList(pageNumber, pageSize);


            // To set the next & previous pages of paginator.
            if (pageNumber == 1)
            {
                ViewBag.Previous = "javascript:void(0);";
            }
            else
            {
                ViewBag.Previous = (auth != null) ? string.Format("/Blog?auth={0}&page={1}", auth, pageNumber - 1)
                    : string.Format("/Blog/{0}?page={1}", Id, pageNumber - 1);
            }

            if (pageNumber == pagedlist.PageCount)
            {
                ViewBag.Next = "javascript:void(0);";
            }
            else
            {
                ViewBag.Next = (auth != null) ? string.Format("/Blog?auth={0}&page={1}", auth, pageNumber + 1)
                    : string.Format("/Blog/{0}?page={1}", Id, pageNumber + 1);
            }

            // To keep track of the selected group.
            ViewBag.GroupID = Id;

            ViewBag.HidePagination = false;
            if (article.Count <= pageSize) ViewBag.HidePagination = true;

            // Send info for the right sidebar.
            var rightSideInfo = GetRightSideInfo();
            ViewBag.FreshArticles = rightSideInfo.Item1;
            ViewBag.MostCommented = rightSideInfo.Item2;

            if (auth != null) return View("Articles", pagedlist);
            return View(pagedlist);
        }

        // GET: Home/Article
        public ActionResult Article(int id)
        {
            var article = db.Articles.Where(x => x.ID == id).ToList();

            if (article.Count == 0) return HttpNotFound();

            // To find all pictures related to the current article.
            var pictures = db.Pictures.Where(x => x.ArticleID == id).ToList();
            foreach (var item in pictures)
            {
                item.ImageLink = "http://" + Request.Url.Authority + item.ImageLink;
            }
            ViewBag.PicLinks = pictures;

            // To select similar posts.
            Random rnd = new Random();
            int groupID = article.First().Group_ID;
            var artByGroup = db.Articles.Where(x => x.Group_ID == groupID).ToList();
            var similarPost = artByGroup.OrderBy(ID => rnd.Next()).Take(3).ToList();
            ViewBag.SimilarPosts = similarPost.Except(article).ToList();

            var articleID = article.First().ID;
            ViewBag.CommentsAmount = db.Comments.Where(x => x.ArticleID == articleID).Count();

            // Common model for 'Article' & 'CommentForm' classes.
            ViewModels.ArtCom articleComments = new ArtCom() {
                Article = article.First(),
                CommentForm = new CommentForm()
            };

            // Send info for the right sidebar.
            var rightSideInfo = GetRightSideInfo();
            ViewBag.FreshArticles = rightSideInfo.Item1;
            ViewBag.MostCommented = rightSideInfo.Item2;

            return View(articleComments);
        }


        // POST: Home/AddComment
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AddComment([Bind(Include = "Name, Email, Website, Message")] ViewModels.CommentForm comments, int? currentID, int articleID)
        {

            if (ModelState.IsValid)
            {
                var newComment = new Comment();

                newComment.Author = comments.Name;
                newComment.Email = comments.Email;
                newComment.Website = comments.Website;
                newComment.Text = comments.Message;
                newComment.ArticleID = articleID;
                newComment.ParentID = currentID;

                db.Comments.Add(newComment);
                db.SaveChanges();

                // If we've replied on a comment,
                // send a message to person who wrote that comment.
                if (currentID != null)
                {
                    Email((int)currentID, articleID, newComment.ID);
                }
            }

            return RedirectToAction("Article", new { id = articleID });
        }

        // To send message to person whose comment have been replied. 
        public void Email(int id, int articleID, int commentID)
        {
            var author = db.Comments.Find(id);

            Tuple<RestClient, RestRequest> clientRes = Mail.MailAuth();
            RestClient client = clientRes.Item1;
            RestRequest request = clientRes.Item2;
            request.AddParameter("to", author.Email);

            request.AddParameter("from", "support@test.pro");
            request.AddParameter("subject", "New reply on your message!");
            request.AddParameter("text", "Here's your link on replied message! " + 
                "http://" + Request.Url.Authority + "/Article/" + articleID + "#comment" + commentID);
            request.Method = Method.POST;
            client.Execute(request);
        }

        // Get info for `Fresh Posts` and `Most Commented` blocks on the right side.
        public Tuple<List<Article>, List<AmountOfComments>> GetRightSideInfo()
        {
            var articles = (from i in db.Articles select i).OrderByDescending(i => i.ID).Take(7).ToList();
            var commentsInArt = (from i in db.Articles
                                 select new { i.ID, Title = i.Title, Count = i.Comments.Count })
                                 .OrderByDescending(i => i.Count).Take(7);

            // A list for the most commented articles in descending order.
            List<AmountOfComments> amount = new List<AmountOfComments>();

            foreach (var item in commentsInArt)
            {
                AmountOfComments current = new AmountOfComments() {
                    ID = item.ID,
                    Title = item.Title,
                    Count = item.Count
                };
                amount.Add(current);
            }

            return new Tuple<List<Models.Article>, List<AmountOfComments>>(articles, amount);
        }
        
    }
}