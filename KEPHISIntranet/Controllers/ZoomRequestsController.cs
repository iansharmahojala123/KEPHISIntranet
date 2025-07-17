using KEPHISIntranet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using YourAppNamespace.Models;

namespace YourAppNamespace.Controllers
{
    [Authorize]
    public class ZoomRequestsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ZoomRequestsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: ZoomRequests/Create
        [HttpGet]
        public IActionResult Create()
        {
            if (TempData["Success"] != null)
                ViewBag.Success = TempData["Success"];

            return View();
        }

        // POST: ZoomRequests/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(ZoomMeetingRequest model)
        {
            if (ModelState.IsValid)
            {
                model.CreatedBy = User.Identity?.Name;
                model.CreatedDate = DateTime.Now;
                model.AdminApproval = "Pending";

                _context.ZoomMeetingRequests.Add(model);
                _context.SaveChanges();

                TempData["Success"] = "Your Zoom meeting request has been submitted successfully!";

                if (User.IsInRole("Admin"))
                {
                    return RedirectToAction(nameof(Index));
                }
                else
                {
                    return RedirectToAction(nameof(Create));
                }
            }

            return View(model);
        }

        // GET: ZoomRequests (Admin only)
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public IActionResult Index()
        {
            var requests = _context.ZoomMeetingRequests
                                   .OrderByDescending(x => x.CreatedDate)
                                   .ToList();

            if (TempData["Success"] != null)
                ViewBag.Success = TempData["Success"];

            return View(requests);
        }

        // POST: Save admin approvals
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult SaveApprovals(Dictionary<int, string> approvals)
        {
            if (approvals != null)
            {
                foreach (var pair in approvals)
                {
                    var requestId = pair.Key;
                    var approvalValue = pair.Value;

                    var request = _context.ZoomMeetingRequests
                                          .FirstOrDefault(r => r.Id == requestId);
                    if (request != null)
                    {
                        request.AdminApproval = approvalValue;
                    }
                }

                _context.SaveChanges();
            }

            TempData["Success"] = "Approvals saved successfully.";
            return RedirectToAction(nameof(Index));
        }

        // ✅ NEW: DELETE Zoom Request (Admin only)
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public IActionResult Delete(int id)
        {
            var zoomRequest = _context.ZoomMeetingRequests
                                      .FirstOrDefault(z => z.Id == id);

            if (zoomRequest == null)
            {
                return NotFound();
            }

            _context.ZoomMeetingRequests.Remove(zoomRequest);
            _context.SaveChanges();

            TempData["Success"] = "Zoom meeting request deleted successfully.";

            return RedirectToAction(nameof(Index));
        }
    }
}
