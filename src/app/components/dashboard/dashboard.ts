import { Component, OnInit, inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherWidgetComponent } from '../weather-widget/weather-widget';
import { PlacesExplorerComponent } from '../places-explorer/places-explorer';
import { SpecialtiesListComponent } from '../specialties-list/specialties-list';
import { SwiggyPanelComponent } from '../swiggy-panel/swiggy-panel';
import { LanguageService } from '../../services/language';
import { ForYouComponent } from '../for-you/for-you';
import { LocationService } from '../../services/location';
import { UiService } from '../../services/ui';
import gsap from 'gsap';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    WeatherWidgetComponent, 
    PlacesExplorerComponent, 
    SpecialtiesListComponent, 
    SwiggyPanelComponent,
    ForYouComponent
  ],
  template: `
    <div class="dashboard-container container py-5" #dashboardContainer>
      <!-- Header -->
      <header class="mb-5 d-flex justify-content-between align-items-center gs-reveal">
        <div>
          <h1 class="display-5 fw-bold mb-0 text-dark">Good {{ getTimeOfDay() }}!</h1>
          <p class="text-muted fs-5 mb-0">Discover what's near you.</p>
        </div>
        <button class="btn btn-link text-secondary p-0 border-0 shadow-none text-decoration-none" (click)="requestLocation()" aria-label="Refresh Location">
          <i class="bi bi-geo-alt" style="font-size: 1.25rem; transition: color 0.2s;" onmouseover="this.classList.add('text-dark'); this.classList.remove('text-secondary')" onmouseout="this.classList.add('text-secondary'); this.classList.remove('text-dark')"></i>
        </button>
      </header>

      <!-- For You Section -->
      <app-for-you [state]="aggregatedState" class="gs-reveal d-block"></app-for-you>

      <!-- Main Layout -->
      <div class="row g-4 mt-2">
        <div class="col-12 col-lg-8 gs-reveal">
          <app-weather-widget [location]="location.coords()" (dataLoaded)="onDataLoaded('weather', $event)"></app-weather-widget>
          <div class="mt-4">
            <app-places-explorer [location]="location.coords()" (dataLoaded)="onDataLoaded('places', $event)"></app-places-explorer>
          </div>
          <div class="mt-4">
            <app-specialties-list></app-specialties-list>
          </div>
        </div>
        <div class="col-12 col-lg-4 gs-reveal">
          <app-swiggy-panel [location]="location.coords()" (dataLoaded)="onDataLoaded('swiggy', $event)"></app-swiggy-panel>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
    }
    .text-accent {
      color: var(--accent-color);
    }
    h1 {
      letter-spacing: -1px;
    }
    .gs-reveal {
      opacity: 0;
      transform: translateY(30px);
    }
  `]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  location = inject(LocationService);
  private ui = inject(UiService);
  private languageService = inject(LanguageService);

  get labels() {
    return this.languageService.labels;
  }
  
  @ViewChild('dashboardContainer') container!: ElementRef;

  aggregatedState: { weather: any; places: any; swiggy: any } = {
    weather: null,
    places: null,
    swiggy: null
  };

  async ngOnInit() {
    // Try to get location automatically
    try {
      await this.location.requestLocation();
    } catch (e) {
      this.ui.showToast(this.labels.TOAST.LOCATION_FAILED, 'error');
    }
  }

  ngAfterViewInit() {
    // Subtle GSAP staggered reveal
    gsap.to('.gs-reveal', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.1
    });
  }

  async requestLocation() {
    try {
      this.ui.showLoader();
      await this.location.requestLocation();
      this.ui.showToast(this.labels.TOAST.LOCATION_UPDATED, 'success');
    } catch (e) {
      this.ui.showToast(this.labels.TOAST.LOCATION_FAILED, 'error');
    } finally {
      this.ui.hideLoader();
    }
  }

  getTimeOfDay(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 18) return 'Afternoon';
    return 'Evening';
  }

  onDataLoaded(source: 'weather' | 'places' | 'swiggy', data: any) {
    this.aggregatedState = {
      ...this.aggregatedState,
      [source]: data
    };
  }
}
