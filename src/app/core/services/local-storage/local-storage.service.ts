import {Injectable, Signal, signal} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  private languageSignal = signal<string>(
    localStorage.getItem('language') ?? 'fr-FR'
  );

  getLanguage(): Signal<string> {
    return this.languageSignal.asReadonly();
  }

  setLanguage(lang: string):void {
    localStorage.setItem('language', lang);
    this.languageSignal.set(lang);
  }

}
