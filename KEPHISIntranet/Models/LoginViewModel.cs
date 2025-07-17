using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace UserManagement.ViewModels
{
    public class LogInViewModel
    {
        [DisplayName("Username or E-mail:")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "Enter the user name")]
        public string UserNameOrEmail { get; set; }

        [DisplayName("Password:")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "Enter password")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DisplayName("Remember Me")]
        public bool RememberMe { get; set; }

        public string ReturnUrl { get; set; }
    }
}
