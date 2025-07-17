using System;
using System.ComponentModel.DataAnnotations;

namespace KEPHISIntranet.Models
{
    public class Announcement
    {
        public int ID { get; set; }

        [Required]
        public string AnnouncementText { get; set; } = null!; // Required, will be set via form/controller

        [Required]
        public string CreatedBy { get; set; } = null!; // Required, will be set via form/controller

        public DateTime DateCreated { get; set; }
    }
}
