import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiggyService } from '../../services/swiggy';
import { UiService } from '../../services/ui';

@Component({
  selector: 'app-swiggy-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-panel p-4 h-100 d-flex flex-column">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="mb-0 fw-semibold text-accent">Order Local</h3>
        <i class="bi bi-bag-check fs-3"></i>
      </div>

      <div class="flex-grow-1">
        <div *ngIf="!restaurants && !loading" class="text-center py-5 text-muted">
          <i class="bi bi-geo fs-1 mb-3 d-block"></i>
          <span *ngIf="location">Tap below to scan restaurants nearby</span>
          <span *ngIf="!location">Need location to find restaurants</span>
        </div>

        <div *ngIf="loading" class="text-center py-5">
          <div class="spinner-border text-accent" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <div *ngIf="restaurants" class="restaurant-list custom-scrollbar pe-2">
          <div *ngFor="let rest of restaurants" class="restaurant-card mb-3 p-3 rounded-3">
            <h6 class="mb-1 fw-bold">{{ rest.name }}</h6>
            <div class="d-flex justify-content-between text-muted small">
              <span><i class="bi bi-star-fill text-accent me-1"></i> {{ rest.avgRating }}</span>
              <span>{{ rest.costForTwo }}</span>
            </div>
            <p class="small text-muted mb-2 text-truncate">{{ rest.cuisines?.join(', ') }}</p>
            <button class="btn btn-sm btn-accent w-100" (click)="order(rest)">View Menu</button>
          </div>
        </div>
      </div>

      <button *ngIf="!restaurants && location" class="btn btn-accent w-100 mt-4 py-3 fw-bold" (click)="search()">
        Find Restaurants
      </button>
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
    .restaurant-list {
      max-height: 500px;
      overflow-y: auto;
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .restaurant-card {
      background: #fff;
      border: 1px solid var(--glass-border);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .restaurant-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
  `]
})
export class SwiggyPanelComponent {
  @Input() location!: { lat: number; lng: number } | null;
  @Output() dataLoaded = new EventEmitter<any>();
  swiggy = inject(SwiggyService);
  ui = inject(UiService);
  cdr = inject(ChangeDetectorRef);
  
  restaurants: any[] | null = null;
  loading = false;

  async search() {
    if (!this.location) return;
    this.loading = true;
    try {
      const data = await this.swiggy.searchRestaurants(this.location.lat, this.location.lng);
      this.restaurants = data?.cards?.[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((r: any) => r.info) || [];
      this.dataLoaded.emit(this.restaurants);
      this.cdr.detectChanges();
      if (this.restaurants?.length === 0) {
        this.ui.showToast('No restaurants found nearby via Swiggy MCP', 'info');
      }
    } catch (e) {
      console.error('Failed to load swiggy data', e);
      this.cdr.detectChanges();
      this.ui.showToast('Failed to fetch restaurants', 'error');
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  order(rest: any) {
    this.ui.showToast(`Opening menu for ${rest.name}...`, 'info');
  }
}
