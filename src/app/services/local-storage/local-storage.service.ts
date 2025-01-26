import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  // Set a value in local storage
  setLanguage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  // Get a value from local storage
  getLanguage(key: string): string | null {
    return localStorage.getItem(key);
  }

  // Remove a value from local storage
  removeLanguage(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all items from local storage
  clear(): void {
    localStorage.clear();
  }
}
