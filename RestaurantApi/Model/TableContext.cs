using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace RestaurantApi.Model
{
    public class TableContext : DbContext
    {
        private readonly IConfiguration configuration;
        public TableContext(DbContextOptions<TableContext> options, IConfiguration configuration)
            : base(options)
        {
            this.configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(this.configuration.GetConnectionString(name: "WebApiDatabase"));
        }
        public DbSet<Table> Tables { get; set; } = null!;

        public DbSet<Order> Orders { get; set; } = null!;

        public DbSet<Menu> Menus { get; set; } = null!;

        public DbSet<Customer> Customers { get; set; } = null!;

        public DbSet<Waiter> Waiters { get; set; } = null!;

        public DbSet<UserInfo> UserInfos { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            PasswordHasher<UserInfo> passwordHasher = new PasswordHasher<UserInfo>();

            modelBuilder.Entity<UserInfo>().HasData(
                new UserInfo
                {
                    Id = 1,
                    UserName = "admin",
                    Password = passwordHasher.HashPassword(new UserInfo(), "admin"),
                    Email = "florin.cioban@stud.ubbcluj.ro",
                    FirstName = "Florin",
                    LastName = "Cioban",
                    CreatedAt = DateTime.Now
                }
            );
        }
    }

}