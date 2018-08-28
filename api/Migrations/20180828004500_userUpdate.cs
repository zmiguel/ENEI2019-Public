using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class userUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    username = table.Column<string>(nullable: true),
                    fullname = table.Column<string>(nullable: true),
                    gender = table.Column<string>(nullable: true),
                    age = table.Column<int>(nullable: false),
                    phone = table.Column<int>(nullable: false),
                    email = table.Column<string>(nullable: true),
                    passwordhash = table.Column<byte[]>(nullable: true),
                    passwordsalt = table.Column<byte[]>(nullable: true),
                    university = table.Column<string>(nullable: true),
                    adress = table.Column<string>(nullable: true),
                    country = table.Column<string>(nullable: true),
                    city = table.Column<string>(nullable: true),
                    linkedin = table.Column<string>(nullable: true),
                    lastlogin = table.Column<DateTime>(nullable: false),
                    registed = table.Column<DateTime>(nullable: false),
                    qrcode = table.Column<string>(nullable: true),
                    role = table.Column<string>(nullable: true),
                    degree = table.Column<string>(nullable: true),
                    schoolyear = table.Column<int>(nullable: false),
                    profileicon = table.Column<string>(nullable: true),
                    company = table.Column<string>(nullable: true),
                    position = table.Column<string>(nullable: true),
                    about = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Values",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Values", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Values");
        }
    }
}
