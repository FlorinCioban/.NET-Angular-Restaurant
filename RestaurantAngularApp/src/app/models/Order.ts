export interface Order {
  id?: number;
  orderDate?: Date | string;
  status?: string;

  preparingDelete?: boolean;
}
