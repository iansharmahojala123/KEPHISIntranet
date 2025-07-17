using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using KEPHISIntranet;
using KEPHISIntranet.Models;
using KEPHISIntranet.Services;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity.UI.Services;

var builder = WebApplication.CreateBuilder(args);

// ✅ Configure EF Core + SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ✅ Configure Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.SignIn.RequireConfirmedAccount = true;
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

// ✅ Custom claims factory
builder.Services.AddScoped<IUserClaimsPrincipalFactory<ApplicationUser>, ApplicationUserClaimsPrincipalFactory>();

// ✅ Register the SMTP email sender service
builder.Services.AddTransient<IEmailSender, EmailSender>();

// ✅ Configure authentication cookie behavior
builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/Account/Login";
    options.AccessDeniedPath = "/Account/AccessDenied";
    options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
    options.SlidingExpiration = true;
});

// ✅ Configure Security Stamp validation interval (refresh cookies after role change)
builder.Services.Configure<SecurityStampValidatorOptions>(options =>
{
    options.ValidationInterval = TimeSpan.FromMinutes(1);
});

// ✅ Global authentication requirement
builder.Services.AddControllersWithViews(options =>
{
    var policy = new Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
    options.Filters.Add(new Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter(policy));
});

builder.Services.AddRazorPages();

var app = builder.Build();

// ✅ Middleware
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

// ✅ Routes
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapRazorPages();

// ✅ Seed roles and default users
await SeedUsersAndRolesAsync(app);

app.Run();

// ✅ Role and User Seeder
static async Task SeedUsersAndRolesAsync(WebApplication app)
{
    using var scope = app.Services.CreateScope();
    var services = scope.ServiceProvider;

    var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

    // 🔁 Include all needed roles
    string[] roles = { "Admin", "User", "Communications" };

    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }

    // ✅ Seed sample users for each role
    await CreateUserIfNotExists(userManager, "admin@kephis.org", "Admin@123456", "Admin");
    await CreateUserIfNotExists(userManager, "comms@kephis.org", "Comms@123456", "Communications");
    await CreateUserIfNotExists(userManager, "user@kephis.org", "User@123456", "User");
}

// ✅ Create specific user if not exists
static async Task CreateUserIfNotExists(UserManager<ApplicationUser> userManager, string email, string password, string role)
{
    var normalizedEmail = email.ToUpperInvariant();
    var existingUser = await userManager.Users
        .Where(u => u.NormalizedEmail == normalizedEmail)
        .FirstOrDefaultAsync();

    if (existingUser == null)
    {
        var user = new ApplicationUser
        {
            UserName = email,
            Email = email,
            EmailConfirmed = true,
            Role = role,
            MustChangePassword = true
        };

        var result = await userManager.CreateAsync(user, password);
        if (result.Succeeded)
        {
            await userManager.AddToRoleAsync(user, role);
            Console.WriteLine($"✅ {role} user created: {email}");
        }
        else
        {
            Console.WriteLine($"❌ Failed to create {role} user:");
            foreach (var error in result.Errors)
                Console.WriteLine($" - {error.Description}");
        }
    }
    else
    {
        var userRoles = await userManager.GetRolesAsync(existingUser);
        if (!userRoles.Contains(role))
        {
            await userManager.AddToRoleAsync(existingUser, role);
            Console.WriteLine($"ℹ️ {role} role assigned to existing user: {email}");
        }

        Console.WriteLine($"ℹ️ {role} user already exists: {email}");
    }
}
