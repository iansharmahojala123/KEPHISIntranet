using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KEPHISIntranet;
using KEPHISIntranet.Models;

namespace KEPHISIntranet.Controllers
{
    [Authorize] // Require authentication for all actions
    public class AnnouncementsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AnnouncementsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: /Announcements
        public async Task<IActionResult> Index()
        {
            var announcements = await _context.Announcements
                .OrderByDescending(a => a.DateCreated)
                .ToListAsync();

            return View(announcements);
        }

        // GET: /Announcements/Details/5
        public async Task<IActionResult> Details(int id)
        {
            var announcement = await _context.Announcements.FindAsync(id);
            if (announcement == null)
                return NotFound();

            return View(announcement);
        }

        // GET: /Announcements/Create
        [Authorize(Roles = "Admin,Communications")]
        public IActionResult Create()
        {
            return View();
        }

        // POST: /Announcements/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin,Communications")]
        public async Task<IActionResult> Create(Announcement announcement)
        {
            if (ModelState.IsValid)
            {
                announcement.DateCreated = DateTime.Now;
                _context.Announcements.Add(announcement);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }

            return View(announcement);
        }

        // GET: /Announcements/Edit/5
        [Authorize(Roles = "Admin,Communications")]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
                return NotFound();

            var announcement = await _context.Announcements.FindAsync(id);
            if (announcement == null)
                return NotFound();

            return View(announcement);
        }

        // POST: /Announcements/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin,Communications")]
        public async Task<IActionResult> Edit(int id, Announcement announcement)
        {
            if (id != announcement.ID)
                return NotFound();

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(announcement);
                    await _context.SaveChangesAsync();
                    return RedirectToAction(nameof(Index));
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!_context.Announcements.Any(e => e.ID == id))
                        return NotFound();

                    throw;
                }
            }

            return View(announcement);
        }

        // GET: /Announcements/Delete/5
        [Authorize(Roles = "Admin,Communications")]
        public async Task<IActionResult> Delete(int id)
        {
            var announcement = await _context.Announcements.FindAsync(id);
            if (announcement == null)
                return NotFound();

            return View(announcement);
        }

        // POST: /Announcements/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin,Communications")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var announcement = await _context.Announcements.FindAsync(id);
            if (announcement != null)
            {
                _context.Announcements.Remove(announcement);
                await _context.SaveChangesAsync();
            }

            return RedirectToAction(nameof(Index));
        }

        // GET: /Announcements/CreateSample
        [Authorize(Roles = "Admin,Communications")]
        public async Task<IActionResult> CreateSample()
        {
            if (!_context.Announcements.Any())
            {
                _context.Announcements.AddRange(
                    new Announcement
                    {
                        CreatedBy = "System Admin",
                        AnnouncementText = "Welcome to the new dashboard! Stay tuned for updates.",
                        DateCreated = DateTime.Now
                    },
                    new Announcement
                    {
                        CreatedBy = "Communications Department",
                        AnnouncementText = "The next team-building activity is scheduled for Friday at 3 PM.",
                        DateCreated = DateTime.Now
                    }
                );

                await _context.SaveChangesAsync();
            }

            return RedirectToAction(nameof(Index));
        }
    }
}
