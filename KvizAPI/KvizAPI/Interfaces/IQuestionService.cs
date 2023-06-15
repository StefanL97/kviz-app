using KvizAPI.DTOs;

namespace KvizAPI.Interfaces
{
    public interface IQuestionService
    {
        Task<IEnumerable<Question>> GetQuestionsByQuizId(int quizId);
    }
}
