import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LABELS } from '../../constants/labels';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-container bg-white min-vh-100 fade-in max-w-desktop mx-auto position-relative px-4 py-4">
        <div class="mb-5">
          <h1 class="display-5 fw-bold tracking-tight mb-2">{{ labels.PRIVACY.TITLE }}</h1>
          <p class="text-secondary">{{ labels.PRIVACY.LAST_UPDATED }}</p>
        </div>

          <div class="policy-section">
            <h2 class="h5 fw-bold mb-3">{{ labels.PRIVACY.SECTION_1_TITLE }}</h2>
            <p class="text-secondary" style="line-height: 1.7;">
            {{ labels.PRIVACY.SECTION_1_TEXT }}
            </p>

          <h3 class="fw-bold fs-4 mb-3">{{ labels.PRIVACY.SECTION_2_TITLE }}</h3>
          <p class="text-secondary mb-4" style="line-height: 1.7;">
            {{ labels.PRIVACY.SECTION_2_TEXT }}
          </p>

          <h3 class="fw-bold fs-4 mb-3">{{ labels.PRIVACY.SECTION_3_TITLE }}</h3>
          <p class="text-secondary mb-4" style="line-height: 1.7;">
            {{ labels.PRIVACY.SECTION_3_TEXT }}
          </p>

          <h3 class="fw-bold fs-4 mb-3">{{ labels.PRIVACY.SECTION_4_TITLE }}</h3>
          <p class="text-secondary mb-5" style="line-height: 1.7;">
            {{ labels.PRIVACY.SECTION_4_TEXT }}
          </p>
        </div>
    </div>
  `,
  styles: [`
    .tracking-tight { letter-spacing: -0.04em; }
    h3 { letter-spacing: -0.02em; }
    .max-w-desktop {
      max-width: 800px;
    }
  `]
})
export class PrivacyPolicyComponent {
  public labels = LABELS;
}
