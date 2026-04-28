import { TestBed } from '@angular/core/testing';

import { CastMovieService } from './cast.movie.service';
import { describe, beforeEach, it, expect } from 'vitest';

describe('CastMovieService', () => {
  let service: CastMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CastMovieService);
  });

  it('should be created a service', () => {
    expect(service).toBeTruthy();
  });
});
