import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { describe, it, expect, beforeEach, vi} from 'vitest'; 

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  // injecter LocalStorageService avant chaque teste unitaire
  beforeEach(() => {
    // Nettoyer le localStorage pour repartir à zéro à chaque test
    window.localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  

  it('Should be  on local storage ',
    () => {
      // Espionner la méthode native du navigateur
      const setItemSpy = vi.spyOn(
        Storage.prototype, 'setItem'
      );

      localStorage.clear(); //nettoyage du local storage avant chaque exécution

      service.setLanguage('Spanish'); //  insertions dans le stockage local
      let spanishSignal = service.getLanguage(); // récupération de le signal de la langue

      const spanish = spanishSignal();
      //Assertions
      expect(spanish).not.toBe('french');
      expect(spanish).toBe('Spanish');
      expect(localStorage.getItem('language')).toBe('Spanish');
    }
  );

  it('should initialize with fr-FR by default if storage is empty', () => {
    const languageSignal = service.getLanguage();

    // Comme on a fait clear() dans le beforeEach, ici c'est vide
    expect(languageSignal()).toBe('fr-FR');
  });
})
