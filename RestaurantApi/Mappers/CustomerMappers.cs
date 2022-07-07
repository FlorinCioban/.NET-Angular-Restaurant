using RestaurantApi.DTO;
using RestaurantApi.Model;

namespace RestaurantApi.Mappers;

public static class CustomerMappers
{
    public static CustomerDTO CustomerToDTO(Customer customer) =>
          new CustomerDTO
          {
              Id = customer.Id,
              FirstName = customer.FirstName,
              LastName = customer.LastName,
              PhoneNumber = customer.PhoneNumber
          };

    public static Customer DTOToCustomer(CustomerDTO customerDTO) =>
        new Customer
        {
            Id = customerDTO.Id,
            FirstName = customerDTO.FirstName,
            LastName = customerDTO.LastName,
            PhoneNumber = customerDTO.PhoneNumber,
        };

}