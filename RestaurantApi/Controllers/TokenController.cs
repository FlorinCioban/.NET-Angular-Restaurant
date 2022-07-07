using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RestaurantApi.Model;
using RestaurantApi.Utils;

namespace RestaurantApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        public IConfiguration _configuration;
        private readonly TableContext _context;

        private readonly PasswordHasher<UserInfo> passwordHasher;

        public TokenController(IConfiguration config, TableContext context)
        {
            _configuration = config;
            _context = context;
            this.passwordHasher = new PasswordHasher<UserInfo>();
        }

        [HttpPost]
        [Route(template: "register")]
        public async Task<ActionResult<UserInfo>> Register(UserInfo userInfo)
        {
            if (userInfo == null)
            {
                return BadRequest();
            }
            if (await _context.UserInfos.AnyAsync(u => u.UserName == userInfo.UserName || u.Email == userInfo.Email))
            {
                return BadRequest("Username or email already exists!");
            }
            if (userInfo.Password.Length < 6)
            {
                return BadRequest("Password must must be more then 6 characters long!");
            }

            userInfo.CreatedAt = DateTime.Now;
            userInfo.Password = PasswordUtils.ComputeSha256Hash(userInfo.Password);
            _context.UserInfos.Add(userInfo);
            await _context.SaveChangesAsync();

            return Ok();

        }
        [HttpPost]
        [Route(template: "login")]
        public async Task<IActionResult> AuthenticateUser(UserInfo userData)
        {// TODO: make username optional or check it too
            if (userData != null && userData.UserName != null && userData.Password != null)
            {
                var user = await GetUser(userData.UserName, PasswordUtils.ComputeSha256Hash(userData.Password));

                if (user != null)
                {
                    //create claims details based on the user information
                    var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserId", user.Id.ToString()),
                        new Claim("UserName", user.UserName),
                        new Claim("Email", user.Email)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(10),
                        signingCredentials: signIn);

                    return Ok(new
                    {
                        Token = new JwtSecurityTokenHandler().WriteToken(token)
                    });
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("confirm/{username}")]
        public async Task<IActionResult> Confirm(string username)
        {
            var userInfo = _context.UserInfos.FirstOrDefault(x => x.UserName == username);
            if (userInfo == null)
            {
                return NotFound();
            }
            userInfo.IsConfirmed = true;
            await _context.SaveChangesAsync();
            return Ok();
        }

        private async Task<UserInfo> GetUser(string username, string password)
        {
            return await _context.UserInfos.FirstOrDefaultAsync(u => u.UserName == username && u.Password == password);
        }
    }
}