namespace KEPHISIntranet.ViewModels
{
    public class UserRolesViewModel
    {
        public string UserId { get; set; } = string.Empty;

        // Editable Full Name
        public string Name { get; set; } = string.Empty;

        // Editable Username
        public string UserName { get; set; } = string.Empty;

        // Editable Email Address
        public string Email { get; set; } = string.Empty;

        // The user's currently assigned role
        public string? CurrentRole { get; set; }

        // Indicates whether the user is active or disabled
        public bool IsDisabled { get; set; }

        // Roles available for assignment (optional, useful for drop-downs)
        public List<string> AvailableRoles { get; set; } = new();
    }
}
