using KvizAPI.Entities;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace KvizAPI.Context
{
    public class QuizDbContext : IdentityDbContext<ApplicationUser, IdentityRole<int>, int>
    {
        public DbSet<Question>? Questions { get; set; }

        public DbSet<Answer>? Answers { get; set; }

        public DbSet<Quiz>? Quizzes { get; set; }

        public DbSet<ApplicationUserQuiz>? UsersQuizzes { get; set; }

        public QuizDbContext(DbContextOptions<QuizDbContext> options)
            : base(options) { }
        public QuizDbContext()
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUserQuiz>()
                .HasKey(x => new { x.CompletedQuizzesId, x.CompletedUsersId });

            builder.Entity<Quiz>()
                .HasMany(x => x.Questions)
                .WithOne(x => x.Quiz)
                .HasForeignKey(x => x.QuizId);
        }
    }
}
