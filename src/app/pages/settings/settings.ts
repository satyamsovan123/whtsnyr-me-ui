import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService, Theme } from '../../services/theme';
import { LanguageService } from '../../services/language';
import { UiService } from '../../services/ui';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { SUPPORTED_LANGUAGES, PREFERRED_RADIUSES, TEMPERATURE_UNITS, THEMES, LOCATION_OPTIONS } from '../../constants/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-container bg-white min-vh-100 fade-in max-w-desktop mx-auto position-relative d-flex flex-column">
      
      <!-- Profile Header -->
      <div class="p-4 d-flex align-items-center border-bottom border-light">
        <div class="rounded-circle bg-light border d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width: 60px; height: 60px; border-color: #dee2e6 !important;">
          <i *ngIf="!currentUser" class="bi bi-person text-secondary fs-3"></i>
          <span *ngIf="currentUser" class="fs-4 fw-medium text-secondary">{{ currentUser.displayName?.charAt(0)?.toUpperCase() || 'U' }}</span>
        </div>
        <div class="flex-grow-1" *ngIf="!currentUser">
          <h2 class="fw-bold fs-5 mb-0 text-dark">Guest User</h2>
          <p class="small text-secondary mb-0">Sign in to sync your preferences</p>
          <a routerLink="/account" class="btn btn-sm btn-outline-dark rounded-pill mt-2 px-3 py-1 fw-bold">Sign In</a>
        </div>
        <div class="flex-grow-1" *ngIf="currentUser">
          <h2 class="fw-bold fs-5 mb-0 text-dark">{{ currentUser.displayName }}</h2>
          <p class="small text-secondary mb-0">{{ currentUser.email }}</p>
        </div>
        <button *ngIf="currentUser" (click)="logout()" class="btn btn-link text-secondary p-0 border-0 shadow-none text-decoration-none flex-shrink-0 ms-2" [title]="labels.SETTINGS.LOGOUT">
          <i class="bi bi-box-arrow-right" style="font-size: 1.5rem; transition: color 0.2s;" onmouseover="this.classList.add('text-dark'); this.classList.remove('text-secondary')" onmouseout="this.classList.add('text-secondary'); this.classList.remove('text-dark')"></i>
        </button>
      </div>

      <!-- Settings List -->
      <div class="list-group list-group-flush pt-2">
        
        <div class="list-group-item border-0 px-4 py-3 d-flex justify-content-between align-items-center bg-white">
          <span class="text-dark">{{ labels.SETTINGS.PREFERRED_RADIUS }}</span>
          <div class="position-relative d-inline-block">
            <span class="text-secondary small d-flex align-items-center">{{ currentRadius }} <i class="bi bi-chevron-right ms-2 opacity-50"></i></span>
            <select class="position-absolute top-0 start-0 w-100 h-100 opacity-0" style="cursor: pointer;" (change)="currentRadius = $any($event.target).value">
              <option *ngFor="let r of preferredRadiuses" [value]="r" [selected]="currentRadius === r">{{ r }}</option>
            </select>
          </div>
        </div>

        <div class="list-group-item border-0 px-4 py-3 d-flex justify-content-between align-items-center bg-white">
          <span class="text-dark">{{ labels.SETTINGS.TEMPERATURE_UNITS }}</span>
          <div class="position-relative d-inline-block">
            <span class="text-secondary small d-flex align-items-center">{{ currentTemp }} <i class="bi bi-chevron-right ms-2 opacity-50"></i></span>
            <select class="position-absolute top-0 start-0 w-100 h-100 opacity-0" style="cursor: pointer;" (change)="currentTemp = $any($event.target).value">
              <option *ngFor="let t of temperatureUnits" [value]="t.value" [selected]="currentTemp === t.value">{{ labels.SETTINGS[t.labelKey] }}</option>
            </select>
          </div>
        </div>

        <div class="list-group-item border-0 px-4 py-3 d-flex justify-content-between align-items-center bg-white">
          <span class="text-dark">{{ labels.SETTINGS.THEME }}</span>
          <div class="position-relative d-inline-block">
            <span class="text-secondary small d-flex align-items-center text-capitalize">{{ currentThemeName }} <i class="bi bi-chevron-right ms-2 opacity-50"></i></span>
            <select class="position-absolute top-0 start-0 w-100 h-100 opacity-0" style="cursor: pointer;" (change)="onThemeChange($event)">
              <option *ngFor="let theme of themes" [value]="theme.value" [selected]="currentTheme === theme.value">{{ labels.SETTINGS[theme.labelKey] }}</option>
            </select>
          </div>
        </div>

        <div class="list-group-item border-0 px-4 py-3 d-flex justify-content-between align-items-center bg-white">
          <span class="text-dark">{{ labels.SETTINGS.LANGUAGE }}</span>
          <div class="position-relative d-inline-block">
            <span class="text-secondary small d-flex align-items-center">{{ currentLangName }} <i class="bi bi-chevron-right ms-2 opacity-50"></i></span>
            <select class="position-absolute top-0 start-0 w-100 h-100 opacity-0" style="cursor: pointer;" (change)="onLanguageChange($event)">
              <option *ngFor="let lang of supportedLanguages" [value]="lang.code" [selected]="currentLangCode === lang.code">{{ lang.name }}</option>
            </select>
          </div>
        </div>
        
        <div class="px-4 py-2 mt-2"></div> <!-- Spacer -->

        <div class="list-group-item border-0 px-4 py-3 d-flex justify-content-between align-items-center bg-white">
          <span class="text-dark">{{ labels.SETTINGS.LOCATION }}</span>
          <div class="position-relative d-inline-block">
            <span class="text-secondary small d-flex align-items-center">{{ currentLocationName }} <i class="bi bi-chevron-right ms-2 opacity-50"></i></span>
            <select class="position-absolute top-0 start-0 w-100 h-100 opacity-0" style="cursor: pointer;" (change)="currentLocation = $any($event.target).value">
              <option *ngFor="let loc of locationOptions" [value]="loc.value" [selected]="currentLocation === loc.value">{{ labels.SETTINGS[loc.labelKey] }}</option>
            </select>
          </div>
        </div>

        <button class="list-group-item list-group-item-action border-0 px-4 py-3 d-flex justify-content-between align-items-center bg-white position-relative z-1">
          <span class="text-dark">{{ labels.SETTINGS.SWIGGY }}</span>
          <span class="text-secondary small fw-medium d-flex align-items-center">Connect <i class="bi bi-plus ms-1 opacity-50"></i></span>
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
          {{ labels.SETTINGS.LEGAL_DISCLAIMERS[0] }}
          <br><br>
          {{ labels.SETTINGS.LEGAL_DISCLAIMERS[1] }}
          <br><br>
          {{ labels.SETTINGS.LEGAL_DISCLAIMERS[2] }}
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
      min-height: 100vh;
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
  private langService = inject(LanguageService);
  private ui = inject(UiService);
  private authService = inject(AuthService);
  private router = inject(Router);

  get labels() { return this.langService.labels; }
  get currentUser() { return this.authService.currentUser; }

  public supportedLanguages = SUPPORTED_LANGUAGES;
  public preferredRadiuses = PREFERRED_RADIUSES;
  public temperatureUnits = TEMPERATURE_UNITS;
  public themes = THEMES;
  public locationOptions = LOCATION_OPTIONS;

  get currentRadius() {
    return this.currentUser?.preferences?.radius || '2 km';
  }
  
  set currentRadius(val: string) {
    this.authService.updatePreferences({ radius: val });
  }

  get currentTemp() {
    return this.currentUser?.preferences?.temperatureUnit || 'C';
  }
  
  set currentTemp(val: string) {
    this.authService.updatePreferences({ temperatureUnit: val });
  }

  currentLocation = 'Always';

  get currentTheme(): string {
    return this.themeService.getTheme();
  }

  get currentThemeName(): string {
    const t = this.themes.find(x => x.value === this.currentTheme);
    return t ? this.labels.SETTINGS[t.labelKey] : this.currentTheme;
  }

  get currentLocationName(): string {
    const l = this.locationOptions.find(x => x.value === this.currentLocation);
    return l ? this.labels.SETTINGS[l.labelKey] : this.currentLocation;
  }

  get currentLangCode(): string {
    return this.langService.currentLang;
  }
  
  get currentLangName(): string {
    const lang = this.supportedLanguages.find(l => l.code === this.currentLangCode);
    return lang ? lang.name : 'English';
  }

  onThemeChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.themeService.setTheme(val as Theme);
    this.authService.updatePreferences({ theme: val });
  }

  onLanguageChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.langService.setLanguage(val);
    this.authService.updatePreferences({ language: val });
  }

  logout() {
    this.authService.logout();
    this.ui.showToast('Logged out successfully', 'success');
  }
}
