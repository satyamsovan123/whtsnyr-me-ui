import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather';

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-panel p-4 position-relative overflow-hidden">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="mb-0 fw-semibold">Weather & Tips</h3>
        <i class="bi bi-cloud-sun fs-2 text-accent"></i>
      </div>
      
      <div *ngIf="!weatherData" class="text-muted">
        <span *ngIf="location">Fetching local weather...</span>
        <span *ngIf="!location">Enable location to see weather.</span>
      </div>

      <div *ngIf="weatherData" class="weather-content mt-3">
        <div class="d-flex align-items-end mb-4">
          <div class="display-3 fw-bold me-3 lh-1">{{ weatherData.current.temperature }}°C</div>
          <div class="fs-5 text-muted pb-1">{{ weatherData.current.description }}</div>
        </div>

        <h5 class="fw-medium mb-3">Today's Advisories</h5>
        <ul class="list-unstyled mb-4">
          <li *ngFor="let adv of weatherData.advisory" class="d-flex align-items-center mb-2">
            <i class="bi bi-check2-circle text-accent me-2"></i>
            {{ adv }}
          </li>
        </ul>

        <div class="tip-card p-3 rounded-3 d-flex align-items-center">
          <i class="bi bi-camera me-3 fs-4 text-accent"></i>
          <div>
            <strong>Photo Tip</strong><br/>
            <span class="text-muted small">{{ weatherData.photoTip }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .glass-panel {
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      box-shadow: var(--glass-shadow);
      border-radius: 20px;
    }
    .text-accent {
      color: var(--accent-color);
    }
    .tip-card {
      background-color: rgba(29, 29, 31, 0.04);
      border: 1px solid rgba(29, 29, 31, 0.05);
    }
  `]
})
export class WeatherWidgetComponent implements OnChanges {
  @Input() location!: { lat: number; lng: number } | null;
  @Output() dataLoaded = new EventEmitter<any>();
  weatherService = inject(WeatherService);
  cdr = inject(ChangeDetectorRef);
  weatherData: any = null;

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['location'] && this.location) {
      try {
        this.weatherData = await this.weatherService.getCurrentWeather(this.location.lat, this.location.lng);
        this.dataLoaded.emit(this.weatherData);
        this.cdr.detectChanges();
      } catch (e) {
        console.error('Failed to fetch weather', e);
        this.cdr.detectChanges();
      }
    }
  }
}
