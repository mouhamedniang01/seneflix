import { TestBed } from '@angular/core/testing';

import { GenreService } from './genre.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('GenreService', () => {
  let service: GenreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
