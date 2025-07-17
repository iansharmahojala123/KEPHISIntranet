using KEPHISIntranet.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using YourAppNamespace.Models;

namespace KEPHISIntranet
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Announcement> Announcements { get; set; }

        // ✅ Add this line:
        public DbSet<ZoomMeetingRequest> ZoomMeetingRequests { get; set; }
    }
}
