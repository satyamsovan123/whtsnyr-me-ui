import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoaderComponent } from './components/loader/loader';
import { ToastComponent } from './components/toast/toast';
import { SeoService } from './services/seo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private router = inject(Router);
  private seo = inject(SeoService);

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Find the current route's data
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
  }
}
