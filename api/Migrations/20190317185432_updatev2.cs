using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class updatev2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "localizacaoo",
                table: "Events",
                newName: "localizacao");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "localizacao",
                table: "Events",
                newName: "localizacaoo");
        }
    }
}
