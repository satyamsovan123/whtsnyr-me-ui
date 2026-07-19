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
          <!-- Dynamic Items would go here -->
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

  hasItems = false;
}
