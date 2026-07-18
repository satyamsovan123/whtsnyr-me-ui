import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LABELS } from '../../constants/labels';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container d-flex flex-column h-100 max-w-desktop mx-auto bg-white fade-in">
      
      <!-- Top Search & Filters -->
      <div class="pt-3 bg-white z-1">
        <div class="input-group bg-light rounded-pill p-1 mb-3">
          <span class="input-group-text bg-transparent border-0 text-secondary"><i class="bi bi-search"></i></span>
          <input type="text" class="form-control border-0 bg-transparent shadow-none" [placeholder]="labels.EXPLORE.SEARCH_PLACEHOLDER">
        </div>
        <div class="d-flex gap-2 overflow-auto no-scrollbar pb-2 mb-2">
          
          <!-- Category Dropdown -->
          <div class="position-relative d-inline-block">
            <button class="btn btn-outline border-light rounded-pill text-dark fw-medium btn-sm px-3 shadow-sm bg-white text-nowrap">{{ currentCategory }} <i class="bi bi-chevron-down ms-1"></i></button>
            <select class="position-absolute top-0 start-0 w-100 h-100 opacity-0" style="cursor: pointer;" (change)="currentCategory = $any($event.target).value">
              <option value="All Categories" [selected]="currentCategory === 'All Categories'">All Categories</option>
              <option value="Food & Dining" [selected]="currentCategory === 'Food & Dining'">Food & Dining</option>
              <option value="Nature & Parks" [selected]="currentCategory === 'Nature & Parks'">Nature & Parks</option>
              <option value="Shopping" [selected]="currentCategory === 'Shopping'">Shopping</option>
              <option value="Arts & Culture" [selected]="currentCategory === 'Arts & Culture'">Arts & Culture</option>
              <option value="Entertainment" [selected]="currentCategory === 'Entertainment'">Entertainment</option>
            </select>
          </div>

          <!-- Radius Dropdown -->
          <div class="position-relative d-inline-block">
            <button class="btn btn-outline border-light rounded-pill text-dark fw-medium btn-sm px-3 shadow-sm bg-white text-nowrap">{{ currentRadius }} <i class="bi bi-chevron-down ms-1"></i></button>
            <select class="position-absolute top-0 start-0 w-100 h-100 opacity-0" style="cursor: pointer;" (change)="currentRadius = $any($event.target).value">
              <option value="1 km" [selected]="currentRadius === '1 km'">1 km</option>
              <option value="2 km" [selected]="currentRadius === '2 km'">2 km</option>
              <option value="5 km" [selected]="currentRadius === '5 km'">5 km</option>
              <option value="10 km" [selected]="currentRadius === '10 km'">10 km</option>
            </select>
          </div>

        </div>
      </div>

      <!-- Map Area (Placeholder) -->
      <div class="flex-grow-1 position-relative bg-light">
        <div class="w-100 h-100" style="background-image: url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop'); background-size: cover; background-position: center; opacity: 0.8; filter: grayscale(0.2) contrast(1.1) brightness(1.1);"></div>
        
        <!-- Map Pins -->
        <div class="position-absolute top-50 start-50 translate-middle">
          <div class="bg-inverse rounded-pill px-3 py-1 shadow fw-medium fs-6 d-flex align-items-center">
            <i class="bi bi-star-fill text-warning me-2 small"></i> Mount Mary Church
          </div>
          <div class="position-absolute start-50 translate-middle-x" style="bottom: -8px; width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 8px solid var(--inverse-bg);"></div>
        </div>

      </div>

      <!-- Place Card Bottom Sheet / Modal -->
      <div [class]="isModalOpen ? 'position-absolute top-0 start-0 w-100 h-100 bg-white z-3 d-flex flex-column' : 'bg-white rounded-4 shadow-lg p-4 mx-4 mb-4 position-relative z-2 d-flex flex-column'" 
           [style]="isModalOpen ? 'padding-top: max(env(safe-area-inset-top), 20px); padding-bottom: max(env(safe-area-inset-bottom), 20px);' : 'margin-top: -60px; max-height: 40vh;'">
        
        <!-- Modal Header -->
        <div *ngIf="isModalOpen" class="d-flex justify-content-between align-items-center p-3 border-bottom flex-shrink-0">
          <h5 class="fw-bold mb-0">{{ labels.EXPLORE.PLACES_NEARBY }}</h5>
          <button (click)="isModalOpen = false" class="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center" style="width: 36px; height: 36px;">
            <i class="bi bi-chevron-down"></i>
          </button>
        </div>

        <!-- Bottom Sheet Header -->
        <div *ngIf="!isModalOpen" class="d-flex w-100 justify-content-between align-items-center mb-3 flex-shrink-0" style="cursor: pointer;" (click)="isModalOpen = true">
          <h6 class="fw-bold mb-0">{{ labels.EXPLORE.PLACES_NEARBY }}</h6>
          <i class="bi bi-arrows-angle-expand text-secondary fs-5"></i>
        </div>
        
        <!-- Scrollable List -->
        <div class="overflow-auto pb-2 pe-1" [ngClass]="{'p-4': isModalOpen}">
          <!-- Item 1 -->
          <div class="d-flex gap-3 align-items-center mb-4">
            <div class="rounded-3 flex-shrink-0 bg-light" style="width: 70px; height: 70px; background-image: url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=200&auto=format&fit=crop'); background-size: cover;"></div>
            <div class="flex-grow-1">
              <h6 class="fw-bold mb-1 fs-5">Bandra Fort</h6>
              <p class="small text-secondary mb-1">1.1 km • <i class="bi bi-star-fill text-warning"></i> 4.6 <span class="text-success ms-1">Open</span></p>
              <p class="small text-tertiary mb-0" style="font-size: 0.8rem;">Historic • Photography</p>
            </div>
            <i class="bi bi-bookmark text-secondary fs-5" style="cursor: pointer;"></i>
          </div>

          <!-- Item 2 -->
          <div class="d-flex gap-3 align-items-center mb-4">
            <div class="rounded-3 flex-shrink-0 bg-light" style="width: 70px; height: 70px; background-image: url('https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=200&auto=format&fit=crop'); background-size: cover;"></div>
            <div class="flex-grow-1">
              <h6 class="fw-bold mb-1 fs-5">Mount Mary</h6>
              <p class="small text-secondary mb-1">1.3 km • <i class="bi bi-star-fill text-warning"></i> 4.7 <span class="text-success ms-1">Open</span></p>
              <p class="small text-tertiary mb-0" style="font-size: 0.8rem;">Architecture • Spiritual</p>
            </div>
            <i class="bi bi-bookmark text-secondary fs-5" style="cursor: pointer;"></i>
          </div>

          <!-- Item 3 -->
          <div class="d-flex gap-3 align-items-center">
            <div class="rounded-3 flex-shrink-0 bg-light" style="width: 70px; height: 70px; background-image: url('https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=200&auto=format&fit=crop'); background-size: cover;"></div>
            <div class="flex-grow-1">
              <h6 class="fw-bold mb-1 fs-5">Joggers' Park</h6>
              <p class="small text-secondary mb-1">1.6 km • <i class="bi bi-star-fill text-warning"></i> 4.5 <span class="text-success ms-1">Open</span></p>
              <p class="small text-tertiary mb-0" style="font-size: 0.8rem;">Nature • Walking</p>
            </div>
            <i class="bi bi-bookmark text-secondary fs-5" style="cursor: pointer;"></i>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
    .max-w-desktop {
      max-width: 800px;
    }
  `]
})
export class ExploreComponent {
  public labels = LABELS;
  currentCategory = 'All Categories';
  currentRadius = '2 km';
  isModalOpen = false;
}
