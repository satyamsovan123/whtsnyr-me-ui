import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiggyService } from '../../services/swiggy';
import { ThemeService, Theme } from '../../services/theme';
import { LanguageService } from '../../services/language';
import { UiService } from '../../services/ui';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import {
  SUPPORTED_LANGUAGES,
  PREFERRED_RADIUSES,
  TEMPERATURE_UNITS,
  THEMES,
  LOCATION_OPTIONS,
} from '../../constants/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div
      class="page-container bg-white min-vh-100 fade-in max-w-desktop mx-auto position-relative d-flex flex-column"
    >
      <!-- Loader -->
      <div
        *ngIf="isInitializing || isUpdating"
        class="d-flex align-items-center justify-content-center flex-grow-1"
        style="min-height: 50vh;"
      >
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- Main Content -->
      <ng-container *ngIf="!isInitializing && !isUpdating">
        <!-- Profile Header -->
        <div class="p-4 d-flex align-items-center border-bottom border-light">
          <div
            class="rounded-circle bg-light border d-flex align-items-center justify-content-center me-3 flex-shrink-0"
            style="width: 60px; height: 60px; border-color: #dee2e6 !important;"
          >
            <i *ngIf="!currentUser" class="bi bi-person text-secondary fs-3"></i>
            <span *ngIf="currentUser" class="fs-4 fw-medium text-secondary">{{
              (currentUser.displayName || 'U').charAt(0).toUpperCase()
            }}</span>
          </div>
          <div class="flex-grow-1" *ngIf="!currentUser">
            <h2 class="fw-bold fs-5 mb-0 text-dark">Guest User</h2>
            <p class="small text-secondary mb-0">Sign in to sync your preferences</p>
          </div>
          <div class="flex-grow-1" *ngIf="currentUser">
            <h2 class="fw-bold fs-5 mb-0 text-dark">{{ currentUser.displayName }}</h2>
            <p class="small text-secondary mb-0">{{ currentUser.email }}</p>
          </div>
          <button
            *ngIf="currentUser"
            (click)="logout()"
            class="btn btn-link text-secondary p-0 border-0 shadow-none text-decoration-none flex-shrink-0 ms-2"
            [title]="labels.SETTINGS.LOGOUT"
          >
            <i
              class="bi bi-box-arrow-right"
              style="font-size: 1.5rem; transition: color 0.2s;"
              onmouseover="this.classList.add('text-dark'); this.classList.remove('text-secondary')"
              onmouseout="this.classList.add('text-secondary'); this.classList.remove('text-dark')"
            ></i>
          </button>
        </div>

        <!-- Settings List -->
        <div class="list-group list-group-flush pt-2">
          <div
            class="list-group-item border-0 px-4 py-3 d-flex justify-content-between align-items-center bg-white"
          >
            <span class="text-dark">{{ labels.SETTINGS.PREFERRED_RADIUS }}</span>
            <div class="position-relative d-inline-block">
              <span class="text-secondary small d-flex align-items-center"
                >{{ currentRadius }} <i class="bi bi-chevron-right ms-2 opacity-50"></i
              ></span>
              <select
                class="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                style="cursor: pointer;"
                (change)="currentRadius = $any($event.target).value"
              >
                <option
                  *ngFor="let r of preferredRadiuses"
                  [value]="r"
                  [selected]="currentRadius === r"
                >
                  {{ r }}
                </option>
              </select>
            </div>
          </div>

          <div
            class="list-group-item border-0 px-4 py-3 d-flex justify-content-between align-items-center bg-white"
          >
            <span class="text-dark">{{ labels.SETTINGS.TEMPERATURE_UNITS }}</span>
            <div class="position-relative d-inline-block">
              <span class="text-secondary small d-flex align-items-center"
                >{{ currentTemp }} <i class="bi bi-chevron-right ms-2 opacity-50"></i
              ></span>
              <select
                class="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                style="cursor: pointer;"
                (change)="currentTemp = $any($event.target).value"
              >
                <option
                  *ngFor="let t of temperatureUnits"
                  [value]="t.value"
                  [selected]="currentTemp === t.value"
                >
                  {{ labels.SETTINGS[t.labelKey] }}
                </option>
              </select>
            </div>
          </div>

          <div
            class="list-group-item border-0 px-4 py-3 d-flex justify-content-between align-items-center bg-white"
          >
            <span class="text-dark">{{ labels.SETTINGS.THEME }}</span>
            <div class="position-relative d-inline-block">
              <span class="text-secondary small d-flex align-items-center text-capitalize"
                >{{ currentThemeName }} <i class="bi bi-chevron-right ms-2 opacity-50"></i
              ></span>
              <select
                class="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                style="cursor: pointer;"
                (change)="onThemeChange($event)"
              >
                <option
                  *ngFor="let theme of themes"
                  [value]="theme.value"
                  [selected]="currentTheme === theme.value"
                >
                  {{ labels.SETTINGS[theme.labelKey] }}
                </option>
              </select>
            </div>
          </div>

          <div
            class="list-group-item border-0 px-4 py-3 d-flex justify-content-between align-items-center bg-white"
          >
            <span class="text-dark">{{ labels.SETTINGS.LANGUAGE }}</span>
            <div class="position-relative d-inline-block">
              <span class="text-secondary small d-flex align-items-center"
                >{{ currentLangName }} <i class="bi bi-chevron-right ms-2 opacity-50"></i
              ></span>
              <select
                class="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                style="cursor: pointer;"
                (change)="onLanguageChange($event)"
              >
                <option
                  *ngFor="let lang of supportedLanguages"
                  [value]="lang.code"
                  [selected]="currentLangCode === lang.code"
                >
                  {{ lang.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="px-4 py-2 mt-2"></div>
          <!-- Spacer -->

          <div
            class="list-group-item border-0 px-4 py-3 d-flex justify-content-between align-items-center bg-white"
          >
            <span class="text-dark">{{ labels.SETTINGS.LOCATION }}</span>
            <div class="position-relative d-inline-block">
              <span class="text-secondary small d-flex align-items-center"
                >{{ currentLocationName }} <i class="bi bi-chevron-right ms-2 opacity-50"></i
              ></span>
              <select
                class="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                style="cursor: pointer;"
                (change)="currentLocation = $any($event.target).value"
              >
                <option
                  *ngFor="let loc of locationOptions"
                  [value]="loc.value"
                  [selected]="currentLocation === loc.value"
                >
                  {{ labels.SETTINGS[loc.labelKey] }}
                </option>
              </select>
            </div>
          </div>

          <ng-container *ngIf="currentUser">
            <button
              (click)="isSwiggyConnected ? disconnectSwiggy() : connectSwiggy()"
              class="list-group-item list-group-item-action border-0 px-4 py-3 d-flex justify-content-between align-items-center bg-white position-relative z-1"
            >
            <span class="text-dark">{{ labels.SETTINGS.SWIGGY }}</span>
            <span
              *ngIf="isSwiggyConnected === true"
              class="text-success small fw-medium d-flex align-items-center"
              >Connected <i class="bi bi-check ms-1 opacity-50"></i
            ></span>
            <span
              *ngIf="isSwiggyConnected === false"
              class="text-secondary small fw-medium d-flex align-items-center"
              >Disconnected <i class="bi bi-link-45deg ms-1 opacity-50"></i
            ></span>
            <span
              *ngIf="isSwiggyConnected === null"
              class="spinner-border spinner-border-sm text-secondary"
              role="status"
            ></span>
          </button>

          <div class="px-4 py-2 mt-2"></div>
          <!-- Spacer -->

          <button
            class="list-group-item list-group-item-action border-0 px-4 py-3 d-flex justify-content-between align-items-center bg-white position-relative z-1"
            (click)="openOrderModal()"
          >
            <span class="text-dark">Swiggy Orders</span>
            <span class="text-secondary small d-flex align-items-center"
              ><i class="bi bi-chevron-right ms-2 opacity-50"></i
            ></span>
            </button>
          </ng-container>
        </div>

        <!-- Order History Modal (Custom) -->
        <div class="order-modal-overlay" *ngIf="isOrderModalOpen" (click)="closeOrderModal($event)">
          <div class="order-modal-content" (click)="$event.stopPropagation()">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="fw-bold mb-0 text-dark">Past Orders</h4>
              <button class="btn btn-close shadow-none" (click)="isOrderModalOpen = false"></button>
            </div>

            <div class="order-list-container overflow-auto" style="max-height: 50vh;">
              <div *ngIf="isLoadingOrders" class="d-flex justify-content-center p-5">
                <div class="spinner-border text-primary" role="status"></div>
              </div>

              <div
                *ngIf="!isLoadingOrders && orders.length === 0"
                class="text-center p-5 text-secondary"
              >
                <i class="bi bi-receipt fs-1 mb-2 opacity-50"></i>
                <p>No orders found here.</p>
              </div>

              <div
                *ngIf="!isLoadingOrders && orders.length > 0"
                class="d-flex flex-column gap-3 pb-3"
              >
                <div
                  *ngFor="let order of orders"
                  class="order-card p-3 rounded-4 border bg-white shadow-sm position-relative"
                >
                  <div class="d-flex justify-content-between align-items-start mb-2">
                    <h6 class="fw-bold mb-0 text-dark text-truncate pe-2">
                      {{
                        order.storeName ||
                          order.restaurantName ||
                          order.restaurant?.name ||
                          'Order #' + (order.orderId || order.order_id || 'Unknown')
                      }}
                    </h6>
                    <span
                      *ngIf="order._type"
                      class="badge rounded-pill fw-normal flex-shrink-0 bg-light text-dark border"
                      style="font-size: 0.7rem;"
                    >
                      {{ order._type === 'Food' ? 'Swiggy Food' : 'Instamart' }}
                    </span>
                  </div>

                  <p
                    class="small text-secondary mb-2"
                    *ngIf="order.items && order.items.length > 0"
                  >
                    <span *ngFor="let item of order.items; let last = last">
                      {{ item.quantity ? item.quantity + 'x ' : '' }}{{ item.name
                      }}<span *ngIf="!last">, </span>
                    </span>
                  </p>
                  <p
                    class="small text-secondary mb-2"
                    *ngIf="order.orderedItems && (!order.items || order.items.length === 0)"
                  >
                    {{ order.orderedItems }}
                  </p>

                  <div
                    class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top border-light"
                  >
                    <div class="d-flex flex-column">
                      <span
                        class="text-secondary small fw-medium"
                        *ngIf="order._displayDate"
                      >
                        {{ order._displayDate }}
                      </span>
                      <span
                        class="badge bg-light text-dark border fw-normal mt-1 align-self-start"
                        style="font-size: 0.7rem;"
                      >
                        {{ order.status || order.order_status || 'Completed' }}
                      </span>
                    </div>
                    <span class="fw-bold text-dark fs-6">
                      ₹{{
                        order._total ||
                          order.billDetails?.grandTotal ||
                          order.totalAmount ||
                          order.order_total ||
                          order.net_total ||
                          order.total ||
                          order.bill_amount ||
                          0
                      }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="text-center mt-2 pb-2">
                <span class="text-secondary small fw-medium" style="font-size: 0.75rem;">To view more, check the Swiggy app.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Settings Footer -->
        <div
          class="mt-auto border-top border-light"
          style="padding: 60px 24px 100px; margin-top: 40px !important;"
        >
          <div class="legal-text mb-4">
            {{ labels.SETTINGS.LEGAL_DISCLAIMERS[0] }}
            <br /><br />
            {{ labels.SETTINGS.LEGAL_DISCLAIMERS[1] }}
            <br /><br />
            {{ labels.SETTINGS.LEGAL_DISCLAIMERS[2] }}
          </div>

          <div class="d-flex flex-wrap gap-3 mb-4 mt-5">
            <a routerLink="/about" class="text-secondary text-decoration-none">{{
              labels.SETTINGS.ABOUT
            }}</a>
            <a routerLink="/privacy-policy" class="text-secondary text-decoration-none">{{
              labels.SETTINGS.PRIVACY_POLICY
            }}</a>
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <p class="text-secondary mb-0">{{ labels.COMMON.COPYRIGHT }}</p>
            <span class="text-secondary d-flex align-items-center">
              <img
                src="https://flagcdn.com/w20/in.png"
                width="16"
                alt="India"
                class="me-2"
                style="border-radius: 2px;"
              />
              {{ labels.COMMON.REGION }}
            </span>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styles: [
    `
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
      .transition-all {
        transition: all 0.2s ease-in-out;
      }
      .order-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(8px);
        z-index: 1050;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.2s ease-out;
        padding: 1rem;
      }
      .order-modal-content {
        background: #fff;
        border-radius: 1.5rem;
        width: 100%;
        max-width: 500px;
        padding: 1.5rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .order-card {
        transition: transform 0.2s;
      }
      .order-card:hover {
        transform: translateY(-2px);
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes scaleUp {
        from {
          opacity: 0;
          transform: scale(0.95) translateY(10px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
    `,
  ],
})
export class SettingsComponent {
  private themeService = inject(ThemeService);
  private langService = inject(LanguageService);
  private ui = inject(UiService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private swiggyService = inject(SwiggyService);
  private cdr = inject(ChangeDetectorRef);

  isSwiggyConnected: boolean | null = null;

  isOrderModalOpen = false;
  isLoadingOrders = false;
  orders: any[] = [];

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.checkSwiggyStatus();
    } else {
      this.isSwiggyConnected = false;
    }
  }

  async checkSwiggyStatus() {
    try {
      const res = await this.swiggyService.checkStatus();
      this.isSwiggyConnected = res && res.status === 'CONNECTED';
      if (res && res.status === 'EXPIRED') {
        this.ui.showToast('Your Swiggy connection has expired. Please connect again.', 'error');
      }
    } catch (e) {
      console.error('Failed to check swiggy status', e);
      this.isSwiggyConnected = false;
    }
    this.cdr.detectChanges();
  }

  async connectSwiggy() {
    try {
      const res = await this.swiggyService.authorize();
      if (res && res.authorizationUrl) {
        window.open(res.authorizationUrl, '_blank');
      }
    } catch (e) {
      console.error('Failed to authorize swiggy', e);
    }
  }

  async disconnectSwiggy() {
    this.ui.showToast('To disconnect, revoke access in your Swiggy app', 'info');
  }

  openOrderModal() {
    if (this.isSwiggyConnected !== true) {
      this.ui.showToast('Connect your Swiggy account first', 'info');
      return;
    }
    this.isOrderModalOpen = true;
    this.loadOrders();
  }

  closeOrderModal(event: Event) {
    if ((event.target as HTMLElement).classList.contains('order-modal-overlay')) {
      this.isOrderModalOpen = false;
    }
  }

  async loadOrders() {
    this.isLoadingOrders = true;
    this.orders = [];
    this.cdr.detectChanges();
    try {
      const [foodRes, imRes] = await Promise.allSettled([
        this.swiggyService.getFoodOrders(),
        this.swiggyService.getInstamartOrders(),
      ]);

      const foodNormalized: any[] = [];
      const imNormalized: any[] = [];

      if (foodRes.status === 'fulfilled') {
        const val = foodRes.value;
        let foodOrders = Array.isArray(val) ? val : [];
        if (!Array.isArray(val) && val) {
          foodOrders = val.orders || (val.data && val.data.orders) || (Array.isArray(val.data) ? val.data : []);
        }
        foodNormalized.push(...foodOrders.slice(0, 3).map((o: any) => ({
          ...o,
          _type: 'Food',
          storeName: o.restaurantName || o.storeName,
          items: o.orderedItems
            ? [{ name: o.orderedItems, quantity: null }]
            : o.items || [],
          _displayDate: this.formatOrderDate(o.orderedTime || o.createdAt || o.order_time),
          status: o.orderStatus || o.status || o.order_status || 'Completed',
          _total: (o.orderTotal || '').replace(/[^\d.]/g, '') || o.billDetails?.grandTotal || o.totalAmount || o.order_total || o.net_total || o.total || o.bill_amount || 0
        })));
      } else {
        console.error('Failed to fetch food orders:', foodRes.reason);
      }

      if (imRes.status === 'fulfilled') {
        const val = imRes.value;
        let imOrders = Array.isArray(val) ? val : [];
        if (!Array.isArray(val) && val) {
          imOrders = val.orders || (val.data && val.data.orders) || (Array.isArray(val.data) ? val.data : []);
        }
        imNormalized.push(...imOrders.slice(0, 3).map((o: any) => ({
          ...o,
          _type: 'Instamart',
          _displayDate: this.formatOrderDate(o.createdAt || o.order_time),
          _total: o.billDetails?.grandTotal || o.totalAmount || o.order_total || o.net_total || o.total || o.bill_amount || 0
        })));
      } else {
        console.error('Failed to fetch instamart orders:', imRes.reason);
      }

      this.orders = [...foodNormalized, ...imNormalized];
    } catch (e: any) {
      console.error('Failed to load orders', e);
      if (e.status === 401) {
        this.ui.showToast('Your session has expired. Please log in again.', 'error');
        this.isOrderModalOpen = false;
      } else if (e.code === 'SWIGGY_REAUTH_REQUIRED') {
        this.ui.showToast('Your Swiggy connection has expired. Please re-connect your account.', 'error');
        this.isSwiggyConnected = false;
        this.isOrderModalOpen = false;
      } else {
        this.ui.showToast(e.message || 'Failed to load order history', 'error');
      }
    } finally {
      this.isLoadingOrders = false;
      this.cdr.detectChanges();
    }
  }

  get labels() {
    return this.langService.labels;
  }
  get currentUser() {
    return this.authService.currentUser;
  }
  get isInitializing() {
    return this.authService.isInitializing;
  }
  get isUpdating() {
    return this.authService.isUpdating;
  }

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
    let t = this.currentUser?.preferences?.temperatureUnit || '°C';
    if (t === 'C' || t === 'F') t = '°' + t;
    return t;
  }

  set currentTemp(val: string) {
    this.authService.updatePreferences({ temperatureUnit: val });
  }

  currentLocation = 'Always';

  get currentTheme(): string {
    return this.themeService.getTheme();
  }

  get currentThemeName(): string {
    const t = this.themes.find((x) => x.value === this.currentTheme);
    return t ? this.labels.SETTINGS[t.labelKey] : this.currentTheme;
  }

  get currentLocationName(): string {
    const l = this.locationOptions.find((x) => x.value === this.currentLocation);
    return l ? this.labels.SETTINGS[l.labelKey] : this.currentLocation;
  }

  get currentLangCode(): string {
    return this.langService.currentLang;
  }

  get currentLangName(): string {
    const lang = this.supportedLanguages.find((l) => l.code === this.currentLangCode);
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

  formatOrderDate(dateStr: string | undefined): string {
    if (!dateStr) return '';
    // Only try to parse ISO-style dates (contain 'T' or start with 4-digit year)
    if (dateStr.includes('T') || /^\d{4}-/.test(dateStr)) {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime()) && d.getFullYear() > 2020) {
        return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
          + ', '
          + d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
      }
    }
    // Already a human-readable string like "July 4, 1:40 PM" — return as-is
    return dateStr;
  }
}
