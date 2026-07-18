import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
import { UiService } from '../../services/ui';

@Component({
  selector: 'app-specialties-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-panel p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="mb-0 fw-semibold">Local Specialties</h3>
        <i class="bi bi-stars fs-3 text-accent"></i>
      </div>

      <div *ngIf="!specialties" class="text-center py-4 text-muted">
        Loading curated specialties...
      </div>

      <div *ngIf="specialties?.length === 0" class="text-center py-4 text-muted">
        <i class="bi bi-info-circle fs-3 d-block mb-2"></i>
        No curated specialties found in this area yet.
      </div>

      <div class="list-group list-group-flush" *ngIf="specialties">
        <button *ngFor="let item of specialties" class="list-group-item list-group-item-action bg-transparent border-bottom-0 rounded-3 mb-2 p-3 specialty-item" (click)="onSelect(item)">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h6 class="mb-1 fw-bold">{{ item.name }}</h6>
              <p class="mb-1 small text-muted">{{ item.description }}</p>
              <span class="badge bg-light text-dark border mt-1">{{ item.category }}</span>
            </div>
            <i class="bi bi-chevron-right text-muted opacity-50"></i>
          </div>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .glass-panel {
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      box-shadow: var(--glass-shadow);
      border-radius: 20px;
    }
    .text-accent {
      color: var(--accent-color);
    }
    .specialty-item {
      transition: background-color 0.2s ease, transform 0.2s ease;
    }
    .specialty-item:hover {
      background-color: rgba(29, 29, 31, 0.03) !important;
      transform: translateX(4px);
    }
  `]
})
export class SpecialtiesListComponent implements OnInit {
  api = inject(ApiService);
  ui = inject(UiService);
  specialties: any[] | null = null;
  cdr = inject(ChangeDetectorRef);

  async ngOnInit() {
    try {
      const data = await this.api.get<any>('/specialties?limit=5');
      this.specialties = data.documents || [];
      this.cdr.detectChanges();
    } catch (e) {
      console.error('Failed to load specialties', e);
      this.cdr.detectChanges();
    }
  }

  onSelect(item: any) {
    this.ui.showToast(`Selected ${item.name}`, 'info');
  }
}
