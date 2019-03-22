using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class eventloc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "desafio",
                table: "EventLocs",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "pontos",
                table: "EventLocs",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "desafio",
                table: "EventLocs");

            migrationBuilder.DropColumn(
                name: "pontos",
                table: "EventLocs");
        }
    }
}
