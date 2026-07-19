import { Component, inject, AfterViewInit, ViewChild, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language';
import { LocationService } from '../../services/location';
import { UiService } from '../../services/ui';
import { ApiService } from '../../services/api';
import { BookmarkService } from '../../services/bookmark';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container p-3 p-md-4 max-w-desktop mx-auto fade-in">
      
      <!-- Header -->
      <header class="d-flex justify-content-between align-items-start mb-3">
        <div>
          <p class="text-secondary small mb-1">{{ labels.HOME[dynamicGreetingKey] || labels.HOME.GREETING }}</p>
          <h1 class="fw-bold fs-4 mb-0 d-flex align-items-center placeholder-glow" *ngIf="!location">
            <span class="placeholder col-6 rounded"></span>
          </h1>
          <h1 class="fw-bold fs-4 mb-0 d-flex align-items-center" *ngIf="location">
            {{ location.name || 'Current Location' }}
          </h1>
          <p class="text-secondary small mt-1 mb-0 placeholder-glow" *ngIf="!location">
            <span class="placeholder col-4 rounded"></span>
          </p>
          <p class="text-secondary small mt-1 mb-0" *ngIf="location">
            <i class="bi bi-geo-alt-fill"></i> {{ location.city || 'Locating...' }}
          </p>
        </div>
        <button (click)="requestLocation()" class="btn btn-link text-secondary p-0 border-0 shadow-none text-decoration-none flex-shrink-0" title="Refresh Location">
          <i class="bi bi-geo-alt" style="font-size: 1.5rem; transition: color 0.2s;" onmouseover="this.classList.add('text-dark'); this.classList.remove('text-secondary')" onmouseout="this.classList.add('text-secondary'); this.classList.remove('text-dark')"></i>
        </button>
      </header>

      <!-- Weather Hero Card -->
      <div class="min-card mb-4 border-0 position-relative" [style.background]="getWeatherGradient()" style="height: 200px; border-radius: 20px;">
        <div class="position-absolute bottom-0 start-0 w-100 p-3 p-md-4" style="background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);">
          <h3 class="text-white fw-bold mb-1 fs-5 placeholder-glow" *ngIf="!weather">
            <span class="placeholder col-6 rounded"></span>
          </h3>
          <h3 class="text-white fw-bold mb-1 fs-5" *ngIf="weather">{{ getWeatherHeroTitle() }}</h3>
          
          <p class="text-white opacity-75 mb-0 small placeholder-glow" *ngIf="!weather">
            <span class="placeholder col-8 rounded"></span>
          </p>
          <p class="text-white opacity-75 mb-0 small" *ngIf="weather">{{ getWeatherHeroSubtitle() }}</p>
        </div>
      </div>

      <!-- Weather Stats Row -->
      <div class="d-flex justify-content-between align-items-center mb-4 px-2" *ngIf="weather">
        <div class="text-center">
          <h4 class="fw-bold mb-0">{{ weather.temperature }}°</h4>
          <p class="small text-secondary mb-0">{{ weather.condition }}</p>
        </div>
        <div class="text-center">
          <h4 class="fw-bold mb-0">{{ weather.aqi || 42 }}</h4>
          <p class="small text-secondary mb-0">{{ labels.HOME.GOOD }}</p>
        </div>
        <div class="text-center">
          <h4 class="fw-bold mb-0">{{ weather.humidity || 62 }}%</h4>
          <p class="small text-secondary mb-0">{{ labels.HOME.HUMIDITY }}</p>
        </div>
        <div class="text-center">
          <h4 class="fw-bold mb-0">{{ weather.windSpeed || 12 }}</h4>
          <p class="small text-secondary mb-0">{{ labels.HOME.KM_H }}</p>
        </div>
      </div>
      <!-- Weather Stats Skeleton -->
      <div class="d-flex justify-content-between align-items-center mb-4 px-2 placeholder-glow" *ngIf="!weather">
        <div class="text-center" *ngFor="let i of [1,2,3,4]" style="width: 20%;">
          <h4 class="fw-bold mb-0"><span class="placeholder col-8 rounded"></span></h4>
          <p class="small text-secondary mb-0"><span class="placeholder col-10 rounded"></span></p>
        </div>
      </div>

      <div class="d-flex justify-content-between align-items-center mb-3 mt-4">
        <h5 class="fw-bold mb-0">{{ labels.HOME.NEARBY_HIGHLIGHTS }}</h5>
        <div class="position-relative d-inline-block">
          <span class="badge bg-light text-dark fw-normal rounded-pill border">{{ currentRadius }} <i class="bi bi-chevron-down ms-1"></i></span>
          <select class="position-absolute top-0 start-0 w-100 h-100 opacity-0" style="cursor: pointer;" (change)="currentRadius = $any($event.target).value">
            <option value="1 km" [selected]="currentRadius === '1 km'">1 km</option>
            <option value="2 km" [selected]="currentRadius === '2 km'">2 km</option>
            <option value="5 km" [selected]="currentRadius === '5 km'">5 km</option>
            <option value="10 km" [selected]="currentRadius === '10 km'">10 km</option>
          </select>
        </div>
      </div>
      
      <div class="d-flex overflow-auto gap-3 pb-2 mb-4" #highlightScroll data-lenis-prevent="true" style="scrollbar-width: none; -ms-overflow-style: none;">
        <!-- Dynamic Highlight Cards -->
        <div style="min-width: 150px; max-width: 150px;" *ngFor="let place of highlights">
          <div class="rounded-4 mb-2 position-relative" [style.background]="place.photoUrl ? 'url(' + place.photoUrl + ') center/cover' : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'" style="height: 110px;">
             <button class="btn btn-sm btn-light rounded-circle position-absolute shadow-sm" style="top: 8px; right: 8px; width: 28px; height: 28px; padding: 0;" (click)="toggleBookmark(place)">
                <i class="bi" [ngClass]="isSaved(place) ? 'bi-bookmark-fill text-dark' : 'bi-bookmark text-secondary'" style="font-size: 0.9rem;"></i>
             </button>
          </div>
          <h6 class="fw-bold fs-6 mb-1 text-truncate">{{ place.name || 'Nearby Place' }}</h6>
          <p class="small text-secondary mb-0 text-truncate">{{ (place.distance || 0) | number:'1.1-1' }} km • <i class="bi bi-star-fill text-warning"></i> {{ place.rating || 4.5 }} <span class="text-success ms-1" *ngIf="place.isOpen">Open</span><span class="text-danger ms-1" *ngIf="place.isOpen === false">Closed</span></p>
        </div>

        <!-- Skeleton Highlight Cards -->
        <ng-container *ngIf="isLoadingHighlights">
          <div style="min-width: 150px; max-width: 150px;" *ngFor="let i of [1,2,3]" class="placeholder-glow">
            <div class="rounded-4 mb-2 placeholder w-100" style="height: 110px;"></div>
            <h6 class="fw-bold fs-6 mb-1"><span class="placeholder col-8 rounded"></span></h6>
            <p class="small mb-0"><span class="placeholder col-6 rounded"></span></p>
          </div>
        </ng-container>

        <!-- Empty State -->
        <div *ngIf="!isLoadingHighlights && (!highlights || highlights.length === 0)" class="text-secondary small d-flex align-items-center justify-content-center w-100" style="height: 110px;">
          No nearby places found.
        </div>
      </div>

      <!-- Local specialities -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="fw-bold mb-0">{{ labels.HOME.LOCAL_SPECIALITIES }}</h5>
      </div>

      <div class="d-flex overflow-auto gap-3 pb-2 mb-4" #foodScroll data-lenis-prevent="true" style="scrollbar-width: none; -ms-overflow-style: none;">
        <!-- Dynamic Food Cards -->
        <div style="min-width: 220px; max-width: 220px;" *ngFor="let item of specialties">
          <div class="rounded-4 mb-2 bg-secondary" [style.background]="item.mediaUrls?.[0] ? 'url(' + item.mediaUrls[0] + ') center/cover' : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'" style="height: 130px;"></div>
          <h6 class="fw-bold fs-6 mb-1 text-truncate">{{ item.name }}</h6>
          <p class="small text-secondary mb-0" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">{{ item.description }}</p>
        </div>
        
        <!-- Skeleton Food Cards -->
        <ng-container *ngIf="isLoadingSpecialties">
          <div style="min-width: 220px; max-width: 220px;" *ngFor="let i of [1,2]" class="placeholder-glow">
            <div class="rounded-4 mb-2 placeholder w-100" style="height: 130px;"></div>
            <h6 class="fw-bold fs-6 mb-1"><span class="placeholder col-7 rounded"></span></h6>
            <p class="small mb-0"><span class="placeholder col-12 rounded"></span> <span class="placeholder col-8 rounded"></span></p>
          </div>
        </ng-container>

        <!-- Empty State -->
        <div *ngIf="!isLoadingSpecialties && (!specialties || specialties.length === 0)" class="text-secondary small d-flex align-items-center justify-content-center w-100" style="height: 130px;">
          No local specialties found here.
        </div>
      </div>

    </div>
  `,
  styles: [`
    .max-w-desktop {
      max-width: 800px;
    }
  `]
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private langService = inject(LanguageService);
  private locationService = inject(LocationService);
  private ui = inject(UiService);
  private apiService = inject(ApiService);
  private bookmarkService = inject(BookmarkService);
  private cdr = inject(ChangeDetectorRef);
  
  get labels() { return this.langService.labels; }
  currentRadius = '2 km';
  
  weather: any = null;
  specialties: any[] = [];
  highlights: any[] = [];
  location: any = null;
  isLoadingHighlights = true;
  isLoadingSpecialties = true;

  get dynamicGreetingKey(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'GREETING_MORNING';
    if (hour < 17) return 'GREETING_AFTERNOON';
    return 'GREETING_EVENING';
  }

  getWeatherGradient(): string {
    if (!this.weather || !this.weather.condition) {
      return 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)';
    }
    const cond = this.weather.condition.toLowerCase();
    if (cond.includes('clear') || cond.includes('sunny')) {
      return 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)';
    } else if (cond.includes('cloud')) {
      return 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)';
    } else if (cond.includes('rain') || cond.includes('drizzle')) {
      return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
    } else {
      return 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)';
    }
  }

  getWeatherHeroTitle(): string {
    if (!this.weather || !this.weather.condition) return this.labels.HOME.WEATHER_HERO_TITLE;
    const cond = this.weather.condition.toLowerCase();
    if (cond.includes('clear') || cond.includes('sunny')) return 'Beautiful weather today.';
    if (cond.includes('cloud')) return 'Cloudy skies right now.';
    if (cond.includes('rain') || cond.includes('drizzle')) return 'It is raining outside.';
    if (cond.includes('snow')) return 'Snowy weather today.';
    return `It's ${this.weather.condition} today.`;
  }

  getWeatherHeroSubtitle(): string {
    if (!this.weather || !this.weather.condition) return this.labels.HOME.WEATHER_HERO_SUBTITLE;
    const cond = this.weather.condition.toLowerCase();
    if (cond.includes('clear') || cond.includes('sunny')) return 'Perfect time for a walk outside.';
    if (cond.includes('cloud')) return 'A cool day to explore the city.';
    if (cond.includes('rain') || cond.includes('drizzle') || cond.includes('snow')) return 'Great time for a cozy indoor café.';
    return 'Great time to explore local spots.';
  }

  @ViewChild('highlightScroll') highlightScroll!: ElementRef<HTMLElement>;
  @ViewChild('foodScroll') foodScroll!: ElementRef<HTMLElement>;
  
  private wheelHandler = (event: WheelEvent) => {
    const container = event.currentTarget as HTMLElement;
    if (event.deltaY !== 0 && event.deltaX === 0) {
      const isAtLeft = container.scrollLeft === 0;
      const isAtRight = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;

      if (event.deltaY < 0 && isAtLeft) return;
      if (event.deltaY > 0 && isAtRight) return;

      event.preventDefault();
      container.scrollBy({ left: event.deltaY > 0 ? 250 : -250, behavior: 'smooth' });
    }
  };

  ngAfterViewInit() {
    if (this.highlightScroll?.nativeElement) {
      this.highlightScroll.nativeElement.addEventListener('wheel', this.wheelHandler, { passive: false });
    }
    if (this.foodScroll?.nativeElement) {
      this.foodScroll.nativeElement.addEventListener('wheel', this.wheelHandler, { passive: false });
    }
    
    // Initial fetch if we already have location
    const coords = this.locationService.coords();
    if (coords) {
      this.fetchDynamicData(coords.lat, coords.lng);
    }
  }

  ngOnDestroy() {
    if (this.highlightScroll?.nativeElement) {
      this.highlightScroll.nativeElement.removeEventListener('wheel', this.wheelHandler);
    }
    if (this.foodScroll?.nativeElement) {
      this.foodScroll.nativeElement.removeEventListener('wheel', this.wheelHandler);
    }
  }

  async requestLocation() {
    try {
      const pos = await this.locationService.requestLocation();
      this.ui.showToast(this.labels.TOAST.LOCATION_SUCCESS, 'success');
      this.fetchDynamicData(pos.lat, pos.lng);
    } catch (error) {
      console.error('Location error:', error);
      this.ui.showToast(this.labels.TOAST.LOCATION_ERROR, 'error');
    }
  }

  async fetchDynamicData(lat: number, lng: number) {
    this.isLoadingHighlights = true;
    this.isLoadingSpecialties = true;
    try {
      this.weather = await this.apiService.get<any>(`/api/v1/weather?latitude=${lat}&longitude=${lng}`);
    } catch (e) {
      console.error('Failed to fetch weather', e);
    }
    
    try {
      const res = await this.apiService.get<any>(`/api/v1/specialties?latitude=${lat}&longitude=${lng}`);
      this.specialties = res?.documents || [];
    } catch (e) {
      console.error('Failed to fetch specialties', e);
      this.specialties = [];
    } finally {
      this.isLoadingSpecialties = false;
      this.cdr.detectChanges();
    }
    
    try {
      const radiusMeters = parseInt(this.currentRadius) * 1000;
      const res = await this.apiService.get<any>(`/api/v1/providers/places/nearby?latitude=${lat}&longitude=${lng}&radius=${radiusMeters}`);
      this.highlights = res || [];
      if (this.highlights.length > 0) {
        this.location = {
          name: this.highlights[0]?.vicinity?.split(',')[0] || 'Your Location',
          city: this.highlights[0]?.vicinity || 'Unknown City'
        };
      }
    } catch (e) {
      console.error('Failed to fetch highlights', e);
      this.highlights = [];
    } finally {
      this.isLoadingHighlights = false;
      this.cdr.detectChanges();
    }
  }

  isSaved(place: any): boolean {
    return this.bookmarkService.isBookmarked(place.placeId);
  }

  toggleBookmark(place: any) {
    this.bookmarkService.toggleBookmark(place);
  }
}
