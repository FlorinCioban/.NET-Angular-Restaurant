using RestaurantApi.DTO;
using RestaurantApi.Model;

namespace RestaurantApi.Mappers;

public static class TableMappers
{
    public static TableDTO ItemToDTO(Table table) =>
          new TableDTO
          {
              Id = table.Id,
              Seats = table.Seats,
              Status = table.Status
          };

    public static Table DTOToItem(TableDTO tableDTO) =>
        new Table
        {
            Id = tableDTO.Id,
            Seats = tableDTO.Seats,
            Status = tableDTO.Status
        };

}