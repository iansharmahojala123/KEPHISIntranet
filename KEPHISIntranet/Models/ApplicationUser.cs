using Microsoft.AspNetCore.Identity;

namespace KEPHISIntranet.Models
{
    public class ApplicationUser : IdentityUser
    {
        // ✅ NEW: Full name of the user
        public string Name { get; set; }

        // Stores the user's primary role (e.g., Admin, Communications)
        public string Role { get; set; }

        // Enforce password change on first login
        public bool MustChangePassword { get; set; } = false;

        // Flag to disable/enable the user
        public bool IsDisabled { get; set; } = false;
    }
}
