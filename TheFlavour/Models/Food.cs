//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TheFlavour.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Food
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public Nullable<int> Category_ID { get; set; }
        public string ImageLink { get; set; }
    
        public virtual Category Category { get; set; }
    }
}
