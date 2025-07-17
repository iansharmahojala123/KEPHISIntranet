using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KEPHISIntranet.Migrations
{
    /// <inheritdoc />
    public partial class AddParticipantCountAndAdminApprovalToZoomRequests : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AdminApproval",
                table: "ZoomMeetingRequests",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ParticipantCount",
                table: "ZoomMeetingRequests",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdminApproval",
                table: "ZoomMeetingRequests");

            migrationBuilder.DropColumn(
                name: "ParticipantCount",
                table: "ZoomMeetingRequests");
        }
    }
}
