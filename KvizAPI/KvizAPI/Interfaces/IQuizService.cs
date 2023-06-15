using KvizAPI.DTOs;

namespace KvizAPI.Interfaces
{
    public interface IQuizService
    {
        Task<IEnumerable<Quiz>> Get();
        Task<Quiz> Get(int id);
        Task<IEnumerable<Quiz>> GetCreatedQuizzesByUser(string username);
        Task<IEnumerable<Quiz>> GetPassedQuizzesByUser(string username);

       

        Task<IEnumerable<User>> GetPassedUsersByQuiz(int quizid);

        Task<UsersQuizzes> GetResultByUsername(string username, int quizid);
    }
}
