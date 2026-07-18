import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LABELS } from '../../constants/labels';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container p-3 p-md-4 max-w-desktop mx-auto fade-in">
      
      <!-- Header -->
      <header class="d-flex justify-content-between align-items-start mb-3">
        <div>
          <p class="text-secondary small mb-1">{{ labels.HOME.GREETING }}</p>
          <h1 class="fw-bold fs-4 mb-0 d-flex align-items-center">
            Bandra West
          </h1>
          <p class="text-secondary small mt-1"><i class="bi bi-geo-alt-fill"></i> Mumbai, India</p>
        </div>
        <button (click)="requestLocation()" class="btn btn-light rounded-circle shadow-sm border d-flex align-items-center justify-content-center flex-shrink-0" style="width: 44px; height: 44px;">
          <i class="bi bi-geo-alt"></i>
        </button>
      </header>

      <!-- Weather Hero Card -->
      <div class="min-card mb-4 border-0 position-relative" style="background-image: url('https://images.unsplash.com/photo-1570168007204-dfb528c6858f?q=80&w=1000&auto=format&fit=crop'); background-size: cover; background-position: center; height: 200px; border-radius: 20px;">
        <div class="position-absolute bottom-0 start-0 w-100 p-3 p-md-4" style="background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);">
          <h3 class="text-white fw-bold mb-1 fs-5">{{ labels.HOME.WEATHER_HERO_TITLE }}</h3>
          <p class="text-white opacity-75 mb-0 small">{{ labels.HOME.WEATHER_HERO_SUBTITLE }}</p>
        </div>
      </div>

      <!-- Weather Stats Row -->
      <div class="d-flex justify-content-between align-items-center mb-4 px-2">
        <div class="text-center">
          <h4 class="fw-bold mb-0">28°</h4>
          <p class="small text-secondary mb-0">{{ labels.HOME.SUNNY }}</p>
        </div>
        <div class="text-center">
          <h4 class="fw-bold mb-0">42</h4>
          <p class="small text-secondary mb-0">{{ labels.HOME.GOOD }}</p>
        </div>
        <div class="text-center">
          <h4 class="fw-bold mb-0">62%</h4>
          <p class="small text-secondary mb-0">{{ labels.HOME.HUMIDITY }}</p>
        </div>
        <div class="text-center">
          <h4 class="fw-bold mb-0">12</h4>
          <p class="small text-secondary mb-0">{{ labels.HOME.KM_H }}</p>
        </div>
      </div>

      <!-- Nearby highlights -->
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
      
      <div class="d-flex overflow-auto no-scrollbar gap-3 pb-2 mb-4">
        <!-- Highlight Card 1 -->
        <div style="min-width: 150px;">
          <div class="rounded-4 mb-2 bg-secondary" style="height: 110px; background-image: url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=400&auto=format&fit=crop'); background-size: cover;"></div>
          <h6 class="fw-bold fs-6 mb-1 text-truncate">Bandra Fort</h6>
          <p class="small text-secondary mb-0 text-truncate">1.1 km • <i class="bi bi-star-fill text-warning"></i> 4.6 • <span class="text-success">Open</span></p>
        </div>
        
        <!-- Highlight Card 2 -->
        <div style="min-width: 150px;">
          <div class="rounded-4 mb-2 bg-secondary" style="height: 110px; background-image: url('https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=400&auto=format&fit=crop'); background-size: cover;"></div>
          <h6 class="fw-bold fs-6 mb-1 text-truncate">Mount Mary</h6>
          <p class="small text-secondary mb-0 text-truncate">1.3 km • <i class="bi bi-star-fill text-warning"></i> 4.7 • <span class="text-success">Open</span></p>
        </div>

        <!-- Highlight Card 3 -->
        <div style="min-width: 150px;">
          <div class="rounded-4 mb-2 bg-secondary" style="height: 110px; background-image: url('https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=400&auto=format&fit=crop'); background-size: cover;"></div>
          <h6 class="fw-bold fs-6 mb-1 text-truncate">Joggers' Park</h6>
          <p class="small text-secondary mb-0 text-truncate">1.6 km • <i class="bi bi-star-fill text-warning"></i> 4.5 • <span class="text-success">Open</span></p>
        </div>
      </div>

      <!-- Local specialities -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="fw-bold mb-0">{{ labels.HOME.LOCAL_SPECIALITIES }}</h5>
      </div>

      <div class="d-flex overflow-auto no-scrollbar gap-3 pb-2 mb-4">
        <!-- Food Card 1 -->
        <div style="min-width: 220px; max-width: 220px;">
          <div class="rounded-4 mb-2 bg-secondary" style="height: 130px; background-image: url('https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=400&auto=format&fit=crop'); background-size: cover;"></div>
          <h6 class="fw-bold fs-6 mb-1 text-truncate">Vada Pav</h6>
          <p class="small text-secondary mb-0" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Mumbai's iconic street snack that never gets old.</p>
        </div>

        <!-- Food Card 2 -->
        <div style="min-width: 220px; max-width: 220px;">
          <div class="rounded-4 mb-2 bg-secondary" style="height: 130px; background-image: url('https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=400&auto=format&fit=crop'); background-size: cover;"></div>
          <h6 class="fw-bold fs-6 mb-1 text-truncate">Pav Bhaji</h6>
          <p class="small text-secondary mb-0" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">A buttery, spicy classic loved by all Mumbaikars.</p>
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
export class HomeComponent {
  public labels = LABELS;
  currentRadius = '2 km';

  requestLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location access granted:', position.coords.latitude, position.coords.longitude);
          // TODO: Reverse geocode to update the "Bandra West" title dynamically
          alert('Location updated successfully!');
        },
        (error) => {
          console.error('Location error:', error);
          alert('Unable to retrieve your location. Please check your permissions.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }
}
