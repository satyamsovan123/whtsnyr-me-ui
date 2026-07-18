import { Component, Input, OnChanges, SimpleChanges, inject, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsightsService } from '../../services/insights';
import gsap from 'gsap';

@Component({
  selector: 'app-for-you',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-panel p-4 mb-4 position-relative overflow-hidden ai-container" #aiContainer>
      <!-- Shimmer effect overlay -->
      <div class="shimmer-overlay" *ngIf="loading"></div>
      
      <div class="d-flex align-items-center mb-2">
        <i class="bi bi-magic fs-4 me-2 ai-icon"></i>
        <h4 class="mb-0 fw-bold ai-title">For You</h4>
      </div>
      
      <div class="ai-content-box mt-3 position-relative z-1">
        <p class="mb-0 fs-5 lh-base ai-text" *ngIf="insightText">{{ insightText }}</p>
        <p class="mb-0 fs-5 text-muted ai-loading-text" *ngIf="loading">Gathering insights from your surroundings...</p>
        <p class="mb-0 fs-5 text-muted" *ngIf="!insightText && !loading">Waiting for location data to generate personalized AI insights...</p>
      </div>
    </div>
  `,
  styles: [`
    .ai-container {
      background: linear-gradient(135deg, rgba(251,251,253,0.9), rgba(240,240,245,0.85));
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.4);
      box-shadow: 0 8px 32px rgba(231, 84, 37, 0.1);
      border-radius: 20px;
    }
    .ai-icon, .ai-title {
      background: linear-gradient(90deg, var(--text-color), var(--accent-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .shimmer-overlay {
      position: absolute;
      top: 0; left: -100%; width: 50%; height: 100%;
      background: linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent);
      transform: skewX(-20deg);
      z-index: 0;
      animation: shimmer 2s infinite;
    }
    @keyframes shimmer {
      100% { left: 200%; }
    }
    .ai-text {
      color: var(--text-color);
      font-weight: 500;
    }
  `]
})
export class ForYouComponent implements OnChanges, AfterViewInit {
  @Input() state!: { weather: any; places: any; swiggy: any };
  @ViewChild('aiContainer') container!: ElementRef;
  
  insights = inject(InsightsService);
  cdr = inject(ChangeDetectorRef);
  
  loading = false;
  insightText: string | null = null;
  private hasGenerated = false;

  ngAfterViewInit() {
    if (this.container) {
      gsap.from(this.container.nativeElement, {
        y: -20, opacity: 0, duration: 0.8, ease: 'power3.out'
      });
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['state'] && this.state && !this.hasGenerated) {
      // Check if we have at least weather and places to generate a meaningful insight
      if (this.state.weather && this.state.places) {
        this.generate();
      }
    }
  }

  async generate() {
    this.hasGenerated = true;
    this.loading = true;
    try {
      const result = await this.insights.generateInsights({
        weatherData: this.state.weather,
        placesData: this.state.places,
        swiggyData: this.state.swiggy
      });
      this.insightText = result.insight;
      
      // Force change detection since we are zoneless and using native fetch
      this.cdr.detectChanges();
      
      // Animate text entry
      setTimeout(() => {
        gsap.from('.ai-text', { opacity: 0, y: 10, duration: 1, ease: 'power2.out' });
      }, 50);
    } catch (e) {
      console.error('Failed to generate insights', e);
      this.hasGenerated = false; // allow retry
      this.cdr.detectChanges();
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}
