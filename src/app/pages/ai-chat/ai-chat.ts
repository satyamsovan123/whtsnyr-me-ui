import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language';
import { ApiService } from '../../services/api';
import { LocationService } from '../../services/location';
import { ChangeDetectorRef } from '@angular/core';
import { AiMessage, AiCardData, AiChatResponse } from '../../models';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container d-flex flex-column bg-white h-100 max-w-desktop mx-auto">
      
      <!-- Fixed Header & Options -->
      <div class="px-4 pt-4 pb-2 bg-white" style="z-index: 10; border-bottom: 1px solid rgba(0,0,0,0.05);">
        <h1 class="fw-bold fs-2 mb-3">{{ labels.AI_CHAT.HEADER_TITLE }}</h1>
        <div class="d-flex flex-nowrap overflow-auto gap-2 no-scrollbar pb-2">
          <button (click)="currentInput = labels.AI_CHAT.FIND_LOCAL_FOOD; sendMessage()" class="btn btn-outline rounded-pill text-secondary btn-sm px-3 py-2 border-light bg-light bg-opacity-50 text-start text-truncate flex-shrink-0" style="width: 160px;"><i class="bi bi-search me-2"></i> {{ labels.AI_CHAT.FIND_LOCAL_FOOD }}</button>
          <button (click)="currentInput = labels.AI_CHAT.PLAN_EVENING; sendMessage()" class="btn btn-outline rounded-pill text-secondary btn-sm px-3 py-2 border-light bg-light bg-opacity-50 text-start text-truncate flex-shrink-0" style="width: 160px;"><i class="bi bi-moon me-2"></i> {{ labels.AI_CHAT.PLAN_EVENING }}</button>
          <button (click)="currentInput = labels.AI_CHAT.HIDDEN_GEMS; sendMessage()" class="btn btn-outline rounded-pill text-secondary btn-sm px-3 py-2 border-light bg-light bg-opacity-50 text-start text-truncate flex-shrink-0" style="width: 160px;"><i class="bi bi-gem me-2"></i> {{ labels.AI_CHAT.HIDDEN_GEMS }}</button>
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
              <p class="mb-3 text-secondary">{{ msg.text }}</p>
              
              <!-- Typing Indicator -->
              <div *ngIf="msg.isTyping" class="d-flex gap-1 align-items-center mb-2" style="height: 24px;">
                <div class="spinner-grow spinner-grow-sm text-secondary" style="width: 6px; height: 6px;" role="status"></div>
                <div class="spinner-grow spinner-grow-sm text-secondary" style="width: 6px; height: 6px; animation-delay: 0.2s;" role="status"></div>
                <div class="spinner-grow spinner-grow-sm text-secondary" style="width: 6px; height: 6px; animation-delay: 0.4s;" role="status"></div>
              </div>

              <!-- Cafe Card -->
              <div class="min-card p-3 shadow-sm border border-light" *ngIf="msg.showCard && msg.cardData">
                <div class="d-flex gap-3 mb-3">
                  <div class="rounded-3 flex-shrink-0" [style.background]="msg.cardData.imageUrl ? 'url(' + msg.cardData.imageUrl + ') center/cover' : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'" style="width: 80px; height: 80px;"></div>
                  <div>
                    <h6 class="fw-bold mb-1 fs-6">{{ msg.cardData.name }}</h6>
                    <p class="small text-secondary mb-1">{{ msg.cardData.distance }} • <i class="bi bi-star-fill text-warning"></i> {{ msg.cardData.rating }} <span class="text-success ms-1" *ngIf="msg.cardData.isOpen">Open</span><span class="text-danger ms-1" *ngIf="msg.cardData.isOpen === false">Closed</span></p>
                    <p class="small text-tertiary mb-0 lh-sm" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">{{ msg.cardData.description }}</p>
                  </div>
                </div>
                <div class="d-flex gap-2">
                  <a [href]="getDirectionsUrl(msg.cardData)" target="_blank" class="btn btn-outline border-light btn-sm flex-grow-1 fw-bold rounded-pill text-secondary d-flex justify-content-center align-items-center text-decoration-none" style="height: 38px;">
                    <i class="bi bi-geo-alt me-1"></i> {{ labels.AI_CHAT.DIRECTIONS }}
                  </a>
                  <a [href]="msg.cardData.swiggyLink || '#'" target="_blank" *ngIf="msg.cardData.swiggyLink" class="btn btn-outline border-light btn-sm flex-grow-1 fw-bold rounded-pill text-dark d-flex justify-content-center align-items-center text-decoration-none" style="height: 38px;">
                    <img src="/swiggy-logo.png" alt="Swiggy" height="16" class="me-1" style="object-fit: contain;"> {{ labels.AI_CHAT.ORDER }}
                  </a>
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
  private apiService = inject(ApiService);
  private locationService = inject(LocationService);
  private cdr = inject(ChangeDetectorRef);
  get labels() { return this.langService.labels; }

  currentInput = '';
  messages: AiMessage[] = [];

  constructor() {
    this.messages = [];
  }

  async sendMessage() {
    if (!this.currentInput.trim()) return;
    
    const userMessage = this.currentInput;
    this.currentInput = '';
    
    // Add user message
    this.messages.push({ sender: 'user', text: userMessage, showCard: false, isTyping: false });
    
    // Simulate AI thinking
    const aiMsgIndex = this.messages.length;
    this.messages.push({ sender: 'ai', text: this.labels.AI_CHAT.THINKING, showCard: false, isTyping: true });
    
    try {
      const coords = this.locationService.coords();
      // Exclude the current user message (the last one before 'Thinking...') from history
      const history = this.messages
        .filter(m => !m.isTyping && m.text !== this.labels.AI_CHAT.THINKING)
        .slice(0, -1) 
        .map(m => ({ role: m.sender === 'ai' ? 'model' : 'user', text: m.text }));

      const payload = {
        message: userMessage,
        latitude: coords?.lat,
        longitude: coords?.lng,
        history,
        language: this.langService.currentLang
      };

      const result = await this.apiService.post<AiChatResponse>('/api/v1/insights/chat', payload);
      this.messages[aiMsgIndex] = {
        sender: 'ai',
        text: result.text,
        showCard: result.showCard,
        cardData: result.cardData,
        isTyping: false
      };
    } catch (err) {
      this.messages[aiMsgIndex] = {
        sender: 'ai',
        text: "I'm sorry, I couldn't connect to my brain. Please try again.",
        showCard: false,
        isTyping: false
      };
    } finally {
      // Force change detection just in case
      this.cdr.detectChanges();
    }
  }

  getDirectionsUrl(cardData: AiCardData): string {
    if (cardData.mapLink) return cardData.mapLink;
    if (cardData.name) {
      const coords = this.locationService.coords();
      if (coords) {
        return `https://www.google.com/maps/dir/?api=1&origin=${coords.lat},${coords.lng}&destination=${encodeURIComponent(cardData.name)}`;
      }
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cardData.name)}`;
    }
    return '#';
  }
}
