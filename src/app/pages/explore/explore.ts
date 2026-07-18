import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container d-flex flex-column h-100 max-w-desktop mx-auto bg-white fade-in">
      
      <!-- Top Search & Filters -->
      <div class="p-3 bg-white z-1">
        <div class="input-group bg-light rounded-pill p-1 mb-3">
          <span class="input-group-text bg-transparent border-0 text-secondary"><i class="bi bi-search"></i></span>
          <input type="text" class="form-control border-0 bg-transparent shadow-none" placeholder="Search places, food, events...">
        </div>
        
        <div class="d-flex gap-2 overflow-auto no-scrollbar pb-2">
          <button class="btn btn-outline border-light rounded-pill text-dark fw-medium btn-sm px-3 shadow-sm bg-white text-nowrap d-flex align-items-center"><i class="bi bi-geo-alt-fill me-1 text-secondary"></i> Bandra West <i class="bi bi-chevron-down ms-2"></i></button>
          <button class="btn btn-outline border-light rounded-pill text-dark fw-medium btn-sm px-3 shadow-sm bg-white text-nowrap">2 km <i class="bi bi-chevron-down ms-1"></i></button>
          <button class="btn btn-outline border-light rounded-pill text-dark fw-medium btn-sm px-3 shadow-sm bg-white text-nowrap">Filters <i class="bi bi-sliders ms-1"></i></button>
        </div>

        <div class="d-flex gap-4 overflow-auto no-scrollbar pt-2 border-bottom border-light pb-2">
          <span class="text-secondary small fw-medium text-nowrap border-bottom border-dark border-2 pb-2 text-dark">Food</span>
          <span class="text-secondary small fw-medium text-nowrap pb-2">Nature</span>
          <span class="text-secondary small fw-medium text-nowrap pb-2">Temples</span>
          <span class="text-secondary small fw-medium text-nowrap pb-2">Shopping</span>
          <span class="text-secondary small fw-medium text-nowrap pb-2">Parks</span>
        </div>
      </div>

      <!-- Map Area (Placeholder) -->
      <div class="flex-grow-1 position-relative bg-light">
        <div class="w-100 h-100" style="background-image: url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop'); background-size: cover; background-position: center; opacity: 0.8; filter: grayscale(0.2) contrast(1.1) brightness(1.1);"></div>
        
        <!-- Map Pins -->
        <div class="position-absolute top-50 start-50 translate-middle">
          <div class="bg-inverse rounded-pill px-3 py-1 shadow fw-medium fs-6 d-flex align-items-center">
            <i class="bi bi-star-fill text-warning me-2 small"></i> Mount Mary Church
          </div>
          <div class="position-absolute start-50 translate-middle-x" style="bottom: -8px; width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 8px solid var(--inverse-bg);"></div>
        </div>

        <!-- Floating Action Buttons -->
        <div class="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex bg-white rounded-pill shadow-sm p-1">
          <button class="btn btn-black rounded-pill px-4 fw-medium">Map</button>
          <button class="btn btn-white text-secondary rounded-pill px-4 fw-medium border-0">List</button>
        </div>
      </div>

      <!-- Place Card Bottom Sheet Mockup -->
      <div class="bg-white rounded-top-4 shadow-lg p-3 mx-2 mx-md-4 position-relative z-2" style="margin-top: -20px;">
        <div class="d-flex justify-content-center mb-3">
          <div class="bg-secondary rounded-pill opacity-25" style="width: 40px; height: 4px;"></div>
        </div>
        
        <div class="d-flex gap-3 align-items-center">
          <div class="rounded-3 flex-shrink-0 bg-light" style="width: 70px; height: 70px; background-image: url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=200&auto=format&fit=crop'); background-size: cover;"></div>
          <div class="flex-grow-1">
            <h6 class="fw-bold mb-1 fs-5">Bandra Fort</h6>
            <p class="small text-secondary mb-1">1.1 km • <i class="bi bi-star-fill text-warning"></i> 4.6 <span class="text-success ms-1">Open</span></p>
            <p class="small text-tertiary mb-0">Historic • Photography</p>
          </div>
          <i class="bi bi-three-dots-vertical text-secondary fs-5"></i>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
    .max-w-desktop {
      max-width: 800px;
    }
  `]
})
export class ExploreComponent {}
