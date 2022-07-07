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
    public class WaiterController : ControllerBase
    {
        private readonly TableContext _context;
        public WaiterController(TableContext context)
        {
            _context = context;
        }

        // GET: api/Waiter/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WaiterDTO>> GetWaiter(long id)
        {
            var waiter = await _context.Waiters.FindAsync(id);

            if (waiter == null)
            {
                return NotFound();
            }

            return WaiterMappers.WaiterToDTO(waiter);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WaiterDTO>>> GetCApiItemItemsBySalary(double? salary)

        {
            var query = _context.Waiters.AsQueryable();
            if (salary.HasValue)
            {
                query = query.Where(item => item.Salary == salary.Value);
            }
            return await query.Select(item => WaiterMappers.WaiterToDTO(item)).ToListAsync();

        }

        // PUT: api/Waiter/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWaiter(long id, WaiterDTO waiterDTO)
        {
            if (id != waiterDTO.Id)
            {
                return BadRequest();
            }
            var waiter = await _context.Waiters.FindAsync(id);
            if (waiter == null)
            {
                return NotFound();
            }
            waiter.Id = waiterDTO.Id;
            waiter.FirstName = waiterDTO.FirstName;
            waiter.LastName = waiterDTO.LastName;
            waiter.Salary = waiterDTO.Salary;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!WaiterExists(id))
            {
                return NotFound();
            }
            return NoContent();
        }

        // POST: api/Waiter
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WaiterDTO>> CreateWaiter(
            WaiterDTO waiterDTO
        )
        {
            var waiter = WaiterMappers.DTOToWaiter(waiterDTO);
            _context.Waiters.Add(waiter);
            await _context.SaveChangesAsync();
            return CreatedAtAction(
                nameof(GetWaiter),
                new { id = waiter.Id },
                WaiterMappers.WaiterToDTO(waiter)
            );
        }

        //DELETE: api/Waiter/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWaiter(long id)
        {
            var Waiter = await _context.Waiters.FindAsync(id);
            if (Waiter == null)
            {
                return NotFound();
            }

            _context.Waiters.Remove(Waiter);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WaiterExists(long id)
        {
            return _context.Waiters.Any(e => e.Id == id);
        }


    }
}