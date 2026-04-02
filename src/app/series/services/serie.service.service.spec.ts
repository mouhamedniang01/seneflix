import { TestBed } from '@angular/core/testing';

import { SerieServiceService } from './serie.service.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('SerieServiceService', () => {
  let service: SerieServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({  providers: [provideZonelessChangeDetection()],});
    service = TestBed.inject(SerieServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
