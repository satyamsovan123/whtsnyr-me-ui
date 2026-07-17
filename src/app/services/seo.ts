import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  updateSeoTags(title: string, description: string, keywords?: string) {
    this.titleService.setTitle(`${title} | Visitor Copilot`);
    
    this.metaService.updateTag({ name: 'description', content: description });
    
    if (keywords) {
      this.metaService.updateTag({ name: 'keywords', content: keywords });
    }
    
    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
  }
}
