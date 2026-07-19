import { Injectable, inject } from '@angular/core';
import { ApiService } from './api';

@Injectable({
  providedIn: 'root'
})
export class SwiggyService {
  private api = inject(ApiService);

  async searchRestaurants(lat: number, lng: number) {
    return this.api.get<any>(`/api/v1/providers/food/nearby/restaurants?lat=${lat}&lng=${lng}`);
  }

  async searchProducts(lat: number, lng: number) {
    return this.api.get<any>(`/api/v1/providers/instamart/products?lat=${lat}&lng=${lng}`);
  }

  async checkStatus() {
    return this.api.get<any>('/api/v1/providers/swiggy');
  }

  async authorize() {
    return this.api.post<any>('/api/v1/providers/swiggy/authorize', {});
  }

  async getFoodOrders() {
    return this.api.get<any>('/api/v1/swiggy/food/orders');
  }

  async getInstamartOrders() {
    return this.api.get<any>('/api/v1/swiggy/instamart/orders');
  }
}
