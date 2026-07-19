import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiService } from '../../services/ui';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 10000">
      <div *ngFor="let toast of ui.toasts()" class="toast show align-items-center text-white border-0 mb-2 glass-panel" [ngClass]="getBgClass(toast.type)" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            {{ toast.message }}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close" (click)="ui.removeToast(toast.id)"></button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .glass-panel {
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      box-shadow: var(--glass-shadow);
      border-radius: 12px;
    }
    .bg-success-subtle { background-color: rgba(25, 135, 84, 0.9) !important; }
    .bg-danger-subtle { background-color: rgba(220, 53, 69, 0.9) !important; }
    .bg-info-subtle { background-color: rgba(13, 202, 240, 0.9) !important; }
    .bg-accent { background-color: rgba(231, 84, 37, 0.9) !important; }
  `]
})
export class ToastComponent {
  ui = inject(UiService);

  getBgClass(type: string): string {
    switch(type) {
      case 'success': return 'bg-success-subtle';
      case 'error': return 'bg-danger-subtle';
      default: return 'bg-accent';
    }
  }
}
