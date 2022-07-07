using RestaurantApi.DTO;
using RestaurantApi.Model;

namespace RestaurantApi.Mappers;

public static class OrderMappers
{
    public static OrderDTO OrderToDTO(Order order) =>
          new OrderDTO
          {
              Id = order.Id,
              OrderDate = order.OrderDate,
              Status = order.Status

          };

    public static Order DTOToOrder(OrderDTO orderDTO) =>
        new Order
        {
            Id = orderDTO.Id,
            OrderDate = orderDTO.OrderDate,
            Status = orderDTO.Status

        };

}