import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-saved',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container bg-white min-vh-100 fade-in max-w-desktop mx-auto position-relative px-4 py-4">
        
        <div class="mb-5">
          <h1 class="fw-bold fs-2 mb-2">{{ labels.SAVED.TITLE }}</h1>
          <p class="text-secondary">{{ labels.SAVED.SUBTITLE }}</p>
        </div>

        <!-- Tabs or Toggle for Mock Data -->
        <div class="d-flex justify-content-end mb-3">
          <button class="btn btn-sm btn-outline rounded-pill text-secondary border-light" (click)="hasItems = !hasItems">
            <i class="bi bi-magic me-1"></i> Toggle Empty State
          </button>
        </div>

        <!-- Empty State -->
        <div *ngIf="!hasItems" class="d-flex flex-column align-items-center justify-content-center text-center py-5 fade-in">
          <div class="bg-light rounded-circle d-flex align-items-center justify-content-center mb-4" style="width: 80px; height: 80px;">
            <i class="bi bi-bookmark-x text-tertiary" style="font-size: 2rem;"></i>
          </div>
          <h4 class="fw-bold mb-2">{{ labels.SAVED.EMPTY_STATE }}</h4>
          <p class="text-secondary mb-4" style="max-width: 300px;">{{ labels.SAVED.EMPTY_SUBTITLE }}</p>
          <button class="btn btn-outline border rounded-pill shadow-sm px-4 fw-bold" style="transition: none;" routerLink="/explore">{{ labels.NAVBAR.EXPLORE }}</button>
        </div>

        <!-- Populated State -->
        <div *ngIf="hasItems" class="d-flex flex-column gap-4 fade-in">
          <!-- Item 1 -->
          <div class="d-flex gap-3 align-items-center">
            <div class="rounded-3 flex-shrink-0 bg-light" style="width: 80px; height: 80px; background-image: url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=200&auto=format&fit=crop'); background-size: cover;"></div>
            <div class="flex-grow-1">
              <h6 class="fw-bold mb-1 fs-5">Bandra Fort</h6>
              <p class="small text-secondary mb-1">1.1 km • <i class="bi bi-star-fill text-warning"></i> 4.6 <span class="text-success ms-1">Open</span></p>
              <p class="small text-tertiary mb-0" style="font-size: 0.8rem;">Historic • Photography</p>
            </div>
            <i class="bi fs-5" style="cursor: pointer;" [ngClass]="isBookmarked1 ? 'bi-bookmark-fill text-dark' : 'bi-bookmark text-secondary'" (click)="isBookmarked1 = !isBookmarked1"></i>
          </div>

          <!-- Item 2 -->
          <div class="d-flex gap-3 align-items-center">
            <div class="rounded-3 flex-shrink-0 bg-light" style="width: 80px; height: 80px; background-image: url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=400&auto=format&fit=crop'); background-size: cover;"></div>
            <div class="flex-grow-1">
              <h6 class="fw-bold mb-1 fs-5">Kala Ghoda Café</h6>
              <p class="small text-secondary mb-1">1.2 km • <i class="bi bi-star-fill text-warning"></i> 4.6 <span class="text-success ms-1">Open</span></p>
              <p class="small text-tertiary mb-0" style="font-size: 0.8rem;">Cafe • Coffee</p>
            </div>
            <i class="bi fs-5" style="cursor: pointer;" [ngClass]="isBookmarked2 ? 'bi-bookmark-fill text-dark' : 'bi-bookmark text-secondary'" (click)="isBookmarked2 = !isBookmarked2"></i>
          </div>
        </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: var(--bg-color);
    }
    .max-w-desktop {
      max-width: 800px;
    }
  `]
})
export class SavedComponent {
  private langService = inject(LanguageService);
  get labels() { return this.langService.labels; }

  hasItems = true;
  isBookmarked1 = true;
  isBookmarked2 = true;
}
