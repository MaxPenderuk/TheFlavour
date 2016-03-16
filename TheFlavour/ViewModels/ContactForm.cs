using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TheFlavour.ViewModels
{
    public class ContactForm
    {
        public string FullName { get; set; }

        [Required(ErrorMessage = "`Email` is required field.")]
        public string Email { get; set; }

        public string Message { get; set; }
    }
}