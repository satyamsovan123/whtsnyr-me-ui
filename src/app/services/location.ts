import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  public coords = signal<{lat: number, lng: number} | null>(null);

  async requestLocation(): Promise<{lat: number, lng: number}> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation is not supported by your browser');
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.coords.set(pos);
            resolve(pos);
          },
          (err) => reject(err),
          { timeout: 10000, maximumAge: 0 }
        );
      }
    });
  }
}
