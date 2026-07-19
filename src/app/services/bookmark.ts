import { Injectable, signal } from '@angular/core';
import { ApiService } from './api';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class BookmarkService {
  private bookmarksSignal = signal<any[]>([]);

  get bookmarks() {
    return this.bookmarksSignal();
  }

  constructor(private api: ApiService, private auth: AuthService) {
    if (this.auth.isLoggedIn) {
      this.fetchBookmarks();
    }
  }

  async fetchBookmarks() {
    if (!this.auth.isLoggedIn) return;
    try {
      const items = await this.api.get<any[]>('/api/v1/me/bookmarks');
      this.bookmarksSignal.set(items || []);
    } catch (e) {
      console.error('Failed to fetch bookmarks', e);
    }
  }

  isBookmarked(placeId: string): boolean {
    return this.bookmarksSignal().some(b => b.placeId === placeId);
  }

  async toggleBookmark(place: any) {
    if (!this.auth.isLoggedIn) {
      // Could throw an error or redirect to login
      throw new Error('UNAUTHORIZED');
    }

    const placeId = place.placeId;
    const isSaved = this.isBookmarked(placeId);

    try {
      if (isSaved) {
        // Optimistic update
        this.bookmarksSignal.set(this.bookmarksSignal().filter(b => b.placeId !== placeId));
        await this.api.delete(`/api/v1/me/bookmarks/${placeId}`);
      } else {
        // Optimistic update
        const bookmark = {
          placeId: place.placeId,
          name: place.name,
          photoUrl: place.photoUrl || '',
          rating: place.rating || 0,
          types: place.types || [],
          distance: place.distance || 0,
          location: place.location || { lat: 0, lng: 0 }
        };
        this.bookmarksSignal.set([...this.bookmarksSignal(), bookmark]);
        await this.api.post('/api/v1/me/bookmarks', bookmark);
      }
    } catch (e) {
      console.error('Failed to toggle bookmark', e);
      // Revert optimistic update by refetching
      this.fetchBookmarks();
    }
  }
}
