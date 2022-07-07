using RestaurantApi.DTO;
using RestaurantApi.Model;

namespace RestaurantApi.Mappers;

public static class WaiterMappers
{
    public static WaiterDTO WaiterToDTO(Waiter waiter) =>
          new WaiterDTO
          {
              Id = waiter.Id,
              FirstName = waiter.FirstName,
              LastName = waiter.LastName,
              Salary = waiter.Salary
          };

    public static Waiter DTOToWaiter(WaiterDTO waiterDTO) =>
        new Waiter
        {
            Id = waiterDTO.Id,
            FirstName = waiterDTO.FirstName,
            LastName = waiterDTO.LastName,
            Salary = waiterDTO.Salary
        };

}