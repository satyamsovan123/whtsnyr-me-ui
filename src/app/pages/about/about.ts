import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="landing-wrapper bg-white text-dark min-vh-100 position-relative overflow-hidden" #mainContainer>
      
      <!-- 1. Hero Section -->
      <section class="min-vh-100 d-flex flex-column align-items-center justify-content-center text-center px-4 position-relative" #heroSection>
        
        <!-- Massive Rotating Background Badge -->
        <div class="position-absolute badge-container d-flex align-items-center justify-content-center" 
             style="top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 0; width: min(90%, 700px); aspect-ratio: 1; opacity: 0; pointer-events: none;">
          <svg viewBox="0 0 100 100" class="rotating-badge w-100 h-100 position-absolute top-0 start-0">
            <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
            <text font-size="6" font-weight="800" fill="var(--bs-secondary)" opacity="0.15">
              <textPath href="#circlePath" startOffset="0%" textLength="250">
                EXPLORE • WHTSNYR.ME • EXPLORE • WHTSNYR.ME • EXPLORE • WHTSNYR.ME • 
              </textPath>
            </text>
          </svg>
        </div>

        <div class="position-relative" style="z-index: 1; max-width: 800px;">
          <p class="text-secondary fw-bold mb-3 hero-eyebrow tracking-tight" style="opacity: 0; font-size: 1.2rem; font-family: var(--bs-body-font-family);">whtsnyr.me</p>
          <h1 class="fw-bold tracking-tighter mb-4" style="font-size: clamp(3.5rem, 8vw, 6rem); line-height: 1.05;">
            <span class="d-block overflow-hidden" style="padding-bottom: 5px;">
              <span class="d-inline-block hero-word" style="opacity: 0; transform: translateY(100%);">Around</span>
            </span>
            <span class="d-block overflow-hidden" style="padding-bottom: 5px;">
              <span class="d-inline-block hero-word" style="opacity: 0; transform: translateY(100%);">you,</span>
            </span>
            <span class="d-block overflow-hidden" style="padding-bottom: 5px;">
              <span class="d-inline-block hero-word" style="opacity: 0; transform: translateY(100%);">reimagined.</span>
            </span>
          </h1>
        </div>
      </section>
      <!-- 2. Apple-Style Split Feature -->
      <section class="bg-white position-relative overflow-hidden d-flex flex-column justify-content-center" style="min-height: 80vh; padding: 100px 0;" #featuresSection>
        
        <div class="container position-relative" style="max-width: 1100px; z-index: 1;">
          <div class="row align-items-center">
            
            <!-- Text Content (Left) -->
            <div class="col-md-7 col-lg-6 mb-5 mb-md-0 apple-text-1 pe-md-5 ms-md-4 ms-lg-5" style="opacity: 0; transform: translateX(-30px); position: relative;">
              <h2 class="fw-bold tracking-tighter mb-4" style="font-size: clamp(2.5rem, 5vw, 3.5rem); line-height: 1.1; color: #1d1d1f;">
                Discover.<br>
                <span style="color: #34c759;">Without the noise.</span>
              </h2>
              <p class="fw-semibold tracking-tight m-0 mb-4" style="font-size: 1.25rem; line-height: 1.5; color: #86868b;">
                A real-time discovery engine with AI-powered insights isolates exactly what you care about. Say goodbye to outdated tourist blogs.
              </p>
              <p class="fw-semibold tracking-tight m-0" style="font-size: 1.25rem; line-height: 1.5; color: #86868b;">
                See <span style="color: #1d1d1f;">curated details</span> and get personalized recommendations tailored to your exact vibe for dining, sights, and hidden gems.
              </p>
            </div>
            
          </div>
        </div>

        <!-- Overflowing Image from the right (Desktop) -->
        <div class="position-absolute h-100 d-none d-md-flex align-items-center" 
             style="top: 0; left: 48%; width: 55%; pointer-events: none; z-index: 0;">
          <img src="navigation.svg" class="apple-image w-100 h-100" style="object-fit: contain; object-position: right center; opacity: 0; transform: translateX(50px); padding-top: 5vh; padding-bottom: 5vh;">
        </div>
        
        <!-- Mobile Image -->
        <div class="w-100 mt-4 d-md-none text-end apple-image-mobile" style="opacity: 0; transform: translateY(30px); margin-right: -10%;">
          <img src="navigation.svg" class="img-fluid" style="width: 110%; max-width: none;">
        </div>
      </section>

    </div>
  `,
  styles: [`
    .tracking-tight { letter-spacing: -0.04em; }
    .tracking-tighter { letter-spacing: -0.05em; }
    
    @keyframes spin {
      100% { transform: rotate(360deg); }
    }
    .rotating-badge {
      animation: spin 15s linear infinite;
    }
    
    /* Responsive Badge Positioning */
    .badge-responsive-pos {
      width: 100px;
      height: 100px;
      top: 40px;
      left: 50%;
      transform: translateX(-50%);
    }
    @media (min-width: 1024px) {
      .badge-responsive-pos {
        width: 130px;
        height: 130px;
        top: 40px;
        right: 40px;
        left: auto;
        transform: none;
      }
    }
  `]
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mainContainer') mainContainer!: ElementRef;
  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('featuresSection') featuresSection!: ElementRef;

  private ctx!: gsap.Context;

  ngAfterViewInit() {
    this.ctx = gsap.context(() => {
      
      // Hero Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.to('.hero-eyebrow', { opacity: 1, duration: 1, delay: 0.2 })
        .to('.hero-word', { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out' }, '-=0.8')
        .to('.badge-container', { opacity: 1, duration: 1 }, '-=0.5');

      // Apple-style Features Reveal
      gsap.to('.apple-text-1', {
        scrollTrigger: { trigger: this.featuresSection.nativeElement, start: 'top 70%' },
        opacity: 1, x: 0, duration: 1, ease: 'power3.out'
      });
      gsap.to('.apple-image', {
        scrollTrigger: { trigger: this.featuresSection.nativeElement, start: 'top 70%' },
        opacity: 1, x: 0, duration: 1, delay: 0.2, ease: 'power3.out'
      });
      gsap.to('.apple-image-mobile', {
        scrollTrigger: { trigger: this.featuresSection.nativeElement, start: 'top 70%' },
        opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out'
      });


    }, this.mainContainer.nativeElement);
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
