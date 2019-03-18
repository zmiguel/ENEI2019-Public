using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class updatev6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "custo",
                table: "Events",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "custo",
                table: "Events");
        }
    }
}
