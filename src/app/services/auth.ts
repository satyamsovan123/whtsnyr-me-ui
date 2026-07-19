import { Injectable, signal } from '@angular/core';
import { ApiService } from './api';

export interface User {
  _id: string;
  email: string;
  displayName: string;
  preferences?: any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSignal = signal<User | null>(null);
  private initSignal = signal<boolean>(!!localStorage.getItem('token'));
  private updateSignal = signal<boolean>(false);
  
  get isInitializing() {
    return this.initSignal();
  }

  get isUpdating() {
    return this.updateSignal();
  }
  
  get currentUser() {
    return this.userSignal();
  }

  get isLoggedIn() {
    return !!this.userSignal();
  }

  constructor(private api: ApiService) {
    this.checkSession();
  }

  async checkSession() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = await this.api.get<User>('/api/v1/me');
        this.userSignal.set(user);
      } catch (e) {
        console.error('Session expired', e);
        this.logout();
      } finally {
        this.initSignal.set(false);
      }
    } else {
      this.initSignal.set(false);
    }
  }

  async login(payload: any) {
    const res = await this.api.post<{ accessToken: string, user: User }>('/api/v1/auth/login', payload);
    localStorage.setItem('token', res.accessToken);
    this.userSignal.set(res.user);
    return res.user;
  }

  async register(payload: any) {
    const res = await this.api.post<{ accessToken: string, user: User }>('/api/v1/auth/register', payload);
    localStorage.setItem('token', res.accessToken);
    this.userSignal.set(res.user);
    return res.user;
  }

  logout() {
    localStorage.removeItem('token');
    this.userSignal.set(null);
  }

  async updatePreferences(prefs: any) {
    if (!this.isLoggedIn) return;
    this.updateSignal.set(true);
    try {
      const user = await this.api.patch<User>('/api/v1/me', { preferences: prefs });
      this.userSignal.set(user);
    } catch (e) {
      console.error('Failed to update preferences', e);
    } finally {
      this.updateSignal.set(false);
    }
  }
}
