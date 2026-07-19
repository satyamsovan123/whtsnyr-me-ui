import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
import { UiService } from '../../services/ui';
import { LanguageService } from '../../services/language';
import { LocationService } from '../../services/location';

@Component({
  selector: 'app-specialties-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-panel p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="mb-0 fw-semibold">Local Specialties</h3>
        <i class="bi bi-stars fs-3 text-accent"></i>
      </div>

      <div *ngIf="!specialties" class="text-center py-4 text-muted">
        Loading curated specialties...
      </div>

      <div *ngIf="specialties?.length === 0" class="text-center py-4 text-muted">
        <i class="bi bi-info-circle fs-3 d-block mb-2"></i>
        No curated specialties found in this area yet.
      </div>

      <div class="list-group list-group-flush" *ngIf="specialties">
        <button *ngFor="let item of specialties" class="list-group-item list-group-item-action bg-transparent border-bottom-0 rounded-3 mb-2 p-3 specialty-item" (click)="onSelect(item)">
          <div class="d-flex gap-3 align-items-start">
            <div class="rounded-3 flex-shrink-0 overflow-hidden" *ngIf="item.mediaUrls && item.mediaUrls.length > 0" style="width: 56px; height: 56px;">
              <img [src]="item.mediaUrls[0]" [alt]="item.name" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" onerror="this.parentElement.style.display='none'">
            </div>
            <div class="flex-grow-1 min-w-0">
              <div class="d-flex justify-content-between align-items-start mb-1">
                <h6 class="mb-0 fw-bold text-truncate pe-2">{{ item.name }}</h6>
                <span *ngIf="item._source === 'swiggy_food'" class="badge rounded-pill bg-danger text-white flex-shrink-0" style="font-size: 0.65rem;">Swiggy Food</span>
                <span *ngIf="item._source === 'swiggy_instamart'" class="badge rounded-pill bg-success text-white flex-shrink-0" style="font-size: 0.65rem;">Instamart</span>
              </div>
              <p class="mb-1 small text-muted text-truncate">{{ item.description }}</p>
              <div class="d-flex flex-wrap gap-2 align-items-center">
                <span *ngIf="item.rating" class="small text-warning fw-medium"><i class="bi bi-star-fill"></i> {{ item.rating }}</span>
                <span *ngIf="item.distance" class="small text-muted"><i class="bi bi-geo-alt"></i> {{ item.distance }}</span>
                <span *ngIf="item.priceRange" class="small text-muted">{{ item.priceRange }}</span>
                <span class="badge bg-light text-dark border" *ngIf="item.category" style="font-size: 0.65rem;">{{ item.category }}</span>
              </div>
            </div>
            <i class="bi bi-chevron-right text-muted opacity-50 flex-shrink-0 mt-1"></i>
          </div>
        </button>
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
    .specialty-item {
      transition: background-color 0.2s ease, transform 0.2s ease;
    }
    .specialty-item:hover {
      background-color: rgba(29, 29, 31, 0.03) !important;
      transform: translateX(4px);
    }
  `]
})
export class SpecialtiesListComponent implements OnInit {
  api = inject(ApiService);
  private ui = inject(UiService);
  private languageService = inject(LanguageService);
  private locationService = inject(LocationService);
  specialties: any[] | null = null;
  cdr = inject(ChangeDetectorRef);

  get labels() {
    return this.languageService.labels;
  }

  async ngOnInit() {
    try {
      const coords = this.locationService.coords();
      let url = '/specialties?limit=8';
      if (coords) {
        url += `&latitude=${coords.lat}&longitude=${coords.lng}`;
      }
      const data = await this.api.get<any>(url);
      this.specialties = data.documents || [];
      this.cdr.detectChanges();
    } catch (e) {
      console.error('Failed to load specialties', e);
      this.cdr.detectChanges();
    }
  }

  onSelect(item: any) {
    this.ui.showToast(`${this.labels.TOAST.SELECTED} ${item.name}`, 'info');
  }
}
