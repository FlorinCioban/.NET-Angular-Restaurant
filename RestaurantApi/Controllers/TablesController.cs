#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantApi.DTO;//alt+., sau ctrl+.
using RestaurantApi.Model;
using RestaurantApi.Mappers;

namespace RestaurantApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TablesController : ControllerBase
    {
        private readonly TableContext _context;
        public TablesController(TableContext context)
        {
            _context = context;
        }

        // GET: api/Table
        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<TimeTrackingItemDTO>>> GetTimeTrackingItems()
        // {
        //     return await _context.TimeTrackingItems.Include(t => t.TimeTrackingSubItems)
        //         .Select(x => TimeTrackingItemMappers.ItemToDTO(x))
        //         .ToListAsync();
        // }
        // // GET: api/Table
        // [HttpGet("filter")]
        // public async Task<ActionResult<IEnumerable<TimeTrackingItemDTO>>> FilterTimetrackingItem(DateTime date, int NrOfHours)
        // {
        //     var query = _context.TimeTrackingItems.AsQueryable();
        //     query = query.Where(item => item.Date == date && item.NrOfHours == NrOfHours);

        //     return await query.Select(item => TimeTrackingItemMappers.ItemToDTO(item)).ToListAsync();
        // }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TableDTO>>> GetTtApiItemItemsByNumarOre(int? Seats)

        {
            var query = _context.Tables.AsQueryable();
            if (Seats.HasValue)
            {
                query = query.Where(item => item.Seats == Seats.Value);
            }
            return await query.Select(item => TableMappers.ItemToDTO(item)).ToListAsync();

        }
        // GET: api/Tables/5

        [HttpGet("{id}")]
        public async Task<ActionResult<TableDTO>> GetTable(long id)
        {
            var currentLoggedInUser = System.Security.Principal.WindowsIdentity.GetCurrent().Name;
            var table = await _context.Tables.FindAsync(id);

            if (table == null)
            {
                return NotFound();
            }

            return TableMappers.ItemToDTO(table);
        }
        // PUT: api/Tables/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTable(long id, TableDTO tableDTO)
        {
            if (id != tableDTO.Id)
            {
                return BadRequest();
            }
            var table = await _context.Tables.FindAsync(id);
            if (table == null)
            {
                return NotFound();
            }
            table.Id = tableDTO.Id;
            table.Seats = tableDTO.Seats;
            table.Status = tableDTO.Status;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!TableExists(id))
            {
                return NotFound();
            }
            return NoContent();
        }

        // POST: api/Tables
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TableDTO>> CreateTable(
            TableDTO tableDTO
        )
        {
            var currentLoggedInUser = System.Security.Principal.WindowsIdentity.GetCurrent().Name;
            var table = TableMappers.DTOToItem(tableDTO);

            _context.Tables.Add(table);
            await _context.SaveChangesAsync();
            return CreatedAtAction(
                nameof(GetTable),
                new { id = table.Id },
                TableMappers.ItemToDTO(table)
            );
        }

        //DELETE: api/Tables/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTable(long id)
        {
            var Table = await _context.Tables.FindAsync(id);
            if (Table == null)
            {
                return NotFound();
            }

            _context.Tables.Remove(Table);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TableExists(long id)
        {
            return _context.Tables.Any(e => e.Id == id);
        }


    }
}