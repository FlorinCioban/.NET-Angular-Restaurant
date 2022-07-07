import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';
import { Customer } from '../models/Customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  headers = new HttpHeaders().set('Accept', 'application/json');
  constructor(private httpClient: HttpClient) {}

  getCustomer() {
    return this.httpClient.get<Customer[]>(`${API_URL}/Customer`, {
      headers: this.headers,
    });
  }

  getCustomerById(itemId: number | undefined) {
    return this.httpClient.get<Customer>(`${API_URL}/Customer/${itemId}`, {
      headers: this.headers,
    });
  }

  addCustomer(customer: Customer) {
    return this.httpClient.post<Customer>(`${API_URL}/Customer`, customer, {
      headers: this.headers,
    });
  }

  updateCustomer(customer: Customer) {
    return this.httpClient.put<Customer>(
      `${API_URL}/Customer/${customer.id}`,
      customer,
      {
        headers: this.headers,
      }
    );
  }

  deleteCustomer(id: number) {
    return this.httpClient.delete<number>(`${API_URL}/Customer/${id}`, {
      headers: this.headers,
    });
  }

  filterCustomer(phoneNumber?: number) {
    return this.httpClient.get<Customer[]>(
      `${API_URL}/Customer?phoneNumber=${phoneNumber ? phoneNumber : ''}`,
      {
        headers: this.headers,
      }
    );
  }
}
