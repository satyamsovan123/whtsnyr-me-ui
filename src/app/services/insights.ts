import { Injectable, inject } from '@angular/core';
import { ApiService } from './api';

@Injectable({
  providedIn: 'root'
})
export class InsightsService {
  private api = inject(ApiService);

  async generateInsights(data: { weatherData: any; placesData: any; swiggyData: any }) {
    return this.api.post<any>('/insights/generate', data);
  }
}
