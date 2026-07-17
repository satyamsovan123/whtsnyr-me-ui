import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-places-explorer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-panel p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="mb-0 fw-semibold">Discover Nearby</h3>
        <span class="badge rounded-pill bg-light text-dark border border-secondary-subtle">
          <i class="bi bi-geo-alt-fill text-accent me-1"></i> Live
        </span>
      </div>

      <div *ngIf="!places" class="text-muted">
        <span *ngIf="location">Scanning area...</span>
        <span *ngIf="!location">Enable location to discover places.</span>
      </div>

      <div *ngIf="places" class="d-flex overflow-auto pb-3 custom-scrollbar">
        <div *ngFor="let place of places" class="place-card me-3 flex-shrink-0">
          <div class="place-image bg-light d-flex align-items-center justify-content-center text-muted">
            <i class="bi bi-camera fs-1" *ngIf="!place.photoReference"></i>
            <img *ngIf="place.photoReference" [src]="'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' + place.photoReference + '&key=YOUR_API_KEY'" class="w-100 h-100 object-fit-cover" alt="Place image"/>
          </div>
          <div class="p-3">
            <h6 class="mb-1 fw-semibold text-truncate">{{ place.name }}</h6>
            <div class="d-flex align-items-center text-muted small mb-2">
              <i class="bi bi-star-fill text-accent me-1" *ngIf="place.rating"></i>
              <span>{{ place.rating || 'New' }}</span>
              <span class="ms-1" *ngIf="place.userRatingsTotal">({{ place.userRatingsTotal }})</span>
            </div>
            <p class="small text-muted mb-0 text-truncate">{{ place.address }}</p>
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
    .custom-scrollbar::-webkit-scrollbar {
      height: 6px;
    }
    .place-card {
      width: 240px;
      background: #fff;
      border: 1px solid var(--glass-border);
      border-radius: 12px;
      overflow: hidden;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .place-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    }
    .place-image {
      height: 140px;
      background: #f8f9fa;
    }
  `]
})
export class PlacesExplorerComponent implements OnChanges {
  @Input() location!: { lat: number; lng: number } | null;
  @Output() dataLoaded = new EventEmitter<any>();
  api = inject(ApiService);
  places: any[] | null = null;

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['location'] && this.location) {
      try {
        const data = await this.api.get<any>(`/providers/places/nearby?latitude=${this.location.lat}&longitude=${this.location.lng}`);
        if (data.available) {
          this.places = data.places;
          this.dataLoaded.emit(this.places);
        }
      } catch (e) {
        console.error('Failed to fetch nearby places', e);
      }
    }
  }
}
