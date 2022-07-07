import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';
import { Menu } from '../models/Menu';

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  headers = new HttpHeaders().set('Accept', 'application/json');
  constructor(private httpClient: HttpClient) {}

  getMenus() {
    return this.httpClient.get<Menu[]>(`${API_URL}/Menu`, {
      headers: this.headers,
    });
  }

  getMenuById(itemId: number | undefined) {
    return this.httpClient.get<Menu>(`${API_URL}/Menu/${itemId}`, {
      headers: this.headers,
    });
  }

  addMenu(menu: Menu) {
    return this.httpClient.post<Menu>(`${API_URL}/Menu`, menu, {
      headers: this.headers,
    });
  }

  updateMenu(menu: Menu) {
    return this.httpClient.put<Menu>(`${API_URL}/Menu/${menu.id}`, menu, {
      headers: this.headers,
    });
  }

  deleteMenu(id: number) {
    return this.httpClient.delete<number>(`${API_URL}/Menu/${id}`, {
      headers: this.headers,
    });
  }

  filterMenu(price?: number) {
    return this.httpClient.get<Menu[]>(
      `${API_URL}/Menu?price=${price ? price : ''}`,
      {
        headers: this.headers,
      }
    );
  }
}
