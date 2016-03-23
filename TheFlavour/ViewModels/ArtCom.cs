using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TheFlavour.Models;

namespace TheFlavour.ViewModels
{
    public class ArtCom
    {
        public virtual Article Article { get; set; }
        public virtual CommentForm CommentForm { get; set; }
    }
}