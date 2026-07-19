import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../services/location';
import { LanguageService } from '../../services/language';
import { BookmarkService } from '../../services/bookmark';
import { RouterModule } from '@angular/router';
import { Bookmark, Place } from '../../models';

@Component({
  selector: 'app-saved',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-container bg-white min-vh-100 fade-in max-w-desktop mx-auto position-relative px-4 py-4 d-flex flex-column">
        
        <!-- Loader -->
        <div *ngIf="isLoading" class="d-flex align-items-center justify-content-center flex-grow-1" style="min-height: 50vh;">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <ng-container *ngIf="!isLoading">
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
              <p class="small text-secondary mb-1">{{ (place.distance || 0) | number:'1.1-1' }} km • <i class="bi bi-star-fill text-warning"></i> {{ place.rating != null ? place.rating : '--' }}</p>
              <div class="d-flex align-items-center gap-2 mt-1">
                <a [href]="getDirectionsUrl(place)" target="_blank" class="btn btn-sm btn-dark rounded-pill py-1 px-3 fw-medium text-decoration-none shadow-sm" style="font-size: 0.7rem;"><i class="bi bi-geo-alt-fill me-1"></i> Directions</a>
                <p class="small text-tertiary mb-0 text-truncate" style="font-size: 0.75rem;">{{ formatTypes(place.types) }}</p>
              </div>
            </div>
            <i class="bi fs-5 bi-bookmark-fill text-dark" style="cursor: pointer;" (click)="removeBookmark(place)"></i>
          </div>
        </div>
        </ng-container>
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
  private locationService = inject(LocationService);
  get labels() { return this.langService.labels; }

  get bookmarks() {
    return this.bookmarkService.bookmarks;
  }

  get isLoading() {
    return this.bookmarkService.isLoading;
  }

  get hasItems() {
    return this.bookmarks.length > 0;
  }

  removeBookmark(place: Bookmark) {
    this.bookmarkService.toggleBookmark(place);
  }

  formatTypes(types?: string[]): string {
    if (!types || !types.length) return 'Place';
    return types
      .map(t => t.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()))
      .join(' • ');
  }

  getDirectionsUrl(place: Bookmark): string {
    const coords = this.locationService.coords();
    if (!coords || !place.location) return '#';
    return `https://www.google.com/maps/dir/?api=1&origin=${coords.lat},${coords.lng}&destination=${place.location.latitude},${place.location.longitude}`;
  }
}
