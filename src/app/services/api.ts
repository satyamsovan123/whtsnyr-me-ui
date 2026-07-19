import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  }

  private getFullUrl(path: string): string {
    const cleanPath = path.startsWith('/api/v1') ? path.substring(7) : (path.startsWith('/') ? path : `/${path}`);
    return `${this.baseUrl}${cleanPath}`;
  }

  async get<T>(path: string): Promise<T> {
    const response = await fetch(this.getFullUrl(path), { headers: this.getHeaders() });
    if (!response.ok) throw new Error(response.statusText);
    if (response.status === 204) return null as any;
    const result = await response.json();
    return result.data;
  }

  async post<T>(path: string, body: any): Promise<T> {
    const response = await fetch(this.getFullUrl(path), {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body)
    });
    if (!response.ok) throw new Error(response.statusText);
    if (response.status === 204) return null as any;
    const result = await response.json();
    return result.data;
  }

  async patch<T>(path: string, body: any): Promise<T> {
    const response = await fetch(this.getFullUrl(path), {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(body)
    });
    if (!response.ok) throw new Error(response.statusText);
    if (response.status === 204) return null as any;
    const result = await response.json();
    return result.data;
  }

  async delete<T>(path: string): Promise<T> {
    const response = await fetch(this.getFullUrl(path), {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    if (!response.ok) throw new Error(response.statusText);
    if (response.status === 204) return null as any;
    const result = await response.json();
    return result.data;
  }


}
