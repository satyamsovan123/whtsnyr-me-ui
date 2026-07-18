import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container d-flex flex-column bg-white h-100 max-w-desktop mx-auto">
      
      <!-- Scrollable Chat Area -->
      <div class="flex-grow-1 overflow-auto px-4 py-4 no-scrollbar">
        
        <!-- Empty State Header -->
        <div class="mb-5">
          <h1 class="fw-bold fs-2 mb-4">What do you<br>want to do today?</h1>
          
          <div class="d-flex flex-wrap gap-2">
            <button class="btn btn-outline rounded-pill text-secondary btn-sm px-3 py-2 border-light bg-light bg-opacity-50"><i class="bi bi-search me-2"></i> Find famous local food</button>
            <button class="btn btn-outline rounded-pill text-secondary btn-sm px-3 py-2 border-light bg-light bg-opacity-50"><i class="bi bi-moon me-2"></i> Plan my evening</button>
            <button class="btn btn-outline rounded-pill text-secondary btn-sm px-3 py-2 border-light bg-light bg-opacity-50"><i class="bi bi-gem me-2"></i> Hidden gems nearby</button>
            <button class="btn btn-outline rounded-pill text-secondary btn-sm px-3 py-2 border-light bg-light bg-opacity-50"><i class="bi bi-people me-2"></i> Family outing</button>
            <button class="btn btn-outline rounded-pill text-secondary btn-sm px-3 py-2 border-light bg-light bg-opacity-50"><i class="bi bi-cart me-2"></i> Build grocery cart</button>
          </div>
        </div>

        <!-- Chat History -->
        <div class="d-flex justify-content-end mb-4">
          <div class="bg-inverse px-4 py-3 rounded-4 rounded-bottom-end-0 shadow-sm" style="max-width: 85%;">
            Suggest a nice cafe nearby
          </div>
        </div>

        <div class="d-flex justify-content-start mb-4">
          <div class="text-primary w-100" style="max-width: 90%;">
            <p class="mb-3 text-secondary">Here are some of the best cafés near you <i class="bi bi-emoji-smile"></i></p>
            
            <!-- Cafe Card -->
            <div class="min-card p-3 shadow-sm border border-light">
              <div class="d-flex gap-3 mb-3">
                <div class="rounded-3 flex-shrink-0" style="width: 80px; height: 80px; background-image: url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=400&auto=format&fit=crop'); background-size: cover;"></div>
                <div>
                  <h6 class="fw-bold mb-1 fs-6">Kala Ghoda Café</h6>
                  <p class="small text-secondary mb-1">1.2 km • <i class="bi bi-star-fill text-warning"></i> 4.6 <span class="text-success ms-1">Open</span></p>
                  <p class="small text-tertiary mb-0 lh-sm" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Cozy ambience, great coffee and beautiful decor.</p>
                </div>
              </div>
              <div class="d-flex gap-2">
                <button class="btn btn-outline border-light btn-sm flex-grow-1 fw-bold rounded-pill text-secondary">View menu</button>
                <button class="btn btn-outline border-light btn-sm flex-grow-1 fw-bold rounded-pill text-secondary">More like this</button>
              </div>
            </div>
            
            <p class="small text-secondary mt-3 mb-2">You can order fast on Swiggy.</p>
            <button class="btn btn-swiggy w-100 rounded-pill d-flex align-items-center justify-content-center py-3">
              <img src="https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg" alt="Swiggy" height="20" class="me-2 filter-white" style="filter: brightness(0) invert(1);"> Order with Swiggy
            </button>
          </div>
        </div>
        
      </div>

      <!-- Input Area -->
      <div class="p-3 border-top bg-white pb-4 pb-md-3">
        <div class="input-group bg-light rounded-pill p-1 border">
          <input type="text" class="form-control border-0 bg-transparent shadow-none ps-3" placeholder="Ask anything...">
          <button class="btn btn-link text-secondary text-decoration-none shadow-none"><i class="bi bi-send-fill fs-5"></i></button>
        </div>
      </div>
      
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
    .max-w-desktop {
      max-width: 800px;
    }
  `]
})
export class AiChatComponent {}
