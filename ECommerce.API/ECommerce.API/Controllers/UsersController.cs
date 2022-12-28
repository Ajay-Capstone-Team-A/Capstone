/*using ECommerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ECommerce.API.Controllers
{
    [Route("api/controller")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IContext _context;

        public UsersController(IContext context)
        {
            _context = context;
        }
        [HttpPut("/User")]
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            if (id != user.id)
            {
                return BadRequest();
            }

            await _context.User.FirstOrDefaultAsync(x => x.id == user.id);
            _context.User.Update(user);
            //await _context.SaveChangesAsync();

            //try
            //{
            //    await _context.SaveChangesAsync(); CommitChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
                
            //}
            return NoContent();

        }
    }
}
*/