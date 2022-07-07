import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  headers = new HttpHeaders().set('Accept', 'application/json');
  constructor(private httpClient: HttpClient) {}

  getOrders() {
    return this.httpClient.get<Order[]>(`${API_URL}/Orders`, {
      headers: this.headers,
    });
  }

  getOrderById(itemId: number | undefined) {
    return this.httpClient.get<Order>(`${API_URL}/Orders/${itemId}`, {
      headers: this.headers,
    });
  }

  filterOrders(orderDate?: string) {
    return this.httpClient.get<Order[]>(
      `${API_URL}/Orders?orderDate=${orderDate ? orderDate : ''}
      `,
      {
        headers: this.headers,
      }
    );
  }

  addOrderItem(order: Order) {
    return this.httpClient.post<Order>(`${API_URL}/Orders`, order, {
      headers: this.headers,
    });
  }

  updateOrder(order: Order) {
    return this.httpClient.put<Order>(`${API_URL}/Orders/${order.id}`, order, {
      headers: this.headers,
    });
  }

  deleteOrder(id: number) {
    return this.httpClient.delete<number>(`${API_URL}/Orders/${id}`, {
      headers: this.headers,
    });
  }
}
