import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export class ApiError extends Error {
  constructor(message: string, public status?: number, public code?: string) {
    super(message);
    this.name = 'ApiError';
  }
}

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
    if (!response.ok) {
      let msg = response.statusText;
      let code = '';
      try { 
        const body = await response.json(); 
        if (body?.errors && Array.isArray(body.errors)) msg = body.errors.map((e: any) => e.message).join('\n');
        else if (body?.detail) msg = body.detail; 
        if (body?.code) code = body.code;
      } catch (e) {}
      if (response.status === 401) {
        window.dispatchEvent(new CustomEvent('app:unauthorized'));
      }
      throw new ApiError(msg, response.status, code);
    }
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
    if (!response.ok) {
      let msg = response.statusText;
      let code = '';
      try { 
        const errBody = await response.json(); 
        if (errBody?.errors && Array.isArray(errBody.errors)) msg = errBody.errors.map((e: any) => e.message).join('\n');
        else if (errBody?.detail) msg = errBody.detail; 
        if (errBody?.code) code = errBody.code;
      } catch (e) {}
      if (response.status === 401) {
        window.dispatchEvent(new CustomEvent('app:unauthorized'));
      }
      throw new ApiError(msg, response.status, code);
    }
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
    if (!response.ok) {
      let msg = response.statusText;
      let code = '';
      try { 
        const errBody = await response.json(); 
        if (errBody?.errors && Array.isArray(errBody.errors)) msg = errBody.errors.map((e: any) => e.message).join('\n');
        else if (errBody?.detail) msg = errBody.detail; 
        if (errBody?.code) code = errBody.code;
      } catch (e) {}
      if (response.status === 401) {
        window.dispatchEvent(new CustomEvent('app:unauthorized'));
      }
      throw new ApiError(msg, response.status, code);
    }
    if (response.status === 204) return null as any;
    const result = await response.json();
    return result.data;
  }

  async delete<T>(path: string): Promise<T> {
    const response = await fetch(this.getFullUrl(path), {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    if (!response.ok) {
      let msg = response.statusText;
      let code = '';
      try { 
        const errBody = await response.json(); 
        if (errBody?.errors && Array.isArray(errBody.errors)) msg = errBody.errors.map((e: any) => e.message).join('\n');
        else if (errBody?.detail) msg = errBody.detail; 
        if (errBody?.code) code = errBody.code;
      } catch (e) {}
      if (response.status === 401) {
        window.dispatchEvent(new CustomEvent('app:unauthorized'));
      }
      throw new ApiError(msg, response.status, code);
    }
    if (response.status === 204) return null as any;
    const result = await response.json();
    return result.data;
  }


}
