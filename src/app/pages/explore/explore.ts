import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language';
import { EXPLORE_CATEGORIES, PREFERRED_RADIUSES } from '../../constants/common';
import { ApiService } from '../../services/api';
import { LocationService } from '../../services/location';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container position-relative d-flex flex-column flex-grow-1 max-w-desktop mx-auto bg-white fade-in w-100">
      
      <!-- Top Search & Filters -->
      <div class="pt-3 px-4 bg-white z-1">
        <div class="input-group bg-light rounded-pill p-1 mb-3">
          <span class="input-group-text bg-transparent border-0 text-secondary"><i class="bi bi-search"></i></span>
          <input type="text" class="form-control border-0 bg-transparent shadow-none" [placeholder]="labels.EXPLORE.SEARCH_PLACEHOLDER">
        </div>
        <div class="d-flex gap-2 overflow-auto no-scrollbar pb-2 mb-2 align-items-center">
          
          <!-- Location Icon -->
          <button (click)="refreshLocation()" class="btn btn-outline border-light rounded-circle text-secondary bg-white shadow-sm flex-shrink-0 d-flex align-items-center justify-content-center" style="width: 32px; height: 32px; transition: color 0.2s;" onmouseover="this.classList.add('text-dark'); this.classList.remove('text-secondary')" onmouseout="this.classList.add('text-secondary'); this.classList.remove('text-dark')" title="Refresh Location">
            <i class="bi bi-geo-alt"></i>
          </button>

          <!-- Category Dropdown -->
          <div class="position-relative d-inline-block">
            <button class="btn btn-outline border-light rounded-pill text-dark fw-medium btn-sm px-3 shadow-sm bg-white text-nowrap">{{ currentCategoryName }} <i class="bi bi-chevron-down ms-1"></i></button>
            <select class="position-absolute top-0 start-0 w-100 h-100 opacity-0" style="cursor: pointer;" (change)="currentCategory = $any($event.target).value">
              <option *ngFor="let cat of exploreCategories" [value]="cat.value" [selected]="currentCategory === cat.value">{{ labels.EXPLORE[cat.labelKey] }}</option>
            </select>
          </div>

          <!-- Radius Dropdown -->
          <div class="position-relative d-inline-block">
            <button class="btn btn-outline border-light rounded-pill text-dark fw-medium btn-sm px-3 shadow-sm bg-white text-nowrap">{{ currentRadius }} <i class="bi bi-chevron-down ms-1"></i></button>
            <select class="position-absolute top-0 start-0 w-100 h-100 opacity-0" style="cursor: pointer;" (change)="currentRadius = $any($event.target).value">
              <option *ngFor="let r of preferredRadiuses" [value]="r" [selected]="currentRadius === r">{{ r }}</option>
            </select>
          </div>

        </div>
      </div>

      <!-- Map Area (Placeholder) -->
      <div class="flex-grow-1 position-relative bg-light rounded-4 overflow-hidden mx-3 mb-3 shadow-sm" style="min-height: 400px;">
        <div class="w-100 h-100" style="background: radial-gradient(circle, #f8f9fa 0%, #e9ecef 100%);"></div>
        
        <!-- Map Pins -->
        <div class="position-absolute top-50 start-50 translate-middle" *ngIf="highlights.length > 0">
          <div class="bg-inverse rounded-pill px-3 py-1 shadow fw-medium fs-6 d-flex align-items-center text-truncate" style="max-width: 200px;">
            <i class="bi bi-star-fill text-warning me-2 small"></i> <span class="text-truncate">{{ highlights[0].name }}</span>
          </div>
          <div class="position-absolute start-50 translate-middle-x" style="bottom: -8px; width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 8px solid var(--inverse-bg);"></div>
        </div>

      </div>

      <!-- Place Card Bottom Sheet / Modal -->
      <div [class]="isModalOpen ? 'position-absolute top-0 start-0 w-100 h-100 bg-white z-3 d-flex flex-column' : 'bg-white rounded-4 shadow-lg p-4 mx-4 mb-4 position-relative z-2 d-flex flex-column'" 
           [style]="isModalOpen ? 'padding-top: max(env(safe-area-inset-top), 20px); padding-bottom: max(env(safe-area-inset-bottom), 20px);' : 'margin-top: -60px; max-height: 40vh;'">
        
        <!-- Modal Header -->
        <div *ngIf="isModalOpen" class="d-flex justify-content-between align-items-center px-4 py-3 border-bottom flex-shrink-0">
          <h5 class="fw-bold mb-0">{{ labels.EXPLORE.PLACES_NEARBY }}</h5>
          <button (click)="isModalOpen = false" class="btn btn-link text-secondary p-0 border-0 shadow-none d-flex align-items-center justify-content-center" style="width: 36px; height: 36px;">
            <i class="bi bi-arrows-angle-contract fs-5"></i>
          </button>
        </div>

        <!-- Bottom Sheet Header -->
        <div *ngIf="!isModalOpen" class="d-flex w-100 justify-content-between align-items-center mb-3 flex-shrink-0" style="cursor: pointer;" (click)="isModalOpen = true">
          <h6 class="fw-bold mb-0">{{ labels.EXPLORE.PLACES_NEARBY }}</h6>
          <i class="bi bi-arrows-angle-expand text-secondary fs-5"></i>
        </div>
        
        <!-- Scrollable List -->
        <div class="overflow-auto pb-2 pe-1" [ngClass]="{'px-4 pt-4': isModalOpen}">
          <!-- Loading state -->
          <ng-container *ngIf="isLoading">
            <div class="d-flex gap-3 align-items-center mb-4 placeholder-glow" *ngFor="let i of [1,2,3,4]">
              <div class="rounded-3 flex-shrink-0 bg-light placeholder" style="width: 70px; height: 70px;"></div>
              <div class="flex-grow-1">
                <h6 class="fw-bold mb-1 fs-5"><span class="placeholder col-8 rounded"></span></h6>
                <p class="small mb-1"><span class="placeholder col-6 rounded"></span></p>
                <p class="small mb-0"><span class="placeholder col-4 rounded"></span></p>
              </div>
            </div>
          </ng-container>
          
          <!-- Dynamic Items -->
          <div *ngFor="let place of highlights; let i = index" class="d-flex gap-3 align-items-center mb-4">
            <div class="rounded-3 flex-shrink-0 bg-light" [style.background]="place.photoUrl ? 'url(' + place.photoUrl + ') center/cover' : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'" style="width: 70px; height: 70px;"></div>
            <div class="flex-grow-1 overflow-hidden">
              <h6 class="fw-bold mb-1 fs-5 text-truncate">{{ place.name }}</h6>
              <p class="small text-secondary mb-1">{{ (place.distance || 0) | number:'1.1-1' }} km • <i class="bi bi-star-fill text-warning"></i> {{ place.rating || 4.5 }} <span class="text-success ms-1" *ngIf="place.isOpen">Open</span><span class="text-danger ms-1" *ngIf="place.isOpen === false">Closed</span></p>
              <p class="small text-tertiary mb-0 text-truncate" style="font-size: 0.8rem;">{{ place.types?.join(' • ') || 'Place' }}</p>
            </div>
            <i class="bi fs-5" style="cursor: pointer;" [ngClass]="bookmarked[i] ? 'bi-bookmark-fill text-dark' : 'bi-bookmark text-secondary'" (click)="bookmarked[i] = !bookmarked[i]"></i>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    .max-w-desktop {
      max-width: 800px;
    }
  `]
})
export class ExploreComponent {
  private langService = inject(LanguageService);
  private apiService = inject(ApiService);
  private locationService = inject(LocationService);
  
  get labels() { return this.langService.labels; }

  public exploreCategories = EXPLORE_CATEGORIES;
  public preferredRadiuses = PREFERRED_RADIUSES;

  currentCategory = 'All Categories';
  currentRadius = '2 km';
  isModalOpen = false;

  highlights: any[] = [];
  isLoading = false;
  bookmarked: boolean[] = [];

  constructor() {
    this.fetchDynamicData();
  }

  async refreshLocation() {
    try {
      this.isLoading = true;
      await this.locationService.requestLocation();
      await this.fetchDynamicData();
    } catch (e) {
      console.error('Location error', e);
      this.isLoading = false;
    }
  }

  async fetchDynamicData() {
    const coords = this.locationService.coords();
    if (!coords) return;
    
    this.isLoading = true;
    try {
      const radiusMeters = parseInt(this.currentRadius) * 1000;
      const res = await this.apiService.get<any>(`/api/v1/providers/places/nearby?latitude=${coords.lat}&longitude=${coords.lng}&radius=${radiusMeters}`);
      if (res && res.length) {
        this.highlights = res;
        this.bookmarked = new Array(res.length).fill(false);
      }
    } catch (e) {
      console.error('Failed to fetch explore highlights', e);
    } finally {
      this.isLoading = false;
    }
  }

  get currentCategoryName(): string {
    const c = this.exploreCategories.find(x => x.value === this.currentCategory);
    return c ? this.labels.EXPLORE[c.labelKey] : this.currentCategory;
  }
}
