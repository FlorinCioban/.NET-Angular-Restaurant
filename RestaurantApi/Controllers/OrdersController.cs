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
    public class OrdersController : ControllerBase
    {
        private readonly TableContext _context;
        public OrdersController(TableContext context)
        {
            _context = context;
        }

        // GET: api/TimeTrackingItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDTO>> GetOrder(long id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return OrderMappers.OrderToDTO(order);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrderApiItemItemsByNumarOre(DateTime? OrderDate)

        {
            var query = _context.Orders.AsQueryable();
            if (OrderDate.HasValue)
            {
                query = query.Where(item => item.OrderDate == OrderDate.Value);
            }
            return await query.Select(item => OrderMappers.OrderToDTO(item)).ToListAsync();

        }

        // PUT: api/TimeTrackingItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(long id, OrderDTO orderDTO)
        {
            if (id != orderDTO.Id)
            {
                return BadRequest();
            }
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }
            order.Id = orderDTO.Id;
            order.OrderDate = orderDTO.OrderDate;
            order.Status = orderDTO.Status;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!OrderExists(id))
            {
                return NotFound();
            }
            return NoContent();
        }

        // POST: api/TimeTrackingItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrderDTO>> CreateOrder(
            OrderDTO orderDTO
        )
        {
            var order = OrderMappers.DTOToOrder(orderDTO);
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return CreatedAtAction(
                nameof(GetOrder),
                new { id = order.Id },
                OrderMappers.OrderToDTO(order)
            );
        }

        //DELETE: api/TimeTrackingItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(long id)
        {
            var Order = await _context.Orders.FindAsync(id);
            if (Order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(Order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(long id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }


    }
}