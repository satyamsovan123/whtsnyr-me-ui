import { Injectable, inject } from '@angular/core';
import { ApiService } from './api';

@Injectable({
  providedIn: 'root'
})
export class SwiggyService {
  private api = inject(ApiService);

  async searchRestaurants(lat: number, lng: number) {
    return this.api.get<any>(`/swiggy/public/food/nearby/restaurants?lat=${lat}&lng=${lng}`);
  }

  async searchProducts(lat: number, lng: number) {
    return this.api.get<any>(`/swiggy/instamart/products?lat=${lat}&lng=${lng}`);
  }
}
