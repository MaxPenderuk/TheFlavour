using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TheFlavour.Models
{
    public class SpecialOffer
    {
        public string ImageLink;
        public string Header;
        public string Content;

        public SpecialOffer(string imageLink, string header, string content)
        {
            this.ImageLink = imageLink;
            this.Header = header;
            this.Content = content;
        }
    }
    
    public class HomeModel
    {
        public string PhoneNumber { get; set; }
        public List<string> ImageNames { get; set; }
        public List<SpecialOffer> Offers { get; set; }
    }
}