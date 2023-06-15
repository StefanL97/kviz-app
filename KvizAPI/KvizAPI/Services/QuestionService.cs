using AutoMapper;
using KvizAPI.Context;
using KvizAPI.Interfaces;
using KvizAPI.DTOs;
using Microsoft.EntityFrameworkCore;

namespace KvizAPI.Services
{
    public class QuestionService : IQuestionService
    {
        private readonly QuizDbContext _context;
        private readonly IMapper _mapper;

        public QuestionService(QuizDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Question>> GetQuestionsByQuizId(int quizId)
        {
            var questions = await _context.Questions.Where(x => x.QuizId == quizId).ToListAsync();
            var questionDto = _mapper.Map<IEnumerable<Question>>(questions);
            return questionDto;
        }
    }
}
