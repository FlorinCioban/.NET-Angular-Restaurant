namespace RestaurantApi.Model;
public class UserInfo
{
    public long Id { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
    public string? Email { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }

    public Boolean? IsConfirmed { get; set; }
    public DateTime? CreatedAt { get; set; }
}