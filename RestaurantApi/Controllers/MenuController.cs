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
    public class MenuController : ControllerBase
    {
        private readonly TableContext _context;
        public MenuController(TableContext context)
        {
            _context = context;
        }

        // GET: api/Menu/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MenuDTO>> GetMenu(long id)
        {
            var menu = await _context.Menus.FindAsync(id);

            if (menu == null)
            {
                return NotFound();
            }

            return MenuMappers.MenuToDTO(menu);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MenuDTO>>> GetMenuApiItemItemsByPrice(double? price)

        {
            var query = _context.Menus.AsQueryable();
            if (price.HasValue)
            {
                query = query.Where(item => item.Price == price.Value);
            }
            return await query.Select(item => MenuMappers.MenuToDTO(item)).ToListAsync();

        }

        // PUT: api/Menu/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMenu(long id, MenuDTO menuDTO)
        {
            if (id != menuDTO.Id)
            {
                return BadRequest();
            }
            var menu = await _context.Menus.FindAsync(id);
            if (menu == null)
            {
                return NotFound();
            }
            menu.Id = menuDTO.Id;
            menu.Name = menuDTO.Name;
            menu.Details = menuDTO.Details;
            menu.PreparationTime = menuDTO.PreparationTime;
            menu.Price = menuDTO.Price;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!MenuExists(id))
            {
                return NotFound();
            }
            return NoContent();
        }

        // POST: api/Menu
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MenuDTO>> CreateMenu(
            MenuDTO menuDTO
        )
        {
            var menu = MenuMappers.DTOToMenu(menuDTO);
            _context.Menus.Add(menu);
            await _context.SaveChangesAsync();
            return CreatedAtAction(
                nameof(GetMenu),
                new { id = menu.Id },
                MenuMappers.MenuToDTO(menu)
            );
        }

        //DELETE: api/TimeTrackingItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMenu(long id)
        {
            var Menu = await _context.Menus.FindAsync(id);
            if (Menu == null)
            {
                return NotFound();
            }

            _context.Menus.Remove(Menu);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MenuExists(long id)
        {
            return _context.Menus.Any(e => e.Id == id);
        }


    }
}