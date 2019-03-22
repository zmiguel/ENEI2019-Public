using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class eventlocpos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "localizacao",
                table: "EventLocs",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "localizacao",
                table: "EventLocs");
        }
    }
}
