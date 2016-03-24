using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace TheFlavour.ViewModels
{
    public class ReservationForm
    {
        [Required(ErrorMessage = "`Date` is required field.")]
        public string Date { get; set; }

        [Required(ErrorMessage = "`PERS` is required field.")]
        public int Person { get; set; }

        [Required(ErrorMessage = "`Time` is required field.")]
        public string Time { get; set; }

        [Required(ErrorMessage = "`Period` is required field.")]
        public string Period { get; set; }
        public string Number { get; set; }
        public string Name { get; set; }

        [Required(ErrorMessage = "`Email` is required field.")]
        public string Email { get; set; }
        public string Message { get; set; }
        
    }
}