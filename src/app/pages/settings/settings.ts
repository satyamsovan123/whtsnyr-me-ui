import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService, Theme } from '../../services/theme';
import { LABELS } from '../../constants/labels';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-container bg-white min-vh-100 fade-in max-w-desktop mx-auto position-relative d-flex flex-column">
      
      <!-- Profile Header -->
      <div class="p-4 d-flex align-items-center border-bottom border-light">
        <div class="rounded-circle bg-secondary d-flex align-items-center justify-content-center me-3" style="width: 60px; height: 60px;">
          <img src="https://ui-avatars.com/api/?name=Arjun+Mehta&background=random" class="w-100 h-100 rounded-circle" alt="Arjun">
        </div>
        <div>
          <h2 class="fw-bold fs-5 mb-0 text-dark">Arjun Mehta</h2>
          <p class="small text-secondary mb-0">arjun.mehta@gmail.com</p>
        </div>
      </div>

      <!-- Settings List -->
      <div class="list-group list-group-flush pt-2">
        
        <div class="list-group-item border-0 px-4 py-3 d-flex justify-content-between align-items-center bg-white">
          <span class="text-dark">{{ labels.SETTINGS.PREFERRED_RADIUS }}</span>
          <div class="position-relative d-inline-block">
            <span class="text-secondary small d-flex align-items-center">{{ currentRadius }} <i class="bi bi-chevron-right ms-2 opacity-50"></i></span>
            <select class="position-absolute top-0 start-0 w-100 h-100 opacity-0" style="cursor: pointer;" (change)="currentRadius = $any($event.target).value">
              <option value="1 km" [selected]="currentRadius === '1 km'">1 km</option>
              <option value="2 km" [selected]="currentRadius === '2 km'">2 km</option>
              <option value="5 km" [selected]="currentRadius === '5 km'">5 km</option>
              <option value="10 km" [selected]="currentRadius === '10 km'">10 km</option>
            </select>
          </div>
        </div>

        <div class="list-group-item border-0 px-4 py-3 d-flex justify-content-between align-items-center bg-white">
          <span class="text-dark">{{ labels.SETTINGS.TEMPERATURE_UNITS }}</span>
          <div class="position-relative d-inline-block">
            <span class="text-secondary small d-flex align-items-center">{{ currentTemp }} <i class="bi bi-chevron-right ms-2 opacity-50"></i></span>
            <select class="position-absolute top-0 start-0 w-100 h-100 opacity-0" style="cursor: pointer;" (change)="currentTemp = $any($event.target).value">
              <option value="°C" [selected]="currentTemp === '°C'">Celsius (°C)</option>
              <option value="°F" [selected]="currentTemp === '°F'">Fahrenheit (°F)</option>
            </select>
          </div>
        </div>

        <div class="list-group-item border-0 px-4 py-3 d-flex justify-content-between align-items-center bg-white">
          <span class="text-dark">{{ labels.SETTINGS.THEME }}</span>
          <div class="position-relative d-inline-block">
            <span class="text-secondary small d-flex align-items-center text-capitalize">{{ currentTheme }} <i class="bi bi-chevron-right ms-2 opacity-50"></i></span>
            <select class="position-absolute top-0 start-0 w-100 h-100 opacity-0" style="cursor: pointer;" (change)="onThemeChange($event)">
              <option value="light" [selected]="currentTheme === 'light'">Light</option>
              <option value="dark" [selected]="currentTheme === 'dark'">Dark</option>
              <option value="system" [selected]="currentTheme === 'system'">System</option>
            </select>
          </div>
        </div>

        <div class="list-group-item border-0 px-4 py-3 d-flex justify-content-between align-items-center bg-white">
          <span class="text-dark">{{ labels.SETTINGS.LANGUAGE }}</span>
          <div class="position-relative d-inline-block">
            <span class="text-secondary small d-flex align-items-center">{{ currentLang }} <i class="bi bi-chevron-right ms-2 opacity-50"></i></span>
            <select class="position-absolute top-0 start-0 w-100 h-100 opacity-0" style="cursor: pointer;" (change)="currentLang = $any($event.target).value">
              <option value="English" [selected]="currentLang === 'English'">English</option>
              <option value="Hindi" [selected]="currentLang === 'Hindi'">Hindi</option>
              <option value="Odia" [selected]="currentLang === 'Odia'">Odia</option>
            </select>
          </div>
        </div>
        
        <div class="px-4 py-2 mt-2"></div> <!-- Spacer -->

        <div class="list-group-item border-0 px-4 py-3 d-flex justify-content-between align-items-center bg-white">
          <span class="text-dark">{{ labels.SETTINGS.LOCATION }}</span>
          <div class="position-relative d-inline-block">
            <span class="text-secondary small d-flex align-items-center">{{ currentLocation }} <i class="bi bi-chevron-right ms-2 opacity-50"></i></span>
            <select class="position-absolute top-0 start-0 w-100 h-100 opacity-0" style="cursor: pointer;" (change)="currentLocation = $any($event.target).value">
              <option value="Always" [selected]="currentLocation === 'Always'">Always</option>
              <option value="While using" [selected]="currentLocation === 'While using'">While using the app</option>
              <option value="Never" [selected]="currentLocation === 'Never'">Never</option>
            </select>
          </div>
        </div>

        <button class="list-group-item list-group-item-action border-0 px-4 py-3 d-flex justify-content-between align-items-center bg-white position-relative z-1">
          <span class="text-dark">{{ labels.SETTINGS.SWIGGY }}</span>
          <span class="text-success small fw-medium d-flex align-items-center">{{ labels.SETTINGS.CONNECTED }} <i class="bi bi-chevron-right text-secondary ms-2 opacity-50"></i></span>
        </button>

        <div class="px-4 py-2 mt-2"></div> <!-- Spacer -->

        <button class="list-group-item list-group-item-action border-0 px-4 py-3 d-flex justify-content-between align-items-center bg-white position-relative z-1">
          <span class="text-dark">{{ labels.SETTINGS.ORDER_HISTORY }}</span>
          <span class="text-secondary small d-flex align-items-center"><i class="bi bi-chevron-right ms-2 opacity-50"></i></span>
        </button>
      </div>

      <!-- Settings Footer -->
      <div class="mt-auto border-top border-light" style="padding: 60px 24px 100px; margin-top: 40px !important;">
        <div class="legal-text mb-4">
          {{ labels.SETTINGS.LEGAL_DISCLAIMER_1 }}
          <br><br>
          {{ labels.SETTINGS.LEGAL_DISCLAIMER_2 }}
          <br><br>
          {{ labels.SETTINGS.LEGAL_DISCLAIMER_3 }}
        </div>

        <div class="d-flex flex-wrap gap-3 mb-4 mt-5">
          <a routerLink="/about" class="text-secondary text-decoration-none">{{ labels.SETTINGS.ABOUT }}</a>
          <a routerLink="/privacy-policy" class="text-secondary text-decoration-none">{{ labels.SETTINGS.PRIVACY_POLICY }}</a>
        </div>
        
        <div class="d-flex justify-content-between align-items-center">
          <p class="text-secondary mb-0">{{ labels.COMMON.COPYRIGHT }}</p>
          <span class="text-secondary d-flex align-items-center">
            <img src="https://flagcdn.com/w20/in.png" width="16" alt="India" class="me-2" style="border-radius: 2px;">
            {{ labels.COMMON.REGION }}
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      background-color: var(--bg-color);
    }
    .max-w-desktop {
      max-width: 800px;
    }
    .list-group-item:active {
      background-color: var(--bg-secondary) !important;
    }
  `]
})
export class SettingsComponent {
  private themeService = inject(ThemeService);
  public labels = LABELS;

  // Mock State
  currentRadius = '2 km';
  currentTemp = '°C';
  currentLang = 'English';
  currentLocation = 'Always';
  
  get currentTheme(): string {
    return this.themeService.getTheme();
  }

  onThemeChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.themeService.setTheme(val as Theme);
  }
}
