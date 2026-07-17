import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiService } from '../../services/ui';
import gsap from 'gsap';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loader-overlay" *ngIf="ui.isLoading()">
      <div class="spinner-border text-accent" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `,
  styles: [`
    .loader-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(251, 251, 253, 0.8);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    .text-accent {
      color: var(--accent-color);
    }
  `]
})
export class LoaderComponent implements OnInit {
  ui = inject(UiService);

  ngOnInit() {
    // GSAP animations can be added to route transitions instead of loader
  }
}
