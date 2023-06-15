using System.ComponentModel.DataAnnotations.Schema;

namespace KvizAPI.Entities
{
    public class Quiz
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;

        public string Description { get; set; } = "no descripion";

        public int Passed { get; set; } = 0;

        public int CreatorId { get; set; }

        [ForeignKey(nameof(CreatorId))]
        public virtual ApplicationUser? Creator { get; set; }

        public IEnumerable<ApplicationUserQuiz>? CompletedUsers { get; set; }

        public IEnumerable<Question>? Questions { get; set; }

        public Quiz()
        {
            Questions = new List<Question>();
            CompletedUsers = new List<ApplicationUserQuiz>();
        }
    }
}
