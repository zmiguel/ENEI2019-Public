using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "aDecorrer",
                table: "Events",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "horas",
                table: "Events",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "imagem",
                table: "Events",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "localizacaoo",
                table: "Events",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "notas",
                table: "Events",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "fullName",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "university",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "aDecorrer",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "horas",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "imagem",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "localizacaoo",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "notas",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "fullName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "university",
                table: "AspNetUsers");
        }
    }
}
