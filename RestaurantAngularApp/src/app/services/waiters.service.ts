import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';
import { Waiter } from '../models/Waiter';

@Injectable({
  providedIn: 'root',
})
export class WaitersService {
  headers = new HttpHeaders().set('Accept', 'application/json');
  constructor(private httpClient: HttpClient) {}

  getWaiters() {
    return this.httpClient.get<Waiter[]>(`${API_URL}/Waiter`, {
      headers: this.headers,
    });
  }

  getWaiterById(itemId: number | undefined) {
    return this.httpClient.get<Waiter>(`${API_URL}/Waiter/${itemId}`, {
      headers: this.headers,
    });
  }

  addWaiter(waiter: Waiter) {
    return this.httpClient.post<Waiter>(`${API_URL}/Waiter`, waiter, {
      headers: this.headers,
    });
  }

  updateWaiter(waiter: Waiter) {
    return this.httpClient.put<Waiter>(
      `${API_URL}/Waiter/${waiter.id}`,
      waiter,
      {
        headers: this.headers,
      }
    );
  }

  deleteWaiter(id: number) {
    return this.httpClient.delete<number>(`${API_URL}/Waiter/${id}`, {
      headers: this.headers,
    });
  }

  filterWaiter(salary?: number) {
    return this.httpClient.get<Waiter[]>(
      `${API_URL}/Waiter?salary=${salary ? salary : ''}`,
      {
        headers: this.headers,
      }
    );
  }
}
