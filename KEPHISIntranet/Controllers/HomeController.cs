using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KEPHISIntranet.Models;
using System.Threading.Tasks;
using System.Linq;
using System;
using System.IO;
using System.Security.Claims;

namespace KEPHISIntranet.Controllers
{
    [Authorize] // Ensures user must be authenticated for any action in this controller
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext _context;

        public HomeController(ILogger<HomeController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            try
            {
                // ✅ Debug role claims (writes to file in wwwroot if role claim missing)
                var roleClaim = User.FindFirst("role")?.Value ?? "None";
                ViewBag.Role = roleClaim;

                var claimsOutput = User.Claims
                    .Select(c => $"{c.Type}: {c.Value}")
                    .ToList();

                var wwwRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                if (!Directory.Exists(wwwRootPath))
                    Directory.CreateDirectory(wwwRootPath);

                System.IO.File.WriteAllLines(Path.Combine(wwwRootPath, "claims.txt"), claimsOutput);

                // ✅ Fetch the 5 most recent announcements for homepage
                var announcements = await _context.Announcements
                    .OrderByDescending(a => a.DateCreated)
                    .Take(5)
                    .ToListAsync();

                ViewBag.Announcements = announcements;

                // ✅ Fetch ALL announcements for "Internal Communication" section
                var allAnnouncements = await _context.Announcements
                    .OrderByDescending(a => a.DateCreated)
                    .ToListAsync();

                ViewBag.AllAnnouncements = allAnnouncements;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving announcements");

                ViewBag.Announcements = Enumerable.Empty<Announcement>();
                ViewBag.AllAnnouncements = Enumerable.Empty<Announcement>();
            }

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult EmployeeServices()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel
            {
                RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier
            });
        }
    }
}
