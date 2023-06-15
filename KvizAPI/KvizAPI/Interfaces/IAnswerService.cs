using KvizAPI.DTOs;

namespace KvizAPI.Interfaces
{
    public interface IAnswerService
    {
        Task<IEnumerable<Answer>> GetAnswersByQuizId(int quizId);
    }
}
