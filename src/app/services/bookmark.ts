import { Injectable, signal } from '@angular/core';
import { ApiService } from './api';
import { AuthService } from './auth';
import { Bookmark, Place } from '../models';

@Injectable({ providedIn: 'root' })
export class BookmarkService {
  private bookmarksSignal = signal<Bookmark[]>([]);
  private loadingSignal = signal<boolean>(false);

  get bookmarks() {
    return this.bookmarksSignal();
  }

  get isLoading() {
    return this.loadingSignal();
  }

  constructor(private api: ApiService, private auth: AuthService) {
    if (this.auth.isLoggedIn) {
      this.fetchBookmarks();
    }
  }

  async fetchBookmarks() {
    if (!this.auth.isLoggedIn) return;
    this.loadingSignal.set(true);
    try {
      const items = await this.api.get<Bookmark[]>('/api/v1/me/bookmarks');
      this.bookmarksSignal.set(items || []);
    } catch (e) {
      console.error('Failed to fetch bookmarks', e);
    } finally {
      this.loadingSignal.set(false);
    }
  }

  isBookmarked(placeId: string): boolean {
    return this.bookmarksSignal().some(b => b.placeId === placeId);
  }

  async toggleBookmark(place: Place | Bookmark) {
    if (!this.auth.isLoggedIn) {
      // Could throw an error or redirect to login
      throw new Error('UNAUTHORIZED');
    }

    const placeId = place.placeId;
    const isSaved = this.isBookmarked(placeId);

    this.loadingSignal.set(true);
    try {
      if (isSaved) {
        this.bookmarksSignal.set(this.bookmarksSignal().filter(b => b.placeId !== placeId));
        await this.api.delete(`/api/v1/me/bookmarks/${placeId}`);
      } else {
        const bookmark = {
          placeId: place.placeId,
          name: place.name,
          photoUrl: place.photoUrl || '',
          rating: place.rating || 0,
          types: place.types || [],
          distance: place.distance || 0,
          location: place.location || { latitude: 0, longitude: 0 }
        };
        this.bookmarksSignal.set([...this.bookmarksSignal(), bookmark]);
        await this.api.post('/api/v1/me/bookmarks', bookmark);
      }
    } catch (e) {
      console.error('Failed to toggle bookmark', e);
      this.fetchBookmarks();
    } finally {
      this.loadingSignal.set(false);
    }
  }
}
