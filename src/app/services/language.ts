import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LABELS_EN } from '../constants/labels-en';
import { LABELS_HI } from '../constants/labels-hi';
import { LABELS_OD } from '../constants/labels-od';
import { LABELS_TE } from '../constants/labels-te';
import { LABELS_BN } from '../constants/labels-bn';
import { LABELS_TA } from '../constants/labels-ta';
import { LABELS_GJ } from '../constants/labels-gj';

const LABELS_MAP: Record<string, any> = {
  en: LABELS_EN,
  hi: LABELS_HI,
  od: LABELS_OD,
  te: LABELS_TE,
  bn: LABELS_BN,
  ta: LABELS_TA,
  gj: LABELS_GJ
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLangSubject = new BehaviorSubject<string>('en');
  public currentLang$ = this.currentLangSubject.asObservable();

  private labelsSubject = new BehaviorSubject<any>(LABELS_EN);
  public labels$ = this.labelsSubject.asObservable();

  constructor() {
    const savedLang = localStorage.getItem('app-lang') || 'en';
    this.setLanguage(savedLang);
  }

  get currentLang(): string {
    return this.currentLangSubject.value;
  }

  get labels(): any {
    return this.labelsSubject.value;
  }

  setLanguage(lang: string) {
    if (LABELS_MAP[lang]) {
      this.currentLangSubject.next(lang);
      this.labelsSubject.next(LABELS_MAP[lang]);
      localStorage.setItem('app-lang', lang);
    }
  }
}
