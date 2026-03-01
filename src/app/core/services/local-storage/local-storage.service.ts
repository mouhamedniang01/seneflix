import {Injectable, signal} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  private languageSignal = signal<string>(
    localStorage.getItem('language') ?? 'fr-FR'
  );

  getLanguage() {
    return this.languageSignal.asReadonly();
  }

  setLanguage(lang: string) {
    localStorage.setItem('language', lang);
    this.languageSignal.set(lang);
  }

}
