using System.ComponentModel.DataAnnotations.Schema;

namespace KvizAPI.Entities
{
    public class Answer
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;

        public int QuestionId { get; set; }

        [ForeignKey(nameof(QuestionId))]
        public virtual Question? Question { get; set; }

        public bool IsCorrect { get; set; } = false;
    }
}
