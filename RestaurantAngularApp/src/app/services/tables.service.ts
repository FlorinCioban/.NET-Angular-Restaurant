import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';
import { Table } from '../models/Table';

@Injectable({
  providedIn: 'root',
})
export class TablesService {
  headers = new HttpHeaders().set('Accept', 'application/json');
  constructor(private httpClient: HttpClient) {}

  getTables() {
    return this.httpClient.get<Table[]>(`${API_URL}/Tables`, {
      headers: this.headers,
    });
  }

  getTableById(itemId: number | undefined) {
    return this.httpClient.get<Table>(`${API_URL}/Tables/${itemId}`, {
      headers: this.headers,
    });
  }

  addTable(table: Table) {
    return this.httpClient.post<Table>(`${API_URL}/Tables`, table, {
      headers: this.headers,
    });
  }

  updateTable(table: Table) {
    return this.httpClient.put<Table>(`${API_URL}/Tables/${table.id}`, table, {
      headers: this.headers,
    });
  }

  deleteTable(id: number) {
    return this.httpClient.delete<number>(`${API_URL}/Tables/${id}`, {
      headers: this.headers,
    });
  }

  filterTable(seats?: number) {
    return this.httpClient.get<Table[]>(
      `${API_URL}/Tables?seats=${seats ? seats : ''}`,
      {
        headers: this.headers,
      }
    );
  }
}
