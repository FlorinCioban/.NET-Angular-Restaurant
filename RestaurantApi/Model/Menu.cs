using RestaurantApi.Model;

public class Menu
{
    public long Id { get; set; }

    public String? Name { get; set; }

    public String? Details { get; set; }

    public int PreparationTime { get; set; }

    public double Price { get; set; }
}