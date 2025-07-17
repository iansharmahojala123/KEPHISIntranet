using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace KEPHISIntranet.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration _configuration;

        public EmailSender(IConfiguration configuration)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            using var smtpClient = new SmtpClient
            {
                Host = _configuration["Smtp:Host"] ?? throw new InvalidOperationException("SMTP host is not configured."),
                Port = int.TryParse(_configuration["Smtp:Port"], out int port) ? port : 25,
                EnableSsl = false,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(
                    _configuration["Smtp:Username"],
                    _configuration["Smtp:Password"]),
                DeliveryMethod = SmtpDeliveryMethod.Network
            };

            using var mailMessage = new MailMessage
            {
                From = new MailAddress(
                    _configuration["Smtp:SenderEmail"] ?? throw new InvalidOperationException("Sender email is not configured."),
                    "KEPHIS Intranet"),
                Subject = subject,
                Body = htmlMessage,
                IsBodyHtml = true
            };

            mailMessage.To.Add(email);

            try
            {
                await smtpClient.SendMailAsync(mailMessage);
            }
            catch (Exception ex)
            {
                // Optional: log the error or rethrow
                Console.WriteLine($"Email sending failed: {ex.Message}");
                throw;
            }
        }
    }
}
