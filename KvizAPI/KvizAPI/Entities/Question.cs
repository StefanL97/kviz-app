using System.ComponentModel.DataAnnotations.Schema;

namespace KvizAPI.Entities
{
    public class Question
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;

        public IEnumerable<Answer> Options { get; set; }

        public int QuizId { get; set; }

        [ForeignKey(nameof(QuizId))]
        public virtual Quiz? Quiz { get; set; }

        public Question()
        {
            Options = new List<Answer>();
        }
    }
}
