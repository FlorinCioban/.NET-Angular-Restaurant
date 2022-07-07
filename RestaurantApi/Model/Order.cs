using RestaurantApi.Model;

public class Order
{
    public long Id { get; set; }
    public DateTime OrderDate { get; set; }
    public string? Status { get; set; }

}