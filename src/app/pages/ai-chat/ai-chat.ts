import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container d-flex flex-column bg-white h-100 max-w-desktop mx-auto">
      
      <!-- Fixed Header & Options -->
      <div class="px-4 pt-4 pb-2 bg-white" style="z-index: 10; border-bottom: 1px solid rgba(0,0,0,0.05);">
        <h1 class="fw-bold fs-2 mb-3">{{ labels.AI_CHAT.HEADER_TITLE }}</h1>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-outline rounded-pill text-secondary btn-sm px-3 py-2 border-light bg-light bg-opacity-50"><i class="bi bi-search me-2"></i> {{ labels.AI_CHAT.FIND_LOCAL_FOOD }}</button>
          <button class="btn btn-outline rounded-pill text-secondary btn-sm px-3 py-2 border-light bg-light bg-opacity-50"><i class="bi bi-moon me-2"></i> {{ labels.AI_CHAT.PLAN_EVENING }}</button>
          <button class="btn btn-outline rounded-pill text-secondary btn-sm px-3 py-2 border-light bg-light bg-opacity-50"><i class="bi bi-gem me-2"></i> {{ labels.AI_CHAT.HIDDEN_GEMS }}</button>
          <button class="btn btn-outline rounded-pill text-secondary btn-sm px-3 py-2 border-light bg-light bg-opacity-50"><i class="bi bi-people me-2"></i> {{ labels.AI_CHAT.FAMILY_OUTING }}</button>
          <button class="btn btn-outline rounded-pill text-secondary btn-sm px-3 py-2 border-light bg-light bg-opacity-50"><i class="bi bi-cart me-2"></i> {{ labels.AI_CHAT.BUILD_GROCERY }}</button>
        </div>
      </div>

      <!-- Scrollable Chat Area -->
      <div class="flex-grow-1 overflow-auto px-4 py-4" data-lenis-prevent="true">

        <!-- Dynamic Chat History -->
        <ng-container *ngFor="let msg of messages">
          <!-- User Message -->
          <div *ngIf="msg.sender === 'user'" class="d-flex justify-content-end mb-4 fade-in">
            <div class="bg-inverse px-4 py-3 rounded-4 rounded-bottom-end-0 shadow-sm" style="max-width: 85%;">
              {{ msg.text }}
            </div>
          </div>
          
          <!-- AI Message -->
          <div *ngIf="msg.sender === 'ai'" class="d-flex justify-content-start mb-4 fade-in">
            <div class="text-primary w-100" style="max-width: 90%;">
              <p class="mb-3 text-secondary">{{ msg.text }} <i class="bi bi-emoji-smile" *ngIf="!msg.isTyping"></i></p>
              
              <!-- Typing Indicator -->
              <div *ngIf="msg.isTyping" class="d-flex gap-1 align-items-center mb-2" style="height: 24px;">
                <div class="spinner-grow spinner-grow-sm text-secondary" style="width: 6px; height: 6px;" role="status"></div>
                <div class="spinner-grow spinner-grow-sm text-secondary" style="width: 6px; height: 6px; animation-delay: 0.2s;" role="status"></div>
                <div class="spinner-grow spinner-grow-sm text-secondary" style="width: 6px; height: 6px; animation-delay: 0.4s;" role="status"></div>
              </div>

              <!-- Cafe Card (Only if it's the specific recommendation) -->
              <div class="min-card p-3 shadow-sm border border-light" *ngIf="msg.showCard">
                <div class="d-flex gap-3 mb-3">
                  <div class="rounded-3 flex-shrink-0" style="width: 80px; height: 80px; background-image: url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=400&auto=format&fit=crop'); background-size: cover;"></div>
                  <div>
                    <h6 class="fw-bold mb-1 fs-6">Kala Ghoda Café</h6>
                    <p class="small text-secondary mb-1">1.2 km • <i class="bi bi-star-fill text-warning"></i> 4.6 <span class="text-success ms-1">Open</span></p>
                    <p class="small text-tertiary mb-0 lh-sm" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Cozy ambience, great coffee and beautiful decor.</p>
                  </div>
                </div>
                <div class="d-flex gap-2">
                  <button class="btn btn-outline border-light btn-sm flex-grow-1 fw-bold rounded-pill text-secondary">
                    <i class="bi bi-geo-alt me-1"></i> {{ labels.AI_CHAT.DIRECTIONS }}
                  </button>
                  <button class="btn btn-outline border-light btn-sm flex-grow-1 fw-bold rounded-pill text-dark d-flex justify-content-center align-items-center">
                    <img src="https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg" alt="Swiggy" height="14" class="me-1"> {{ labels.AI_CHAT.ORDER }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ng-container>
        
      </div>

      <!-- Input Area -->
      <div class="p-3 border-top bg-white pb-4 pb-md-3">
        <div class="input-group bg-light rounded-pill p-1 border">
          <input type="text" class="form-control border-0 bg-transparent shadow-none ps-3" [placeholder]="labels.AI_CHAT.PLACEHOLDER" [(ngModel)]="currentInput" (keyup.enter)="sendMessage()">
          <button class="btn btn-link text-secondary text-decoration-none shadow-none" (click)="sendMessage()"><i class="bi bi-send-fill fs-5"></i></button>
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
export class AiChatComponent {
  private langService = inject(LanguageService);
  get labels() { return this.langService.labels; }

  currentInput = '';
  messages = [
    { sender: 'user', text: 'Suggest a nice cafe nearby', showCard: false, isTyping: false },
    { sender: 'ai', text: 'Here are some of the best cafés near you', showCard: true, isTyping: false }
  ];

  sendMessage() {
    if (!this.currentInput.trim()) return;
    
    // Add user message
    this.messages.push({ sender: 'user', text: this.currentInput, showCard: false, isTyping: false });
    this.currentInput = '';
    
    // Simulate AI thinking
    const aiMsgIndex = this.messages.length;
    this.messages.push({ sender: 'ai', text: 'Thinking...', showCard: false, isTyping: true });
    
    setTimeout(() => {
      this.messages[aiMsgIndex] = { 
        sender: 'ai', 
        text: 'That sounds like a great plan! The backend integration will handle this soon.', 
        showCard: false, 
        isTyping: false 
      };
    }, 1500);
  }
}
