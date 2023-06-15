using AutoMapper;
using KvizAPI.Context;
using KvizAPI.Interfaces;
using KvizAPI.DTOs;
using Microsoft.EntityFrameworkCore;

namespace KvizAPI.Services
{
    public class AnswerService : IAnswerService
    {
        private readonly QuizDbContext _context;
        private readonly IMapper _mapper;

        public AnswerService(QuizDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Answer>> GetAnswersByQuizId(int quizId)
        {
            var questions = await _context.Questions.Where(x => x.QuizId == quizId).ToListAsync();
            var answersDto = new List<Answer>();
            foreach (var question in questions)
            {
                var answers = await _context.Answers
                    .Where(x => x.QuestionId == question.Id)
                    .ToListAsync();
                answersDto.AddRange(_mapper.Map<List<Answer>>(answers));
            }
            return answersDto;
        }
    }
}
