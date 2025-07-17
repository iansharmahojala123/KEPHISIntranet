using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using KEPHISIntranet.Models;
using KEPHISIntranet.ViewModels;

namespace KEPHISIntranet.Controllers
{
    [Authorize(Roles = "Admin")]
    public class UserManagementController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserManagementController(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public IActionResult UsersList()
        {
            return RedirectToAction("ManageRoles");
        }

        public async Task<IActionResult> ManageRoles()
        {
            var users = _userManager.Users.ToList();
            var model = new List<UserRolesViewModel>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                model.Add(new UserRolesViewModel
                {
                    UserId = user.Id,
                    Name = user.Name,
                    UserName = user.UserName,
                    Email = user.Email,
                    CurrentRole = roles.FirstOrDefault() ?? "None",
                    IsDisabled = user.IsDisabled
                });
            }

            ViewBag.AllRoles = _roleManager.Roles
                .Select(r => r.Name)
                .Where(r => r != "HR")
                .ToList();

            return View(model);
        }

        // Unified update: Name, Username, Email, Role, or ToggleStatus
        [HttpPost]
        public async Task<IActionResult> UpdateUser(string userId, string newName, string newUserName, string newEmail, string newRole, string actionType)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                TempData["Error"] = "User not found.";
                return RedirectToAction("ManageRoles");
            }

            if (actionType == "toggle")
            {
                user.IsDisabled = !user.IsDisabled;
                await _userManager.UpdateAsync(user);

                TempData["Success"] = $"User {(user.IsDisabled ? "disabled" : "enabled")} successfully.";
                return RedirectToAction("ManageRoles");
            }

            if (string.IsNullOrWhiteSpace(newName) || string.IsNullOrWhiteSpace(newUserName) || string.IsNullOrWhiteSpace(newEmail) || string.IsNullOrWhiteSpace(newRole))
            {
                TempData["Error"] = "Name, Username, Email, and Role are required.";
                return RedirectToAction("ManageRoles");
            }

            user.Name = newName;
            user.UserName = newUserName;
            user.Email = newEmail;

            var currentRoles = await _userManager.GetRolesAsync(user);
            var currentRole = currentRoles.FirstOrDefault();

            if (currentRole != newRole)
            {
                var removeResult = await _userManager.RemoveFromRolesAsync(user, currentRoles);
                if (!removeResult.Succeeded)
                {
                    TempData["Error"] = "Failed to remove current role.";
                    return RedirectToAction("ManageRoles");
                }

                var addResult = await _userManager.AddToRoleAsync(user, newRole);
                if (!addResult.Succeeded)
                {
                    TempData["Error"] = "Failed to assign new role.";
                    return RedirectToAction("ManageRoles");
                }

                user.Role = newRole;
            }

            var updateResult = await _userManager.UpdateAsync(user);
            if (updateResult.Succeeded)
            {
                TempData["Success"] = "User updated successfully.";
            }
            else
            {
                TempData["Error"] = string.Join("; ", updateResult.Errors.Select(e => e.Description));
            }

            return RedirectToAction("ManageRoles");
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(string Name, string UserName, string Email, string Password, string Role)
        {
            if (string.IsNullOrWhiteSpace(Name) ||
                string.IsNullOrWhiteSpace(UserName) ||
                string.IsNullOrWhiteSpace(Email) ||
                string.IsNullOrWhiteSpace(Password) ||
                string.IsNullOrWhiteSpace(Role))
            {
                TempData["Error"] = "All fields are required.";
                return RedirectToAction("ManageRoles");
            }

            var existingUser = await _userManager.FindByEmailAsync(Email);
            if (existingUser != null)
            {
                TempData["Error"] = "User with this email already exists.";
                return RedirectToAction("ManageRoles");
            }

            var user = new ApplicationUser
            {
                Name = Name,
                UserName = UserName,
                Email = Email,
                EmailConfirmed = true,
                MustChangePassword = true,
                Role = Role,
                IsDisabled = false
            };

            var result = await _userManager.CreateAsync(user, Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, Role);
                TempData["Success"] = "User created successfully.";
            }
            else
            {
                TempData["Error"] = string.Join("; ", result.Errors.Select(e => e.Description));
            }

            return RedirectToAction("ManageRoles");
        }
    }
}
