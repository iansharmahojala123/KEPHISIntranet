using System;
using System.ComponentModel.DataAnnotations;

namespace YourAppNamespace.Models
{
    public class ZoomMeetingRequest
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        [Required]
        [DataType(DataType.Time)]
        public TimeSpan StartTime { get; set; }

        [Required]
        [DataType(DataType.Time)]
        public TimeSpan EndTime { get; set; }

        public string? Participants { get; set; }

        public int ParticipantCount { get; set; }

        [StringLength(50)]
        public string? AdminApproval { get; set; }

        public string? CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
