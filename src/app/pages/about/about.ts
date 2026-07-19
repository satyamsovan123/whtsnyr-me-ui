import { Component, inject, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageService } from '../../services/language';
import { environment } from '../../../environments/environment';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="landing-wrapper bg-white text-dark min-vh-100 position-relative overflow-hidden w-100" #mainContainer>
      
      <!-- Max Width Wrapper for Ultra-Wide Screens -->
      <div class="mx-auto position-relative w-100" style="max-width: 1440px;">
        
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
            <p class="text-secondary fw-bold mb-3 hero-eyebrow tracking-tight" style="opacity: 0; font-size: 1.2rem; font-family: var(--bs-body-font-family);">{{ labels.ABOUT.TITLE }}</p>
            <h1 class="fw-bold tracking-tighter mb-4 hero-heading" style="font-size: clamp(3.5rem, 8vw, 6rem); line-height: 1.05;">
              Around<br>you,<br>reimagined.
            </h1>
            <div class="mt-5" style="opacity: 0; animation: fadeIn 1s ease-out 1s forwards;">
              <a routerLink="/home" class="btn btn-dark rounded-pill px-5 py-3 fw-bold shadow-sm" style="font-size: 1.1rem;">
                {{ labels.ABOUT.START_EXPLORING }}
              </a>
            </div>
          </div>
        </section>

        <!-- 2. Apple-Style Split Feature -->
        <section class="bg-white position-relative overflow-hidden d-flex flex-column justify-content-center" style="min-height: 80vh; padding: 100px 0;" #featuresSection>
          
          <div class="container position-relative" style="max-width: 1100px; z-index: 1;">
            <div class="row align-items-center">
              
              <!-- Text Content (Left) -->
              <div class="col-md-7 col-lg-6 mb-5 mb-md-0 apple-text-1 pe-md-5 ms-md-4 ms-lg-5 px-4 px-md-0 text-center text-md-start" style="opacity: 0; transform: translateX(-30px); position: relative;">
                <h2 class="fw-bold tracking-tighter mb-4 text-primary" style="font-size: clamp(2.5rem, 5vw, 3.5rem); line-height: 1.1;">
                  {{ labels.ABOUT.SECTIONS[0].TITLE }}<br>
                  <span class="text-secondary">{{ labels.ABOUT.SECTIONS[0].SUBTITLE }}</span>
                </h2>
                <p class="fw-semibold tracking-tight m-0 mb-4 text-secondary" style="font-size: 1.25rem; line-height: 1.5;">
                  {{ labels.ABOUT.SECTIONS[0].P1 }}
                </p>
                <p class="fw-semibold tracking-tight m-0 text-secondary" style="font-size: 1.25rem; line-height: 1.5;">
                  {{ labels.ABOUT.SECTIONS[0].P2_1 }}<span class="text-primary">{{ labels.ABOUT.SECTIONS[0].P2_BOLD }}</span>{{ labels.ABOUT.SECTIONS[0].P2_2 }}
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
          <div class="w-100 mt-4 d-md-none d-flex justify-content-center apple-image-mobile" style="opacity: 0; transform: translateY(30px);">
            <img src="navigation.svg" class="img-fluid" style="width: 100%; max-width: 400px;">
          </div>
        </section>

        <!-- Grid/Walking Section -->
        <section *ngIf="false" #gridSection class="position-relative w-100" style="margin-top: 20vh; padding-bottom: 15vh;">
          <!-- Overflowing Image from the left (Desktop) -->
          <div class="position-absolute h-100 d-none d-md-flex align-items-center justify-content-start" 
               style="top: 0; left: -15vw; width: 65vw; pointer-events: none; z-index: 0;">
               <!-- Container that hugs left -->
               <div class="position-relative w-100 h-100 d-flex justify-content-start align-items-center">
                   <svg viewBox="0 80 400 240" preserveAspectRatio="xMinYMid meet" class="position-absolute w-100 h-100" style="z-index: 0; left: 0;">
                     <g transform="translate(200, 200) scale(1, 0.5) rotate(45)">
                       <g class="grid-lines-group">
                         <line x1="-150" y1="-150" x2="-150" y2="150" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                         <line x1="-100" y1="-150" x2="-100" y2="150" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                         <line x1="-50" y1="-150" x2="-50" y2="150" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                         <line x1="0" y1="-150" x2="0" y2="150" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                         <line x1="50" y1="-150" x2="50" y2="150" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                         <line x1="100" y1="-150" x2="100" y2="150" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                         <line x1="150" y1="-150" x2="150" y2="150" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                         <line x1="-150" y1="-150" x2="150" y2="-150" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                         <line x1="-150" y1="-100" x2="150" y2="-100" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                         <line x1="-150" y1="-50" x2="150" y2="-50" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                         <line x1="-150" y1="0" x2="150" y2="0" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                         <line x1="-150" y1="50" x2="150" y2="50" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                         <line x1="-150" y1="100" x2="150" y2="100" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                         <line x1="-150" y1="150" x2="150" y2="150" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                       </g>
                     </g>
                   </svg>
                   <!-- Walking Character -->
                   <img src="walking.svg" class="apple-walking-img position-relative" style="height: 130%; max-height: 800px; z-index: 1; opacity: 0; transform: translateY(20px); margin-left: 15vw; margin-top: -15vh;">
               </div>
          </div>

          <div class="container h-100">
            <div class="row h-100 align-items-center">
              
              <!-- Mobile Image / Grid -->
              <div class="col-12 order-2 d-md-none position-relative d-flex justify-content-center align-items-center mt-5" style="min-height: 400px;">
                 <!-- Isometric Grid SVG -->
                 <svg viewBox="0 0 400 400" class="position-absolute w-100 h-100" style="z-index: 0; max-width: 400px;">
                   <g transform="translate(200, 200) scale(1, 0.5) rotate(45)">
                     <g class="grid-lines-group">
                       <line x1="-150" y1="-150" x2="-150" y2="150" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                       <line x1="-100" y1="-150" x2="-100" y2="150" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                       <line x1="-50" y1="-150" x2="-50" y2="150" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                       <line x1="0" y1="-150" x2="0" y2="150" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                       <line x1="50" y1="-150" x2="50" y2="150" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                       <line x1="100" y1="-150" x2="100" y2="150" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                       <line x1="150" y1="-150" x2="150" y2="150" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                       <line x1="-150" y1="-150" x2="150" y2="-150" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                       <line x1="-150" y1="-100" x2="150" y2="-100" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                       <line x1="-150" y1="-50" x2="150" y2="-50" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                       <line x1="-150" y1="0" x2="150" y2="0" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                       <line x1="-150" y1="50" x2="150" y2="50" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                       <line x1="-150" y1="100" x2="150" y2="100" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                       <line x1="-150" y1="150" x2="150" y2="150" stroke="#d2d2d7" stroke-width="2" class="iso-grid-line"/>
                     </g>
                   </g>
                 </svg>
                 <!-- Walking Character -->
                 <img src="walking.svg" class="apple-walking-img" style="height: 250px; z-index: 1; position: relative; opacity: 0; transform: scale(0.8) translateY(20px);">
              </div>
  
              <!-- Empty space for Desktop Left Bleed -->
              <div class="col-md-6 d-none d-md-block"></div>
  
              <!-- Right Side: Text Content -->
              <div class="col-md-6 order-1 order-md-2 apple-text-2 ps-md-4 ps-lg-5 px-4 px-md-0" style="opacity: 0; transform: translateX(30px);">
                <h2 class="fw-bold tracking-tight mb-4 text-primary" style="font-size: 3rem; line-height: 1.1;">
                  {{ labels.ABOUT.SECTIONS[1].TITLE }}<span class="text-secondary">{{ labels.ABOUT.SECTIONS[1].TITLE_HIGHLIGHT }}</span>
                </h2>
                <p class="fw-semibold tracking-tight text-secondary mb-4" style="font-size: 1.25rem; line-height: 1.5;">
                  {{ labels.ABOUT.SECTIONS[1].P1 }}
                </p>
                <p class="fw-semibold tracking-tight m-0 text-secondary" style="font-size: 1.25rem; line-height: 1.5;">
                  <span class="text-primary">{{ labels.ABOUT.SECTIONS[1].P2_BOLD }}</span>{{ labels.ABOUT.SECTIONS[1].P2 }}
                </p>
              </div>
  
            </div>
          </div>
        </section>

        <!-- Why We Built This Section -->
        <section #whySection class="w-100 d-flex flex-column justify-content-center align-items-center text-center px-4" style="margin-top: 15vh; padding-bottom: 25vh;">
          <div class="container" style="max-width: 800px;">
            <h2 class="fw-bold tracking-tight mb-4 apple-text-3 text-primary" style="font-size: clamp(2rem, 4vw, 3rem); line-height: 1.1; opacity: 0; transform: translateY(30px);">
              {{ labels.ABOUT.WHY_TITLE }}
            </h2>
            <p class="fw-semibold tracking-tight text-secondary apple-text-3 mb-5" style="font-size: 1.25rem; line-height: 1.5; opacity: 0; transform: translateY(30px);">
              {{ labels.ABOUT.WHY_TEXT }}
            </p>
            
            <!-- Call to Action -->
            <div class="apple-text-3 mb-5 d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3" style="opacity: 0; transform: translateY(30px);">
              <a routerLink="/home" class="btn btn-dark rounded-pill px-5 py-3 fw-bold shadow-sm" style="font-size: 1.1rem;">
                {{ labels.ABOUT.START_EXPLORING }}
              </a>
              <a [href]="'mailto:' + contactEmail" class="btn btn-outline-secondary rounded-pill px-5 py-3 fw-bold" style="font-size: 1.1rem;">
                {{ labels.ABOUT.CONTACT_LINK }}
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  `,
  styles: [`
    .tracking-tight { letter-spacing: -0.04em; }
    .tracking-tighter { letter-spacing: -0.05em; }
    
    @keyframes spin {
      100% { transform: rotate(360deg); }
    }
    .rotating-badge {
      animation: spin 45s linear infinite;
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
    .iso-grid-line {
      stroke-dasharray: 300;
      stroke-dashoffset: 300;
    }
  `]
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mainContainer') mainContainer!: ElementRef;
  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('featuresSection') featuresSection!: ElementRef;
  @ViewChild('gridSection') gridSection!: ElementRef;
  @ViewChild('whySection') whySection!: ElementRef;

  private ctx!: gsap.Context;
  private langService = inject(LanguageService);
  get labels() { return this.langService.labels; }
  public contactEmail = environment.contactEmail;

  ngAfterViewInit() {
    this.ctx = gsap.context(() => {
      
      // Safe Character Split for Hero (Uses Intl.Segmenter for complex languages)
      const hero = document.querySelector('.hero-heading');
      if (hero) {
        const text = `${this.labels.ABOUT.HERO_TEXT[0]}<br>${this.labels.ABOUT.HERO_TEXT[1]}<br>${this.labels.ABOUT.HERO_TEXT[2]}`;
        const lines = text.split('<br>');
        
        let segmenter: any;
        if (typeof (Intl as any).Segmenter !== 'undefined') {
          // Use 'en' as fallback if currentLang is unavailable
          segmenter = new (Intl as any).Segmenter(this.langService.currentLang || 'en', { granularity: 'grapheme' });
        }
        
        hero.innerHTML = lines.map(line => {
            let graphemes: string[] = [];
            if (segmenter) {
              graphemes = Array.from(segmenter.segment(line)).map((s: any) => s.segment);
            } else {
              // Fallback for older browsers (might break Indic shaping, but safe fallback)
              graphemes = Array.from(line);
            }
            
            return graphemes.map(ch => 
              `<span class="hero-char d-inline-block">${ch === ' ' ? '&nbsp;' : ch}</span>`
            ).join('');
        }).join('<br>');
      }

      gsap.set('.hero-char', { opacity: 0, yPercent: 100, filter: 'blur(10px)' });

      // Hero Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.to('.hero-eyebrow', { opacity: 1, duration: 1, delay: 0.2 })
        .to('.hero-char', { opacity: 1, yPercent: 0, filter: 'blur(0px)', duration: 1, stagger: 0.03, ease: 'power4.inOut' }, '-=0.8')
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

      // Grid Section Animations
      if (this.gridSection) {
        const gridTl = gsap.timeline({
          scrollTrigger: {
            trigger: this.gridSection.nativeElement,
            start: 'top 70%'
          }
        });

      gridTl.to('.iso-grid-line', {
        strokeDashoffset: 0,
        duration: 1.5,
        stagger: {
          amount: 1,
          from: "random"
        },
        ease: 'power2.inOut'
      })
      .to('.apple-walking-img', {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'back.out(1.7)'
      }, "-=1")
      .to('.apple-text-2', {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
      }, "-=1.5");
      }

      // Why We Built This Animation
      gsap.to('.apple-text-3', {
        scrollTrigger: {
          trigger: this.whySection.nativeElement,
          start: 'top 80%'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });

    }, this.mainContainer.nativeElement);
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
