import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language';
import { BookmarkService } from '../../services/bookmark';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-saved',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
        <div *ngIf="bookmarks.length > 0" class="d-flex flex-column gap-4 fade-in">
          <div *ngFor="let place of bookmarks" class="d-flex gap-3 align-items-center">
            <div class="rounded-3 flex-shrink-0 bg-light" [style.background]="place.photoUrl ? 'url(' + place.photoUrl + ') center/cover' : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'" style="width: 80px; height: 80px;"></div>
            <div class="flex-grow-1 overflow-hidden">
              <h6 class="fw-bold mb-1 fs-5 text-truncate">{{ place.name }}</h6>
              <p class="small text-secondary mb-1">{{ (place.distance || 0) | number:'1.1-1' }} km • <i class="bi bi-star-fill text-warning"></i> {{ place.rating || 4.5 }}</p>
              <p class="small text-tertiary mb-0 text-truncate" style="font-size: 0.8rem;">{{ place.types?.join(' • ') || 'Place' }}</p>
            </div>
            <i class="bi fs-5 bi-bookmark-fill text-dark" style="cursor: pointer;" (click)="removeBookmark(place)"></i>
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
  private bookmarkService = inject(BookmarkService);
  get labels() { return this.langService.labels; }

  get bookmarks() {
    return this.bookmarkService.bookmarks;
  }

  get hasItems() {
    return this.bookmarks.length > 0;
  }

  removeBookmark(place: any) {
    this.bookmarkService.toggleBookmark(place);
  }
}
