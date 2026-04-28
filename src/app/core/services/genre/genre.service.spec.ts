import { TestBed } from '@angular/core/testing';

import { GenreService } from './genre.service';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { GenreOptions } from '../../models/genre';
import testProviders from '../../../../test-providers';
import { provideHttpClient } from '@angular/common/http';

describe('GenreService', () => {
  let service: GenreService;
  let mockHttp: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpTestingController,provideHttpClientTesting],
      providers: [GenreService, testProviders],
    });
    service = TestBed.inject(GenreService);
    mockHttp = TestBed.inject(HttpTestingController);

  });

  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieves movie\'s genre ', () => {
    const type = 'movie';
    const langue = 'fr-FR';
  
    const req = mockHttp.expectOne({ method:'GET',url: `https://api.themoviedb.org/3/genre/${type}/list?language=${langue}` });

    expect(req.request.method).toBe('GET');

    service.fetchGenres(type, langue)
      .subscribe((response) => {
        // 4. On vérifie que la réponse reçue est bien celle injectée par flush()
        expect(response.genres.length).toBeGreaterThan(2);
      });
  });

});
