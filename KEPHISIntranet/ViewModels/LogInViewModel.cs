using System.ComponentModel.DataAnnotations;

namespace KEPHISIntranet.ViewModels
{
    public class LogInViewModel
    {
        [Required(ErrorMessage = "Username or Email is required.")]
        [Display(Name = "Username or Email")]
        public string UserNameOrEmail { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required.")]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;

        public bool RememberMe { get; set; }

        public string ReturnUrl { get; set; } = "/";
    }
}
