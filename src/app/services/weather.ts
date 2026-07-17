import { Injectable, inject } from '@angular/core';
import { ApiService } from './api';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private api = inject(ApiService);

  async getCurrentWeather(lat: number, lng: number) {
    return this.api.get<any>(`/weather?latitude=${lat}&longitude=${lng}`);
  }
}
