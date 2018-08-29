using api.Dtos;
using api.Models;
using AutoMapper;

namespace api.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserForRegisterDto,User>();
            CreateMap<User,UserForListDto>();
            CreateMap<User, UserForDetailedDto>();
            CreateMap<Photo,PhotosForDetailedDto>();
        }


        
    }
    
}