using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using TheFlavour.Models;


namespace TheFlavour.ViewModels
{
    public class CommentForm
    {
        [Required(ErrorMessage = "`Name` is required field.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "`Email` is required field.")]
        public string Email { get; set; }
        public string Website { get; set; }
        [Required(ErrorMessage = "`Message` is required field.")]
        public string Message { get; set; }
        
    }
}