import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-container bg-white min-vh-100 fade-in max-w-desktop mx-auto position-relative p-4 p-md-5">
      <div class="w-100 mx-auto pt-3" style="max-width: 700px;">
        <div class="mb-5">
          <h1 class="display-5 fw-bold tracking-tight mb-2">Privacy Policy</h1>
          <p class="text-secondary">Last updated: July 2026</p>
        </div>

          <div class="policy-section">
            <h2 class="h5 fw-bold mb-3">1. Data Collection</h2>
            <p class="text-secondary" style="line-height: 1.7;">
            At whtsnyr.me, we respect your privacy. When you use our app to discover local places, we may collect your rough or precise location data, but only if you explicitly grant us permission. We do not store your location history on our servers.
            </p>

          <h3 class="fw-bold fs-4 mb-3">2. How We Use Your Data</h3>
          <p class="text-secondary mb-4" style="line-height: 1.7;">
            Your location data is used strictly in real-time to curate the best local restaurants, events, and weather updates around you. If you choose to connect third-party services like Swiggy, we only retrieve your order history locally to personalize your AI assistant's recommendations.
          </p>

          <h3 class="fw-bold fs-4 mb-3">3. Data Sharing</h3>
          <p class="text-secondary mb-4" style="line-height: 1.7;">
            We believe your data is yours. We do not sell your personal information, location, or search history to third-party advertisers or data brokers.
          </p>

          <h3 class="fw-bold fs-4 mb-3">4. Security</h3>
          <p class="text-secondary mb-5" style="line-height: 1.7;">
            We employ industry-standard encryption to protect any data transmitted between your device and our services. Since most of your personalized data (like saved places and history) is stored locally on your device, you remain in full control.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tracking-tight { letter-spacing: -0.04em; }
    h3 { letter-spacing: -0.02em; }
  `]
})
export class PrivacyPolicyComponent {}
