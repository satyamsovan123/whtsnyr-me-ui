import {
  Component,
  inject,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language';
import { LocationService } from '../../services/location';
import { UiService } from '../../services/ui';
import { ApiService } from '../../services/api';
import { BookmarkService } from '../../services/bookmark';
import { AuthService } from '../../services/auth';
import { SwiggyService } from '../../services/swiggy';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container p-3 p-md-4 max-w-desktop mx-auto fade-in">
      <!-- Header -->
      <header class="d-flex justify-content-between align-items-start mb-3">
        <div>
          <p class="text-secondary small mb-1">
            {{ labels.HOME[dynamicGreetingKey] || labels.HOME.GREETING }}
          </p>
          <h1
            class="fw-bold fs-4 mb-0 d-flex align-items-center placeholder-glow"
            *ngIf="!location"
          >
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
        <button
          (click)="requestLocation()"
          class="btn btn-link text-secondary p-0 border-0 shadow-none text-decoration-none flex-shrink-0"
          title="Refresh Location"
        >
          <i
            class="bi bi-geo-alt"
            style="font-size: 1.5rem; transition: color 0.2s;"
            onmouseover="this.classList.add('text-dark'); this.classList.remove('text-secondary')"
            onmouseout="this.classList.add('text-secondary'); this.classList.remove('text-dark')"
          ></i>
        </button>
      </header>

      <!-- AI Insights Hero Card -->
      <div class="apple-ai-card mb-4" style="min-height: 120px;">
        <div
          class="apple-ai-card-content p-3 p-md-4 h-100 d-flex flex-column justify-content-center"
        >
          <div class="d-flex align-items-center mb-2">
            <i class="bi bi-stars text-primary me-2 fs-5"></i>
            <h6 class="fw-bold mb-0 m-0">Insight</h6>
          </div>
          <p class="mb-0 text-secondary small placeholder-glow" *ngIf="!insightText">
            <span class="placeholder col-12 rounded mb-1"></span>
            <span class="placeholder col-10 rounded mb-1"></span>
            <span class="placeholder col-6 rounded"></span>
          </p>
          <p class="mb-0 fs-6 fw-medium text-dark" *ngIf="insightText">{{ insightText }}</p>
        </div>
      </div>

      <!-- Weather Stats Row -->
      <div class="d-flex justify-content-between align-items-center mb-4 px-2" *ngIf="weather">
        <div class="text-center">
          <h4 class="fw-bold mb-0">{{ weather.temperature }}°</h4>
          <p class="small text-secondary mb-0">{{ weather.condition }}</p>
        </div>
        <div class="text-center">
          <h4 class="fw-bold mb-0">{{ weather.aqi != null ? weather.aqi : '--' }}</h4>
          <p class="small text-secondary mb-0">{{ labels.HOME.GOOD }}</p>
        </div>
        <div class="text-center">
          <h4 class="fw-bold mb-0">{{ weather.humidity != null ? weather.humidity : '--' }}%</h4>
          <p class="small text-secondary mb-0">{{ labels.HOME.HUMIDITY }}</p>
        </div>
        <div class="text-center">
          <h4 class="fw-bold mb-0">{{ weather.windSpeed != null ? weather.windSpeed : '--' }}</h4>
          <p class="small text-secondary mb-0">{{ labels.HOME.KM_H }}</p>
        </div>
      </div>
      <!-- Weather Stats Skeleton -->
      <div
        class="d-flex justify-content-between align-items-center mb-4 px-2 placeholder-glow"
        *ngIf="!weather"
      >
        <div class="text-center" *ngFor="let i of [1, 2, 3, 4]" style="width: 20%;">
          <h4 class="fw-bold mb-0"><span class="placeholder col-8 rounded"></span></h4>
          <p class="small text-secondary mb-0"><span class="placeholder col-10 rounded"></span></p>
        </div>
      </div>

      <div class="d-flex justify-content-between align-items-center mb-3 mt-4">
        <h5 class="fw-bold mb-0">{{ labels.HOME.NEARBY_HIGHLIGHTS }}</h5>
        <div class="position-relative d-inline-block">
          <span class="badge bg-light text-dark fw-normal rounded-pill border"
            >{{ currentRadius }} <i class="bi bi-chevron-down ms-1"></i
          ></span>
          <select
            class="position-absolute top-0 start-0 w-100 h-100 opacity-0"
            style="cursor: pointer;"
            (change)="onRadiusChange($event)"
          >
            <option value="1 km" [selected]="currentRadius === '1 km'">1 km</option>
            <option value="2 km" [selected]="currentRadius === '2 km'">2 km</option>
            <option value="5 km" [selected]="currentRadius === '5 km'">5 km</option>
            <option value="10 km" [selected]="currentRadius === '10 km'">10 km</option>
          </select>
        </div>
      </div>

      <div class="d-flex overflow-auto gap-3 pb-2 mb-4" #highlightScroll data-lenis-prevent="true">
        <!-- Dynamic Highlight Cards -->
        <div style="min-width: 150px; max-width: 150px;" *ngFor="let place of highlights">
          <div
            class="rounded-4 mb-2 position-relative"
            [style.background]="
              place.photoUrl
                ? 'url(' + place.photoUrl + ') center/cover'
                : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
            "
            style="height: 110px;"
          ></div>
          <h6 class="fw-bold fs-6 mb-1 text-truncate">{{ place.name || 'Nearby Place' }}</h6>
          <p class="small text-secondary mb-1 text-truncate">
            {{ place.distance || 0 | number: '1.1-1' }} km •
            <i class="bi bi-star-fill text-warning"></i>
            {{ place.rating != null ? place.rating : '--' }}
            <span class="text-success ms-1" *ngIf="place.isOpen">Open</span
            ><span class="text-danger ms-1" *ngIf="place.isOpen === false">Closed</span>
          </p>
        </div>

        <!-- Skeleton Highlight Cards -->
        <ng-container *ngIf="isLoadingHighlights">
          <div
            style="min-width: 150px; max-width: 150px;"
            *ngFor="let i of [1, 2, 3]"
            class="placeholder-glow"
          >
            <div class="rounded-4 mb-2 placeholder w-100" style="height: 110px;"></div>
            <h6 class="fw-bold fs-6 mb-1"><span class="placeholder col-8 rounded"></span></h6>
            <p class="small mb-0"><span class="placeholder col-6 rounded"></span></p>
          </div>
        </ng-container>

        <!-- Empty State -->
        <div
          *ngIf="!isLoadingHighlights && (!highlights || highlights.length === 0)"
          class="text-secondary small d-flex align-items-center justify-content-center w-100"
          style="height: 110px;"
        >
          No nearby places found.
        </div>
      </div>

      <!-- Local specialities -->
      <ng-container *ngIf="isLoggedIn">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="fw-bold mb-0">{{ labels.HOME.LOCAL_SPECIALITIES }}</h5>
        </div>

        <!-- Swiggy Connect Hero (Shown in Local Specialties) -->
        <div
          *ngIf="isSwiggyConnected === false"
          class="mb-4 overflow-hidden position-relative shadow-sm"
          style="background: linear-gradient(135deg, #ff5200 0%, white 100%); border: none; border-radius: 20px;"
        >
          <div
            class="p-3 p-md-4 d-flex flex-column justify-content-center align-items-start position-relative z-1"
          >
            <div class="d-flex align-items-center mb-2">
              <img
                src="/swiggy-logo.png"
                alt="Swiggy"
                height="28"
                class="me-2"
                style="object-fit: contain; filter: brightness(0) invert(1);"
              />
            </div>
            <p class="mb-3 fs-6 text-dark fw-medium" style="line-height: 1.4; max-width: 90%;">
              Experience the city like a local. Connect your Swiggy account to infuse your AI
              insights with authentic, hyper-localized recommendations for neighborhood culinary
              secrets and unique souvenirs.
            </p>
            <button
              (click)="connectSwiggy()"
              class="btn bg-white text-dark rounded-pill px-4 py-2 fw-bold shadow-sm d-flex align-items-center border-0"
              [disabled]="isConnectingSwiggy"
            >
              <span *ngIf="!isConnectingSwiggy">Sign in with Swiggy</span>
              <span
                *ngIf="isConnectingSwiggy"
                class="spinner-border spinner-border-sm text-dark"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </div>

        <div
          *ngIf="isSwiggyConnected !== false"
          class="d-flex overflow-auto gap-3 pb-2 mb-4"
          #foodScroll
          data-lenis-prevent="true"
        >
          <div style="min-width: 220px; max-width: 220px;" *ngFor="let item of specialties">
            <div
              class="rounded-4 mb-2 bg-secondary"
              [style.background]="
                item.mediaUrls?.[0]
                  ? 'url(' + item.mediaUrls[0] + ') center/cover'
                  : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
              "
              style="height: 130px;"
            ></div>
            <h6 class="fw-bold fs-6 mb-1 text-truncate">{{ item.name }}</h6>
            <p
              class="small text-secondary mb-0"
              style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;"
            >
              {{ item.description }}
            </p>
          </div>

          <ng-container *ngIf="isLoadingSpecialties">
            <div
              style="min-width: 220px; max-width: 220px;"
              *ngFor="let i of [1, 2]"
              class="placeholder-glow"
            >
              <div class="rounded-4 mb-2 placeholder w-100" style="height: 130px;"></div>
              <h6 class="fw-bold fs-6 mb-1"><span class="placeholder col-7 rounded"></span></h6>
              <p class="small mb-0">
                <span class="placeholder col-12 rounded"></span>
                <span class="placeholder col-8 rounded"></span>
              </p>
            </div>
          </ng-container>

          <div
            *ngIf="!isLoadingSpecialties && (!specialties || specialties.length === 0)"
            class="text-secondary small d-flex align-items-center justify-content-center w-100"
            style="height: 130px;"
          >
            No local specialties found here.
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .max-w-desktop {
        max-width: 800px;
      }
    `,
  ],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private langService = inject(LanguageService);
  private locationService = inject(LocationService);
  private ui = inject(UiService);
  private apiService = inject(ApiService);
  private bookmarkService = inject(BookmarkService);
  private authService = inject(AuthService);
  private swiggyService = inject(SwiggyService);
  private cdr = inject(ChangeDetectorRef);

  get labels() {
    return this.langService.labels;
  }
  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }
  currentRadius = '2 km';

  weather: any = null;
  specialties: any[] = [];
  highlights: any[] = [];
  location: any = null;
  insightText: string | null = null;
  isLoadingHighlights = true;
  isLoadingSpecialties = true;
  isSwiggyConnected: boolean | null = null;
  isConnectingSwiggy = false;

  get dynamicGreetingKey(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'GREETING_MORNING';
    if (hour < 17) return 'GREETING_AFTERNOON';
    return 'GREETING_EVENING';
  }

  get getWeatherHeroSubtitle(): string {
    return '';
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
      this.highlightScroll.nativeElement.addEventListener('wheel', this.wheelHandler, {
        passive: false,
      });
    }
    if (this.foodScroll?.nativeElement) {
      this.foodScroll.nativeElement.addEventListener('wheel', this.wheelHandler, {
        passive: false,
      });
    }

    // Initial fetch if we already have location, otherwise request it automatically
    const coords = this.locationService.coords();
    if (coords) {
      this.fetchDynamicData(coords.lat, coords.lng);
    } else {
      this.requestLocation();
    }

    if (this.isLoggedIn) {
      this.checkSwiggyStatus();
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

  onRadiusChange(event: Event) {
    this.currentRadius = (event.target as HTMLSelectElement).value;
    const coords = this.locationService.coords();
    if (coords) {
      this.fetchHighlights(coords.lat, coords.lng);
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

  async checkSwiggyStatus() {
    try {
      const res = await this.swiggyService.checkStatus();
      this.isSwiggyConnected = res && res.status === 'CONNECTED';
      this.cdr.detectChanges();
    } catch (e) {
      console.error('Failed to check swiggy status', e);
    }
  }

  async connectSwiggy() {
    this.isConnectingSwiggy = true;
    try {
      const res = await this.swiggyService.authorize();
      if (res && res.authorizationUrl) {
        window.open(res.authorizationUrl, '_blank');
        this.isConnectingSwiggy = false;
        this.cdr.detectChanges();
      }
    } catch (e) {
      console.error('Failed to authorize swiggy', e);
      this.isConnectingSwiggy = false;
      this.cdr.detectChanges();
    }
  }

  async fetchDynamicData(lat: number, lng: number) {
    this.isLoadingSpecialties = true;
    try {
      const res = await this.apiService.get<any>(
        `/api/v1/weather?latitude=${lat}&longitude=${lng}`,
      );
      if (res && res.current) {
        this.weather = {
          temperature: Math.round(res.current.temperature),
          condition: res.current.description,
          aqi: res.current.aqi || 45, // Placeholder for AQI until added to backend
          humidity: Math.round(res.current.humidity),
          windSpeed: Math.round(res.current.windSpeed),
        };
      } else {
        this.weather = res;
      }
      this.cdr.detectChanges();
    } catch (e) {
      console.error('Failed to fetch weather', e);
      this.weather = null;
    }

    try {
      const res = await this.apiService.get<any>(
        `/api/v1/specialties?latitude=${lat}&longitude=${lng}`,
      );
      this.specialties = res?.documents || [];
    } catch (e) {
      console.error('Failed to fetch specialties', e);
      this.specialties = [];
    } finally {
      this.isLoadingSpecialties = false;
      this.cdr.detectChanges();
    }

    await this.fetchHighlights(lat, lng);

    this.insightText = null;
    this.cdr.detectChanges();
    try {
      const insightRes = await this.apiService.post<any>('/api/v1/insights/generate', {
        weatherData: this.weather,
        placesData: this.highlights,
        swiggyData: this.specialties,
      });
      this.insightText = insightRes?.insight || null;
    } catch (e) {
      console.error('Failed to fetch AI insights', e);
      this.insightText = null;
    } finally {
      this.cdr.detectChanges();
    }
  }

  async fetchHighlights(lat: number, lng: number) {
    this.isLoadingHighlights = true;
    try {
      const radiusMeters = parseInt(this.currentRadius) * 1000;
      const res = await this.apiService.get<any>(
        `/api/v1/providers/places/nearby?latitude=${lat}&longitude=${lng}&radius=${radiusMeters}`,
      );
      this.highlights = res?.places || [];
      if (this.highlights.length > 0) {
        this.location = {
          name: this.highlights[0]?.address?.split(',')[0] || 'Your Location',
          city: this.highlights[0]?.address || 'Unknown City',
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

  getDirectionsUrl(place: any): string {
    const coords = this.locationService.coords();
    if (!coords || !place.location) return '#';
    return `https://www.google.com/maps/dir/?api=1&origin=${coords.lat},${coords.lng}&destination=${place.location.latitude},${place.location.longitude}`;
  }

  isSaved(place: any): boolean {
    return this.bookmarkService.isBookmarked(place.placeId);
  }

  toggleBookmark(place: any) {
    this.bookmarkService.toggleBookmark(place);
  }
}
