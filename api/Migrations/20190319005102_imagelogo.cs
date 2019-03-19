using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class imagelogo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "logo",
                table: "Cromos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "logo",
                table: "Cromos");
        }
    }
}
