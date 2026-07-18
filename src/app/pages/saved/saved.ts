import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LABELS } from '../../constants/labels';

@Component({
  selector: 'app-saved',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container bg-white min-vh-100 fade-in max-w-desktop mx-auto position-relative p-4 p-md-5">
      <div class="w-100 mx-auto" style="max-width: 800px;">
        
        <div class="mb-5">
          <h1 class="fw-bold fs-2 mb-2">{{ labels.SAVED.TITLE }}</h1>
          <p class="text-secondary">{{ labels.SAVED.SUBTITLE }}</p>
        </div>

        <div class="d-flex flex-column gap-4">
          <!-- Item 1 -->
          <div class="d-flex gap-3 align-items-center">
            <div class="rounded-3 flex-shrink-0 bg-light" style="width: 80px; height: 80px; background-image: url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=200&auto=format&fit=crop'); background-size: cover;"></div>
            <div class="flex-grow-1">
              <h6 class="fw-bold mb-1 fs-5">Bandra Fort</h6>
              <p class="small text-secondary mb-1">1.1 km • <i class="bi bi-star-fill text-warning"></i> 4.6 <span class="text-success ms-1">Open</span></p>
              <p class="small text-tertiary mb-0" style="font-size: 0.8rem;">Historic • Photography</p>
            </div>
            <i class="bi bi-bookmark-fill text-dark fs-5" style="cursor: pointer;"></i>
          </div>

          <!-- Item 2 -->
          <div class="d-flex gap-3 align-items-center">
            <div class="rounded-3 flex-shrink-0 bg-light" style="width: 80px; height: 80px; background-image: url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=400&auto=format&fit=crop'); background-size: cover;"></div>
            <div class="flex-grow-1">
              <h6 class="fw-bold mb-1 fs-5">Kala Ghoda Café</h6>
              <p class="small text-secondary mb-1">1.2 km • <i class="bi bi-star-fill text-warning"></i> 4.6 <span class="text-success ms-1">Open</span></p>
              <p class="small text-tertiary mb-0" style="font-size: 0.8rem;">Cafe • Coffee</p>
            </div>
            <i class="bi bi-bookmark-fill text-dark fs-5" style="cursor: pointer;"></i>
          </div>
          
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
  `]
})
export class SavedComponent {
  public labels = LABELS;
}
