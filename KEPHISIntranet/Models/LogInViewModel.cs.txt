using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace UserManagement.ViewModels
{
    public class LogInViewModel
    {
        [DisplayName("Username or E-mail:")]
        [Required(AllowEmptyStrings =false,ErrorMessage ="Enter the user name")]
        public string UserNameOrEmail { get; set; }
        [DisplayName("Password:")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "Enter password")]
        public string Password { get; set; }
        public bool RememberMe { get; set; }
        public string ReturnUrl { get; set; }
    }
}
