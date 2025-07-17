using KEPHISIntranet.Models;
using KEPHISIntranet.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace KEPHISIntranet.Controllers
{
    public class AccountController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailSender _emailSender;

        public AccountController(SignInManager<ApplicationUser> signInManager,
            UserManager<ApplicationUser> userManager,
            IEmailSender emailSender)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _emailSender = emailSender;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Login(string? returnUrl = null)
        {
            return View(new LogInViewModel { ReturnUrl = returnUrl ?? "/" });
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LogInViewModel model)
        {
            if (!ModelState.IsValid)
            {
                TempData["Message"] = "Please fill in all required fields.";
                return View(model);
            }

            var user = await _userManager.FindByEmailAsync(model.UserNameOrEmail)
                     ?? await _userManager.FindByNameAsync(model.UserNameOrEmail);

            if (user == null)
            {
                TempData["Message"] = "User not found.";
                return View(model);
            }

            // ✅ Check if user is disabled
            if (user.IsDisabled)
            {
                TempData["Message"] = "Your account has been disabled. Contact the administrator.";
                return View(model);
            }

            if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                TempData["Message"] = "Your email is not confirmed. Please contact the administrator.";
                return View(model);
            }

            if (await _userManager.IsLockedOutAsync(user))
            {
                TempData["Message"] = "Your account is locked. Try again later.";
                return View(model);
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!isPasswordValid)
            {
                TempData["Message"] = "Invalid login credentials.";
                return View(model);
            }

            if (user.MustChangePassword)
            {
                TempData["UserId"] = user.Id;
                TempData["TempPassword"] = model.Password;
                return RedirectToAction("ChangePasswordBeforeLogin");
            }

            var result = await _signInManager.PasswordSignInAsync(
                user.UserName!, model.Password, model.RememberMe, lockoutOnFailure: true);

            if (result.Succeeded)
            {
                TempData["Message"] = "Login successful.";
                return Redirect(string.IsNullOrEmpty(model.ReturnUrl) ? "/" : model.ReturnUrl);
            }

            TempData["Message"] = result.IsLockedOut ?
                "Account locked due to multiple failed login attempts." :
                result.IsNotAllowed ? "Login not allowed. Contact administrator." :
                "Login failed. Please try again.";

            return View(model);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ChangePasswordBeforeLogin()
        {
            if (TempData["UserId"] == null || TempData["TempPassword"] == null)
            {
                TempData["Message"] = "Session expired. Please login again.";
                return RedirectToAction("Login");
            }

            ViewBag.UserId = TempData["UserId"];
            ViewBag.TempPassword = TempData["TempPassword"];
            return View(new ChangePasswordViewModel());
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ChangePasswordBeforeLogin(string userId, string tempPassword, ChangePasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.UserId = userId;
                ViewBag.TempPassword = tempPassword;
                return View(model);
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                TempData["Message"] = "User not found.";
                return RedirectToAction("Login");
            }

            var isValid = await _userManager.CheckPasswordAsync(user, tempPassword);
            if (!isValid)
            {
                TempData["Message"] = "Invalid session. Please log in again.";
                return RedirectToAction("Login");
            }

            var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
            if (result.Succeeded)
            {
                user.MustChangePassword = false;
                await _userManager.UpdateAsync(user);
                await _signInManager.SignInAsync(user, isPersistent: false);

                TempData["Message"] = "Password changed successfully.";
                return RedirectToAction("Index", "Home");
            }

            foreach (var error in result.Errors)
                ModelState.AddModelError(string.Empty, error.Description);

            ViewBag.UserId = userId;
            ViewBag.TempPassword = tempPassword;
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            TempData["Message"] = "You have been logged out.";
            return RedirectToAction("Login", "Account");
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult AccessDenied() => View();

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ForgotPassword() => View();

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);

            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null || !string.Equals(user.Email, model.Email, System.StringComparison.OrdinalIgnoreCase))
            {
                TempData["Message"] = "No user found with the provided username and email.";
                return View(model);
            }

            if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                TempData["Message"] = "Your email is not confirmed.";
                return View(model);
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var callbackUrl = Url.Action("ResetPassword", "Account", new { token, email = model.Email }, Request.Scheme);

            await _emailSender.SendEmailAsync(model.Email, "Reset Password",
                $"Please reset your password by clicking <a href='{callbackUrl}'>here</a>.");

            TempData["Message"] = "A password reset link has been sent if your account exists.";
            return View("ForgotPassword");
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ResetPassword(string token, string email)
        {
            if (token == null || email == null)
                return RedirectToAction("Login");

            return View(new ResetPasswordViewModel { Token = token, Email = email });
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                TempData["Message"] = "User not found.";
                return RedirectToAction("Login");
            }

            var result = await _userManager.ResetPasswordAsync(user, model.Token, model.Password);
            if (result.Succeeded)
            {
                TempData["Message"] = "Password successfully reset.";
                return RedirectToAction("Login");
            }

            foreach (var error in result.Errors)
                ModelState.AddModelError(string.Empty, error.Description);

            return View(model);
        }
    }
}
