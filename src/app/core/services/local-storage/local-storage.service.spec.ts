import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

//tester l'insertion d'une langue dans le stockage local
describe('should insert a language on localstorage', () => {
  let service: LocalStorageService;
  // injecter LocalStorageService avant chaque teste unitaire
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService); 
    
    it('Should be  on local storage ',
      () => {
        service.setLanguage('Spanish'); //  insertions dans le stockage local

        let spanish = service.getLanguage(); // récupération de la valeur de la langue
        
        //Assertions
        expect(spanish).not.toBe('french');
        expect(spanish).toBe('Spanish');
      }
    );
  })
})
