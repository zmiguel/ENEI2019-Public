﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using api.Data;

namespace api.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.0-rtm-35687")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<int>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<int>("UserId");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("api.Models.Cromos", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("DescLocked");

                    b.Property<string>("DescMostrar");

                    b.Property<string>("DescUnlocked");

                    b.Property<string>("Nome");

                    b.Property<string>("QRCode");

                    b.Property<string>("img");

                    b.Property<string>("logo");

                    b.Property<int>("pontos");

                    b.Property<bool>("unlocked");

                    b.Property<string>("websiteCromo");

                    b.HasKey("Id");

                    b.ToTable("Cromos");
                });

            modelBuilder.Entity("api.Models.Event", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Desc");

                    b.Property<string>("Nome");

                    b.Property<bool>("aDecorrer");

                    b.Property<string>("custo");

                    b.Property<string>("horas");

                    b.Property<string>("imagem");

                    b.Property<string>("localizacao");

                    b.Property<string>("notas");

                    b.HasKey("Id");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("api.Models.EventLoc", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Desc");

                    b.Property<int>("EventId");

                    b.Property<int?>("ImgId");

                    b.Property<double>("Lat");

                    b.Property<double>("Long");

                    b.Property<string>("Nome");

                    b.Property<string>("desafio");

                    b.Property<string>("localizacao");

                    b.Property<string>("mainPhoto");

                    b.Property<int>("pontos");

                    b.Property<string>("squarePhoto");

                    b.HasKey("Id");

                    b.HasIndex("ImgId");

                    b.ToTable("EventLocs");
                });

            modelBuilder.Entity("api.Models.EventLocVisited", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("LocationId");

                    b.Property<int?>("TeamId");

                    b.Property<bool>("complete");

                    b.Property<DateTime>("timestamp");

                    b.HasKey("Id");

                    b.HasIndex("LocationId");

                    b.HasIndex("TeamId");

                    b.ToTable("EventLocsVisited");
                });

            modelBuilder.Entity("api.Models.Log", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("UserId");

                    b.Property<int?>("UserId1");

                    b.Property<int>("amount");

                    b.Property<int>("available");

                    b.Property<string>("logType");

                    b.Property<int?>("productId");

                    b.Property<string>("transactionId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.HasIndex("UserId1");

                    b.HasIndex("productId");

                    b.ToTable("Logs");
                });

            modelBuilder.Entity("api.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateAdded");

                    b.Property<string>("Description");

                    b.Property<bool>("IsMain");

                    b.Property<string>("Url");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("api.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("basePrice");

                    b.Property<string>("name");

                    b.Property<float>("revenue");

                    b.Property<int>("sold");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("api.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("api.Models.Team", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CapQR");

                    b.Property<int>("EventId");

                    b.Property<int>("NMembros");

                    b.Property<string>("Nome");

                    b.Property<int>("Pontos");

                    b.Property<bool>("pagamento");

                    b.Property<string>("pagamentoVerifyCode");

                    b.HasKey("Id");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("api.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("QRcode");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.Property<string>("cromos");

                    b.Property<int>("drinks");

                    b.Property<int>("food");

                    b.Property<string>("fullName");

                    b.Property<int?>("teamID");

                    b.Property<string>("university");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.HasIndex("teamID");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("api.Models.UserRole", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("api.Models.Value", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("id");

                    b.ToTable("Values");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.HasOne("api.Models.Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.HasOne("api.Models.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.HasOne("api.Models.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.HasOne("api.Models.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("api.Models.EventLoc", b =>
                {
                    b.HasOne("api.Models.Photo", "Img")
                        .WithMany()
                        .HasForeignKey("ImgId");
                });

            modelBuilder.Entity("api.Models.EventLocVisited", b =>
                {
                    b.HasOne("api.Models.EventLoc", "Location")
                        .WithMany()
                        .HasForeignKey("LocationId");

                    b.HasOne("api.Models.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId");
                });

            modelBuilder.Entity("api.Models.Log", b =>
                {
                    b.HasOne("api.Models.User")
                        .WithMany("logsFebrada")
                        .HasForeignKey("UserId");

                    b.HasOne("api.Models.User")
                        .WithMany("logsFestarola")
                        .HasForeignKey("UserId1");

                    b.HasOne("api.Models.Product", "product")
                        .WithMany()
                        .HasForeignKey("productId");
                });

            modelBuilder.Entity("api.Models.Photo", b =>
                {
                    b.HasOne("api.Models.User", "User")
                        .WithMany("Photos")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("api.Models.User", b =>
                {
                    b.HasOne("api.Models.Team", "team")
                        .WithMany()
                        .HasForeignKey("teamID");
                });

            modelBuilder.Entity("api.Models.UserRole", b =>
                {
                    b.HasOne("api.Models.Role", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("api.Models.User", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
