using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class updatev5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "pagamentoVerifyCode",
                table: "Teams",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<bool>(
                name: "pagamento",
                table: "Teams",
                nullable: false,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "pagamentoVerifyCode",
                table: "Teams",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "pagamento",
                table: "Teams",
                nullable: false,
                oldClrType: typeof(bool));
        }
    }
}
