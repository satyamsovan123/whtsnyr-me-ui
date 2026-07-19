import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="page-container bg-white min-vh-100 d-flex flex-column align-items-center justify-content-center mx-auto position-relative p-4 fade-in max-w-desktop">
      <div class="w-100" style="max-width: 400px; animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);">
        <!-- Logo Header -->
        <div class="text-center mb-5">
          <div class="d-flex justify-content-center mb-3">
            <div style="width: 48px; height: 48px;" class="text-dark">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" width="100%" height="100%">
                <g stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none">
                  <path d="M 23,48 A 27 27 0 1 1 77,48 C 77,70 60,70 60,85" />
                  <circle cx="50" cy="104" r="5.5" />
                </g>
                <g fill="currentColor">
                  <circle cx="30" cy="62" r="3.5" />
                  <circle cx="36" cy="74" r="3.5" />
                  <circle cx="42" cy="84" r="3.5" />
                  <circle cx="47" cy="93" r="3.5" />
                </g>
              </svg>
            </div>
          </div>
          <h1 class="fw-bold fs-3 mb-1">{{ isLogin ? labels.AUTH.WELCOME_BACK : labels.AUTH.CREATE_ACCOUNT }}</h1>
          <p class="text-secondary small">{{ isLogin ? labels.AUTH.SIGN_IN_SUBTITLE : labels.AUTH.SIGN_UP_SUBTITLE }}</p>
        </div>

        <!-- Form -->
        <form (ngSubmit)="onSubmit($event)">
          <div class="mb-3" *ngIf="!isLogin" style="animation: fadeIn 0.4s ease-out;">
            <input type="text" class="form-control bg-light" id="nameInput" [placeholder]="labels.AUTH.FULL_NAME" [(ngModel)]="name" name="name" required>
          </div>
          
          <div class="mb-3">
            <input type="email" class="form-control bg-light" id="emailInput" [placeholder]="labels.AUTH.EMAIL_ADDRESS" [(ngModel)]="email" name="email" required>
          </div>
          
          <div class="mb-4">
            <input type="password" class="form-control bg-light" id="passwordInput" [placeholder]="labels.AUTH.PASSWORD" [(ngModel)]="password" name="password" required>
          </div>

          <div *ngIf="errorMessage" class="text-danger small mb-3 text-center">{{ errorMessage }}</div>

          <button type="submit" class="btn btn-dark w-100 py-3 rounded-pill fw-bold mb-3 shadow-sm" style="font-size: 1.1rem;" [disabled]="isLoading">
            <span *ngIf="!isLoading">{{ isLogin ? labels.AUTH.SIGN_IN : labels.AUTH.SIGN_UP }}</span>
            <span *ngIf="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          </button>
        </form>

        <!-- Toggle View -->
        <div class="text-center mt-4">
          <p class="text-secondary small mb-0">
            {{ isLogin ? labels.AUTH.DONT_HAVE_ACCOUNT : labels.AUTH.ALREADY_HAVE_ACCOUNT }}
            <a href="#" (click)="toggleView($event)" class="text-dark fw-bold text-decoration-none ms-1">
              {{ isLogin ? labels.AUTH.SIGN_UP : labels.AUTH.SIGN_IN }}
            </a>
          </p>
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
    .form-control:focus {
      box-shadow: none;
      border-color: var(--text-primary);
      background-color: var(--card-bg) !important;
    }
    .form-control {
      padding-left: 1rem;
      transition: background-color 0.2s, border-color 0.2s;
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class AuthComponent {
  isLogin = true;
  isLoading = false;
  errorMessage = '';
  
  email = '';
  password = '';
  name = '';

  private langService = inject(LanguageService);
  private authService = inject(AuthService);
  get labels() { return this.langService.labels; }

  constructor(private router: Router) {}

  toggleView(event: Event) {
    event.preventDefault();
    this.isLogin = !this.isLogin;
    this.errorMessage = '';
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    this.errorMessage = '';
    
    if (!this.email || !this.password || (!this.isLogin && !this.name)) {
      this.errorMessage = 'Please fill all fields';
      return;
    }

    this.isLoading = true;
    try {
      if (this.isLogin) {
        await this.authService.login({ email: this.email, password: this.password });
      } else {
        await this.authService.register({ email: this.email, password: this.password, displayName: this.name });
      }
      this.router.navigate(['/home']);
    } catch (e: any) {
      this.errorMessage = e.message || 'Authentication failed';
    } finally {
      this.isLoading = false;
    }
  }
}
