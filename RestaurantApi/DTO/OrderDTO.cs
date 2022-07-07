namespace RestaurantApi.DTO
{
    public class OrderDTO
    {

        public long Id { get; set; }
        public DateTime OrderDate { get; set; }
        public string? Status { get; set; }
    }
}