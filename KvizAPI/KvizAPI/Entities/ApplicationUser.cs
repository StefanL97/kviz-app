using Microsoft.AspNetCore.Identity;

namespace KvizAPI.Entities
{
    public class ApplicationUser : IdentityUser<int>
    {
        public virtual IEnumerable<Quiz> CreatedQuizzes { get; set; }

        public virtual IEnumerable<ApplicationUserQuiz> CompletedQuizzes { get; set; }

        public ApplicationUser()
        {
            CreatedQuizzes = new List<Quiz>();
            CompletedQuizzes = new List<ApplicationUserQuiz>();
        }
    }
}
