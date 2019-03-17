using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class updatev3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "pagamento",
                table: "Teams",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "pagamentoVerifyCode",
                table: "Teams",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "pagamento",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "pagamentoVerifyCode",
                table: "Teams");
        }
    }
}
