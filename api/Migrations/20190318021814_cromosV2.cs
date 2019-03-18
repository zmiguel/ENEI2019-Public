using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class cromosV2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "pontos",
                table: "Cromos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "websiteCromo",
                table: "Cromos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "pontos",
                table: "Cromos");

            migrationBuilder.DropColumn(
                name: "websiteCromo",
                table: "Cromos");
        }
    }
}
