import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class UiService {
  public isLoading = signal<boolean>(false);
  public toasts = signal<ToastMessage[]>([]);
  private nextId = 0;

  showLoader() {
    this.isLoading.set(true);
  }

  hideLoader() {
    this.isLoading.set(false);
  }

  showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const id = this.nextId++;
    const toast: ToastMessage = { id, message, type };
    
    this.toasts.update(current => [...current, toast]);

    setTimeout(() => {
      this.removeToast(id);
    }, 3000);
  }

  removeToast(id: number) {
    this.toasts.update(current => current.filter(t => t.id !== id));
  }
}
