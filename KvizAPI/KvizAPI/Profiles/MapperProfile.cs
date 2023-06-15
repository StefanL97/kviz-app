using AutoMapper;
using Tables = KvizAPI.Entities;
namespace KvizAPI.Profiles
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            
            CreateMap<DTOs.Answer, Tables.Answer>().ReverseMap();
            CreateMap<DTOs.Question, Tables.Question>().ReverseMap();
            CreateMap<DTOs.Quiz, Tables.Quiz>().ReverseMap();
            CreateMap<DTOs.User, Tables.ApplicationUser>().ReverseMap();
            CreateMap<DTOs.UsersQuizzes, Tables.ApplicationUserQuiz>().ReverseMap();
        }
    }
}
