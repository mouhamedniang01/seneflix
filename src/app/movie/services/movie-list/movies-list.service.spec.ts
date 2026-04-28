import { TestBed } from '@angular/core/testing';

import { MoviesListService } from './movies-list.service';
import { describe, beforeEach, it, expect } from 'vitest';
import testProviders from '../../../../test-providers';

describe('MoviesListService', () => {
  let service: MoviesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [testProviders]
    });
    service = TestBed.inject(MoviesListService);
  });

  it('should be created movie list\'s service ', () => {
    expect(service).toBeTruthy();
  });
});
