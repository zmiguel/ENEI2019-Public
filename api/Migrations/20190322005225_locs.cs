using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class locs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "mainPhoto",
                table: "EventLocs",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "squarePhoto",
                table: "EventLocs",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "mainPhoto",
                table: "EventLocs");

            migrationBuilder.DropColumn(
                name: "squarePhoto",
                table: "EventLocs");
        }
    }
}
