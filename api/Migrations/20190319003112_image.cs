using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class image : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cromos_Photos_imgId",
                table: "Cromos");

            migrationBuilder.DropIndex(
                name: "IX_Cromos_imgId",
                table: "Cromos");

            migrationBuilder.DropColumn(
                name: "imgId",
                table: "Cromos");

            migrationBuilder.AddColumn<string>(
                name: "img",
                table: "Cromos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "img",
                table: "Cromos");

            migrationBuilder.AddColumn<int>(
                name: "imgId",
                table: "Cromos",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Cromos_imgId",
                table: "Cromos",
                column: "imgId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cromos_Photos_imgId",
                table: "Cromos",
                column: "imgId",
                principalTable: "Photos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
