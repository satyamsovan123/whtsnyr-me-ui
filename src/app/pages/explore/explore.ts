import { Component, inject, ChangeDetectorRef, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language';
import { EXPLORE_CATEGORIES, PREFERRED_RADIUSES } from '../../constants/common';
import { ApiService } from '../../services/api';
import { LocationService } from '../../services/location';
import { BookmarkService } from '../../services/bookmark';
import { Place, PlacePrediction, AutocompleteResponse, NearbyPlacesResponse, PlaceDetailsResponse } from '../../models';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container position-relative d-flex flex-column flex-grow-1 max-w-desktop mx-auto bg-white fade-in w-100">
      
      <!-- Top Search & Filters -->
      <div class="pt-3 px-4 bg-white z-1">
        <div class="position-relative mb-3">
          <div class="input-group bg-light rounded-pill p-1">
            <span class="input-group-text bg-transparent border-0 text-secondary"><i class="bi bi-search"></i></span>
            <input type="text" class="form-control border-0 bg-transparent shadow-none" [placeholder]="labels.EXPLORE.SEARCH_PLACEHOLDER"
                   [(ngModel)]="searchQuery" (input)="onSearchInput()" (focus)="onSearchInput()">
            <span *ngIf="isSearching" class="input-group-text bg-transparent border-0 text-secondary"><div class="spinner-border spinner-border-sm"></div></span>
            <span *ngIf="searchQuery && !isSearching" class="input-group-text bg-transparent border-0 text-secondary" style="cursor: pointer;" (click)="clearSearch()"><i class="bi bi-x-circle-fill"></i></span>
          </div>
          
          <!-- Autocomplete Dropdown -->
          <div *ngIf="searchPredictions.length > 0" class="position-absolute w-100 bg-white rounded-4 shadow border z-3 overflow-hidden" style="top: 110%; max-height: 250px; overflow-y: auto;">
             <div *ngFor="let pred of searchPredictions" class="px-3 py-2 border-bottom" style="cursor: pointer;" onmouseover="this.classList.add('bg-light')" onmouseout="this.classList.remove('bg-light')" (click)="selectPrediction(pred)">
                <div class="fw-bold fs-6 text-truncate"><i class="bi bi-geo-alt me-2 text-secondary"></i>{{ pred.mainText || pred.description }}</div>
                <div class="small text-secondary text-truncate" style="margin-left: 28px;">{{ pred.secondaryText || '' }}</div>
             </div>
          </div>
        </div>
        <div class="d-flex gap-2 overflow-auto no-scrollbar pb-2 mb-2 align-items-center">
          
          <!-- Location Icon -->
          <button (click)="refreshLocation()" class="btn btn-outline border-light rounded-circle text-secondary bg-white shadow-sm flex-shrink-0 d-flex align-items-center justify-content-center" style="width: 32px; height: 32px; transition: color 0.2s;" onmouseover="this.classList.add('text-dark'); this.classList.remove('text-secondary')" onmouseout="this.classList.add('text-secondary'); this.classList.remove('text-dark')" title="Refresh Location">
            <i class="bi bi-geo-alt"></i>
          </button>

          <!-- Category Dropdown -->
          <div class="position-relative d-inline-block">
            <button class="btn btn-outline border-light rounded-pill text-dark fw-medium btn-sm px-3 shadow-sm bg-white text-nowrap">{{ currentCategoryName }} <i class="bi bi-chevron-down ms-1"></i></button>
            <select class="position-absolute top-0 start-0 w-100 h-100 opacity-0" style="cursor: pointer;" (change)="onCategoryChange($event)">
              <option *ngFor="let cat of exploreCategories" [value]="cat.value">{{ labels.EXPLORE[cat.labelKey] }}</option>
            </select>
          </div>
          
          <!-- Radius Dropdown -->
          <div class="position-relative d-inline-block">
            <button class="btn btn-outline border-light rounded-pill text-dark fw-medium btn-sm px-3 shadow-sm bg-white text-nowrap">{{ currentRadius }} <i class="bi bi-chevron-down ms-1"></i></button>
            <select class="position-absolute top-0 start-0 w-100 h-100 opacity-0" style="cursor: pointer;" (change)="onRadiusChange($event)">
              <option *ngFor="let r of preferredRadiuses" [value]="r" [selected]="currentRadius === r">{{ r }}</option>
            </select>
          </div>

        </div>
      </div>

      <!-- Map Area -->
      <div class="flex-grow-1 position-relative bg-light rounded-4 overflow-hidden mx-3 mb-3 shadow-sm" style="min-height: 400px; display: flex; flex-direction: column;">
        <div id="explore-map" class="w-100 h-100 position-absolute top-0 start-0 z-0"></div>
        <div *ngIf="isLoading || isMapLoading || isBookmarkLoading" class="w-100 h-100 position-absolute top-0 start-0 d-flex align-items-center justify-content-center bg-white z-1">
           <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>
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
          <div *ngIf="isLoading || isBookmarkLoading" class="d-flex align-items-center justify-content-center py-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          
          <!-- Dynamic Items -->
          <div *ngFor="let place of highlights; let i = index" class="d-flex gap-3 align-items-center mb-4">
            <div class="rounded-3 flex-shrink-0 bg-light" [style.background]="place.photoUrl ? 'url(' + place.photoUrl + ') center/cover' : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'" style="width: 70px; height: 70px;"></div>
            <div class="flex-grow-1 overflow-hidden">
              <h6 class="fw-bold mb-1 fs-5 text-truncate">{{ place.name }}</h6>
              <p class="small text-secondary mb-1">{{ (place.distance || 0) | number:'1.1-1' }} km • <i class="bi bi-star-fill text-warning"></i> {{ place.rating != null ? place.rating : '--' }} <span class="text-success ms-1" *ngIf="place.isOpen">Open</span><span class="text-danger ms-1" *ngIf="place.isOpen === false">Closed</span></p>
              <div class="d-flex align-items-center gap-2 mt-1">
                <a [href]="getDirectionsUrl(place)" target="_blank" class="btn btn-sm btn-dark rounded-pill py-1 px-3 fw-medium text-decoration-none shadow-sm" style="font-size: 0.7rem;"><i class="bi bi-geo-alt-fill me-1"></i> Directions</a>
                <p class="small text-tertiary mb-0 text-truncate" style="font-size: 0.75rem;">{{ formatTypes(place.types) }}</p>
              </div>
            </div>
            <i class="bi fs-5" style="cursor: pointer;" [ngClass]="isSaved(place) ? 'bi-bookmark-fill text-dark' : 'bi-bookmark text-secondary'" (click)="toggleBookmark(place)"></i>
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
    .leaflet-container {
      font-family: inherit;
    }
  `]
})
export class ExploreComponent implements AfterViewInit, OnInit {
  private langService = inject(LanguageService);
  private apiService = inject(ApiService);
  private locationService = inject(LocationService);
  private bookmarkService = inject(BookmarkService);
  private cdr = inject(ChangeDetectorRef);
  
  get labels() { return this.langService.labels; }
  get isBookmarkLoading() { return this.bookmarkService.isLoading; }

  public exploreCategories = EXPLORE_CATEGORIES;
  public preferredRadiuses = PREFERRED_RADIUSES;

  currentCategory = 'All Categories';
  currentRadius = '2 km';
  isModalOpen = false;

  private map: any = null;
  private markersLayer: any = null;

  highlights: Place[] = [];
  isLoading = false;
  isMapLoading = true;
  
  searchQuery = '';
  searchPredictions: PlacePrediction[] = [];
  isSearching = false;
  searchTimeout: any;
  customCoords: any = null;

  async ngOnInit() {
    try {
      let coords = this.locationService.coords();
      if (!coords) {
        coords = await this.locationService.requestLocation();
      }
      this.fetchDynamicData();
    } catch (e) {
      console.error('Failed to get location', e);
      this.isLoading = false;
      this.isMapLoading = false;
      this.cdr.detectChanges();
    }
  }

  onCategoryChange(event: Event) {
    this.currentCategory = (event.target as HTMLSelectElement).value;
    this.fetchDynamicData();
  }

  onRadiusChange(event: Event) {
    this.currentRadius = (event.target as HTMLSelectElement).value;
    this.fetchDynamicData();
  }

  onSearchInput() {
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    
    if (!this.searchQuery.trim()) {
      this.searchPredictions = [];
      return;
    }

    this.searchTimeout = setTimeout(async () => {
      this.isSearching = true;
      try {
        const coords = this.locationService.coords();
        let url = `/api/v1/providers/places/autocomplete?input=${encodeURIComponent(this.searchQuery)}`;
        if (coords) {
          url += `&latitude=${coords.lat}&longitude=${coords.lng}`;
        }
        const res = await this.apiService.get<AutocompleteResponse>(url);
        this.searchPredictions = res?.predictions || [];
      } catch (e) {
        console.error('Failed to get predictions', e);
        this.searchPredictions = [];
      } finally {
        this.isSearching = false;
        this.cdr.detectChanges();
      }
    }, 300);
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchPredictions = [];
    this.customCoords = null;
    this.fetchDynamicData();
  }

  async selectPrediction(pred: PlacePrediction) {
    this.searchQuery = pred.mainText || pred.description;
    this.searchPredictions = [];
    this.isSearching = true;
    try {
      const res = await this.apiService.get<PlaceDetailsResponse>(`/api/v1/providers/places/details?placeId=${pred.placeId}`);
      if (res && res.location) {
        this.customCoords = { lat: res.location.latitude, lng: res.location.longitude };
        await this.fetchDynamicData();
      }
    } catch (e) {
      console.error('Failed to get details', e);
    } finally {
      this.isSearching = false;
      this.cdr.detectChanges();
    }
  }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    const L = (window as any).L;
    if (!L || this.map) return;
    
    this.map = L.map('explore-map', { zoomControl: false, attributionControl: false }).setView([0, 0], 2);
    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);
    
    tileLayer.on('load', () => {
      this.isMapLoading = false;
      this.cdr.detectChanges();
    });

    this.markersLayer = L.layerGroup().addTo(this.map);
    
    const coords = this.locationService.coords();
    if (coords && this.highlights.length) {
      this.updateMap(coords);
    }
  }

  updateMap(coords: any) {
    const L = (window as any).L;
    if (!L || !this.map || !this.markersLayer) return;
    
    this.markersLayer.clearLayers();

    // User marker
    const userIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: #0d6efd; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
    L.marker([coords.lat, coords.lng], { icon: userIcon }).addTo(this.markersLayer);

    const bounds = L.latLngBounds([[coords.lat, coords.lng]]);

    // Places markers
    this.highlights.forEach(place => {
      if (place.location && place.location.latitude) {
        const iconHtml = `<div class="bg-dark text-white rounded-pill px-2 py-1 shadow-sm small fw-bold d-flex align-items-center" style="white-space: nowrap; width: max-content; transform: translate(-50%, -100%); margin-top: -5px;"><i class="bi bi-star-fill text-warning me-1" style="font-size: 0.7rem;"></i> ${place.name}</div>`;
        const placeIcon = L.divIcon({
          className: 'custom-place-icon',
          html: iconHtml,
          iconSize: null
        });
        const latLng = [place.location.latitude, place.location.longitude];
        L.marker(latLng, { icon: placeIcon }).addTo(this.markersLayer);
        bounds.extend(latLng);
      }
    });

    if (this.highlights.length > 0) {
      this.map.fitBounds(bounds, { padding: [30, 30], maxZoom: 16 });
    } else {
      this.map.setView([coords.lat, coords.lng], 14);
    }
    
    setTimeout(() => this.map.invalidateSize(), 100);
  }

  async refreshLocation() {
    try {
      this.isLoading = true;
      this.customCoords = null;
      this.searchQuery = '';
      await this.locationService.requestLocation();
      await this.fetchDynamicData();
    } catch (e) {
      console.error('Location error', e);
      this.isLoading = false;
    }
  }

  async fetchDynamicData() {
    try {
      this.isLoading = true;
      const coords = this.customCoords || this.locationService.coords();
      if (!coords) return;
      
      const radiusMeters = parseInt(this.currentRadius) * 1000;
      const CATEGORY_TO_TYPE: Record<string, string> = {
        'All Categories': 'tourist_attraction',
        'Food & Dining': 'restaurant',
        'Nature & Parks': 'park',
        'Shopping': 'shopping_mall',
        'Arts & Culture': 'museum',
        'Entertainment': 'movie_theater'
      };
      const apiType = CATEGORY_TO_TYPE[this.currentCategory] || 'tourist_attraction';

      const res = await this.apiService.get<NearbyPlacesResponse>(`/api/v1/providers/places/nearby?latitude=${coords.lat}&longitude=${coords.lng}&radius=${radiusMeters}&type=${apiType}`);
      if (res && res.places) {
        this.highlights = res.places.sort((a: Place, b: Place) => {
          const distA = a.distance || 0;
          const distB = b.distance || 0;
          // Sort by distance ascending
          if (distA !== distB) {
            return distA - distB;
          }
          // Sort by rating descending
          const ratingA = a.rating || 0;
          const ratingB = b.rating || 0;
          return ratingB - ratingA;
        });
      } else {
        this.highlights = [];
      }
      this.updateMap(coords);
    } catch (e) {
      console.error('Failed to fetch explore highlights', e);
      this.highlights = [];
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  get currentCategoryName(): string {
    const c = this.exploreCategories.find(x => x.value === this.currentCategory);
    return c ? this.labels.EXPLORE[c.labelKey] : this.currentCategory;
  }

  isSaved(place: Place): boolean {
    return this.bookmarkService.isBookmarked(place.placeId);
  }

  toggleBookmark(place: Place) {
    this.bookmarkService.toggleBookmark(place);
  }

  formatTypes(types?: string[]): string {
    if (!types || !types.length) return 'Place';
    const genericTypes = ['point_of_interest', 'establishment', 'premise', 'neighborhood'];
    const filtered = types.filter(t => !genericTypes.includes(t));
    const displayTypes = filtered.length > 0 ? filtered : types; // fallback if all are generic
    return displayTypes
      .slice(0, 2)
      .map(t => t.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()))
      .join(' • ');
  }

  getDirectionsUrl(place: Place): string {
    const coords = this.locationService.coords();
    if (!coords || !place.location) return '#';
    return `https://www.google.com/maps/dir/?api=1&origin=${coords.lat},${coords.lng}&destination=${place.location.latitude},${place.location.longitude}`;
  }
}
