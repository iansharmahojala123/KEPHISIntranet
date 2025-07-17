using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KEPHISIntranet.Migrations
{
    /// <inheritdoc />
    public partial class RemoveNotesAndStatus_AddPendingOption : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Notes",
                table: "ZoomMeetingRequests");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "ZoomMeetingRequests");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "ZoomMeetingRequests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "ZoomMeetingRequests",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }
    }
}
