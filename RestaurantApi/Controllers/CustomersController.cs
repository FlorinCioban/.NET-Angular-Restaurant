#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantApi.DTO;//alt+., sau ctrl+.
using RestaurantApi.Mappers;
using RestaurantApi.Model;

namespace RestaurantApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CustomerController : ControllerBase
    {
        private readonly TableContext _context;
        public CustomerController(TableContext context)
        {
            _context = context;
        }

        // GET: api/Customer/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDTO>> GetCustomer(long id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return CustomerMappers.CustomerToDTO(customer);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerDTO>>> GetCApiItemItemsByPhone(long? phoneNumber)

        {
            var query = _context.Customers.AsQueryable();
            if (phoneNumber.HasValue)
            {
                query = query.Where(item => item.PhoneNumber == phoneNumber.Value);
            }
            return await query.Select(item => CustomerMappers.CustomerToDTO(item)).ToListAsync();

        }

        // PUT: api/Customer/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(long id, CustomerDTO customerDTO)
        {
            if (id != customerDTO.Id)
            {
                return BadRequest();
            }
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            customer.Id = customerDTO.Id;
            customer.FirstName = customerDTO.FirstName;
            customer.LastName = customerDTO.LastName;
            customer.PhoneNumber = customerDTO.PhoneNumber;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!CustomerExists(id))
            {
                return NotFound();
            }
            return NoContent();
        }

        // POST: api/Customer
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CustomerDTO>> CreateCustomer(
            CustomerDTO customerDTO
        )
        {
            var customer = CustomerMappers.DTOToCustomer(customerDTO);
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();
            return CreatedAtAction(
                nameof(GetCustomer),
                new { id = customer.Id },
                CustomerMappers.CustomerToDTO(customer)
            );
        }

        //DELETE: api/Menu/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(long id)
        {
            var Customer = await _context.Customers.FindAsync(id);
            if (Customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(Customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerExists(long id)
        {
            return _context.Customers.Any(e => e.Id == id);
        }


    }
}