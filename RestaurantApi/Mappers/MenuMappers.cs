using RestaurantApi.DTO;
using RestaurantApi.Model;

namespace RestaurantApi.Mappers;

public static class MenuMappers
{
    public static MenuDTO MenuToDTO(Menu menu) =>
          new MenuDTO
          {
              Id = menu.Id,
              Name = menu.Name,
              Details = menu.Details,
              PreparationTime = menu.PreparationTime,
              Price = menu.Price

          };

    public static Menu DTOToMenu(MenuDTO menuDTO) =>
        new Menu
        {
            Id = menuDTO.Id,
            Name = menuDTO.Name,
            Details = menuDTO.Details,
            PreparationTime = menuDTO.PreparationTime,
            Price = menuDTO.Price

        };

}