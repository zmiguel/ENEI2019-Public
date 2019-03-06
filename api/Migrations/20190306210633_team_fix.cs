using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class team_fix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QRcode",
                table: "Teams");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "QRcode",
                table: "Teams",
                nullable: true);
        }
    }
}
