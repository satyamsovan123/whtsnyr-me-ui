import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Mobile Bottom Navigation -->
    <nav class="d-md-none mobile-nav bg-white shadow-lg" style="border-top: 1px solid rgba(0,0,0,0.05);">
      <div class="d-flex justify-content-around align-items-center h-100 px-2">
        <a routerLink="/home" routerLinkActive="active" class="nav-item">
          <i class="bi bi-house-door-fill"></i>
          <span>{{ labels.NAVBAR.HOME }}</span>
        </a>
        <a routerLink="/ai" routerLinkActive="active" class="nav-item">
          <i class="bi bi-stars" style="font-size: 1.7rem;"></i>
          <span>{{ labels.NAVBAR.AI }}</span>
        </a>
        <a routerLink="/explore" routerLinkActive="active" class="nav-item">
          <i class="bi bi-compass-fill"></i>
          <span>{{ labels.NAVBAR.EXPLORE }}</span>
        </a>
        <a routerLink="/account" routerLinkActive="active" class="nav-item">
          <i class="bi bi-person-fill"></i>
          <span>{{ labels.NAVBAR.SIGN_IN }}</span>
        </a>
        <a routerLink="/settings" routerLinkActive="active" class="nav-item">
          <i class="bi bi-gear-fill"></i>
          <span>{{ labels.NAVBAR.YOU }}</span>
        </a>
      </div>
    </nav>

    <!-- Desktop Sidebar -->
    <aside class="d-none d-md-flex flex-column desktop-sidebar bg-white border-end" [class.collapsed]="sidebarService.isCollapsed()">
      <a routerLink="/about" class="sidebar-header p-4 d-flex align-items-center text-decoration-none text-primary" [class.justify-content-center]="sidebarService.isCollapsed()" style="cursor: pointer;">
        <div style="animation: fadeIn 0.3s; width: 32px; height: 32px; flex-shrink: 0; display: flex; justify-content: center; align-items: center;" class="text-primary" [class.me-3]="!sidebarService.isCollapsed()">
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
        <div *ngIf="!sidebarService.isCollapsed()" style="white-space: nowrap; overflow: hidden; animation: fadeIn 0.3s;">
          <h3 class="fw-bold mb-0" style="font-size: 1.5rem;">{{ labels.ABOUT.TITLE }}</h3>
          <p class="small mb-0 text-secondary" style="font-size: 0.75rem;">{{ labels.ABOUT.HERO_TEXT[0] }} {{ labels.ABOUT.HERO_TEXT[1] }} {{ labels.ABOUT.HERO_TEXT[2] }}</p>
        </div>
      </a>
      
      <div class="sidebar-links flex-grow-1 mt-2 overflow-y-auto d-flex flex-column" data-lenis-prevent="true" style="min-height: 0;" [class.px-3]="!sidebarService.isCollapsed()" [class.px-2]="sidebarService.isCollapsed()">
        <a routerLink="/home" routerLinkActive="active" class="sidebar-item mb-2" [title]="sidebarService.isCollapsed() ? labels.NAVBAR.HOME : ''">
          <i class="bi bi-house-door-fill"></i> 
          <span *ngIf="!sidebarService.isCollapsed()" class="ms-3" style="white-space: nowrap; animation: fadeIn 0.3s;">{{ labels.NAVBAR.HOME }}</span>
        </a>
        <a routerLink="/ai" routerLinkActive="active" class="sidebar-item mb-2" [title]="sidebarService.isCollapsed() ? labels.NAVBAR.AI_ASSISTANT : ''">
          <i class="bi bi-stars" style="font-size: 1.4rem;"></i> 
          <span *ngIf="!sidebarService.isCollapsed()" class="ms-3" style="white-space: nowrap; animation: fadeIn 0.3s;">{{ labels.NAVBAR.AI_ASSISTANT }}</span>
        </a>
        <a routerLink="/explore" routerLinkActive="active" class="sidebar-item mb-2" [title]="sidebarService.isCollapsed() ? labels.NAVBAR.EXPLORE : ''">
          <i class="bi bi-compass-fill"></i> 
          <span *ngIf="!sidebarService.isCollapsed()" class="ms-3" style="white-space: nowrap; animation: fadeIn 0.3s;">{{ labels.NAVBAR.EXPLORE }}</span>
        </a>
        <a routerLink="/saved" routerLinkActive="active" class="sidebar-item mb-2" [title]="sidebarService.isCollapsed() ? labels.NAVBAR.SAVED : ''">
          <i class="bi bi-bookmark-fill"></i> 
          <span *ngIf="!sidebarService.isCollapsed()" class="ms-3" style="white-space: nowrap; animation: fadeIn 0.3s;">{{ labels.NAVBAR.SAVED }}</span>
        </a>
        <a routerLink="/account" routerLinkActive="active" class="sidebar-item mb-2" [title]="sidebarService.isCollapsed() ? labels.NAVBAR.SIGN_IN : ''">
          <i class="bi bi-person-fill"></i> 
          <span *ngIf="!sidebarService.isCollapsed()" class="ms-3" style="white-space: nowrap; animation: fadeIn 0.3s;">{{ labels.NAVBAR.SIGN_IN }}</span>
        </a>
        <a routerLink="/settings" routerLinkActive="active" class="sidebar-item mb-4" [title]="sidebarService.isCollapsed() ? labels.NAVBAR.SETTINGS : ''">
          <i class="bi bi-gear-fill"></i> 
          <span *ngIf="!sidebarService.isCollapsed()" class="ms-3" style="white-space: nowrap; animation: fadeIn 0.3s;">{{ labels.NAVBAR.SETTINGS }}</span>
        </a>
      </div>

      <div class="sidebar-footer p-3 border-top" [class.text-end]="!sidebarService.isCollapsed()" [class.text-center]="sidebarService.isCollapsed()">
        <i class="bi fs-6 text-secondary pe-2" style="cursor: pointer; transition: color 0.2s; -webkit-text-stroke: 1px;"
           [class.bi-chevron-left]="!sidebarService.isCollapsed()" 
           [class.bi-chevron-right]="sidebarService.isCollapsed()"
           [class.pe-2]="!sidebarService.isCollapsed()"
           [class.pe-0]="sidebarService.isCollapsed()"
           (click)="sidebarService.toggle()" 
           [title]="sidebarService.isCollapsed() ? labels.NAVBAR.EXPAND_SIDEBAR : labels.NAVBAR.COLLAPSE_SIDEBAR"
           onmouseover="this.classList.add('text-dark'); this.classList.remove('text-secondary')"
           onmouseout="this.classList.add('text-secondary'); this.classList.remove('text-dark')"></i>
      </div>
    </aside>
  `,
  styles: [`
    /* Mobile Nav */
    .mobile-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 75px;
      z-index: 9999;
      padding-bottom: max(10px, env(safe-area-inset-bottom));
    }
    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      color: var(--text-tertiary);
      transition: color 0.2s;
      width: 60px;
    }
    .nav-item i {
      font-size: 1.5rem;
      margin-bottom: 2px;
    }
    .nav-item span {
      font-size: 0.65rem;
      font-weight: 500;
    }
    .nav-item.active {
      color: var(--text-primary);
    }

    /* Desktop Sidebar */
    .desktop-sidebar {
      position: fixed;
      top: 0;
      left: 0;
      width: 260px;
      height: 100vh;
      height: 100dvh; /* Fallback for iOS */
      z-index: 1000;
      transition: width 0.3s ease;
      overflow: hidden;
    }
    .desktop-sidebar.collapsed {
      width: 80px;
    }
    .sidebar-item {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      color: var(--text-secondary);
      text-decoration: none;
      border-radius: 12px;
      font-weight: 500;
      transition: background-color 0.2s, color 0.2s;
    }
    .desktop-sidebar.collapsed .sidebar-item {
      justify-content: center;
      padding: 12px 0;
    }
    .sidebar-item i {
      font-size: 1.25rem;
    }
    .sidebar-item:hover {
      background-color: var(--bg-secondary);
      color: var(--text-primary);
    }
    .sidebar-item.active {
      background-color: var(--inverse-bg);
      color: var(--inverse-text);
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .sidebar-footer .btn {
      transition: padding 0.3s;
    }
    .desktop-sidebar.collapsed .sidebar-footer .btn {
      padding: 8px 0;
    }
  `]
})
export class NavbarComponent {
  public sidebarService = inject(SidebarService);
  private langService = inject(LanguageService);
  get labels() { return this.langService.labels; }
}
