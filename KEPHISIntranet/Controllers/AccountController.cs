using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserManagement.ViewModels;

namespace KEPHISIntranet.Controllers
{
    public class AccountController : Controller
    {
        // GET: Login Page
        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        // POST: Handle login authentication
        [HttpPost]
        public ActionResult Login(LogInViewModel loginmodel)
        {
            if (loginmodel.UserNameOrEmail == "admin" && loginmodel.Password == "1234")
            {
                return RedirectToAction("Index", "Home"); // Redirect to Home page if login is successful
            }
            else
            {
                ViewBag.ErrorMessage = "Invalid username or password";
                return View();
            }
        }

        // GET: Registration Page
        [HttpGet]
        public ActionResult Register()
        {
            return View();
        }

        // POST: Handle user registration (You can implement actual registration logic)
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Register(IFormCollection form)
        {
            try
            {
                // Add registration logic here
                return RedirectToAction("Login");
            }
            catch
            {
                ViewBag.ErrorMessage = "Registration failed. Try again.";
                return View();
            }
        }

        // GET: Dashboard or landing page after login
        public ActionResult Index()
        {
            return View();
        }

        // Handle Logout and redirect to login
        public ActionResult Logout()
        {
            return RedirectToAction("Login", "Account");
        }

        // GET: Account details (Optional)
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Edit account details (Optional)
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Update account details
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection form)
        {
            try
            {
                // Add update logic here
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Delete account confirmation (Optional)
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Handle account deletion
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection form)
        {
            try
            {
                // Add deletion logic here
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
