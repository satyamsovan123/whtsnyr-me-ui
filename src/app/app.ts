import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs/operators';
import { LoaderComponent } from './components/loader/loader';
import { ToastComponent } from './components/toast/toast';
import { SeoService } from './services/seo';
import { ThemeService } from './services/theme';
import { SidebarService } from './services/sidebar';
import { LocationService } from './services/location';
import { NavbarComponent } from './components/navbar/navbar';

// Declare Lenis since it is loaded via CDN
declare const Lenis: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, ToastComponent, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {
  private router = inject(Router);
  private seo = inject(SeoService);
  private theme = inject(ThemeService); // Init theme on load
  public sidebarService = inject(SidebarService);
  private locationService = inject(LocationService);
  private document = inject(DOCUMENT);

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.router.routerState.root;
      while (route.firstChild) {
        route = route.firstChild;
      }
      
      route.data.subscribe(data => {
        if (data['title']) {
          this.seo.updateSeoTags(data['title'], data['description'] || 'Discover amazing local places.');
        }
      });
    });

    // Ask for location on startup
    this.locationService.requestLocation().catch(err => {
      console.warn('User denied location or location not available:', err);
    });
  }

  ngAfterViewInit() {
    // Initialize Lenis on the native window
    setTimeout(() => {
      if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
        });

        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
      }
    }, 100);
  }
}
