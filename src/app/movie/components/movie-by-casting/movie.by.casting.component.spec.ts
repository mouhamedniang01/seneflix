import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieByCastingComponent } from './movie.by.casting.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import {provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { MOVIE } from './mocked.data'; 
import { MovieCast } from '../../../people/models/movie.cast'; 
import { LocalStorageService } from '../../../core/services/local-storage/local-storage.service';
import { CastMovieService } from '../../../people/service/cast-movie/cast.movie.service';
import { signal} from '@angular/core';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

 

describe('MovieByCastingComponent', () => {
  let component: MovieByCastingComponent;
  let fixture: ComponentFixture<MovieByCastingComponent>;
  let localStorage: LocalStorageService;


  const mockCastMovieService = {
      loadMovieBypeopleId: vi.fn().mockReturnValue({
        hasValue:vi.fn().mockReturnValue(true),
        value: vi.fn().mockReturnValue(MOVIE),
      }),
  };

  const mockLocalStorage = {
    getLanguage: vi.fn().mockReturnValue(signal('fr-FR')) //return signal<string>
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieByCastingComponent],
      providers: [
        {
          provide: CastMovieService,
          useValue: mockCastMovieService,
        },
        {
          provide: LocalStorageService,
          useValue: mockLocalStorage,
        },
        provideHttpClientTesting(),
        provideHttpClient(),
        provideZonelessChangeDetection(),
        provideRouter([
          { path: 'movie/:id', component: MovieByCastingComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieByCastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create MovieByCastingComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display movie by cast ID from route parameters', async() => {
   const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('movie/123');

    const moviesbyPersonIdResources =  mockCastMovieService.loadMovieBypeopleId();

    const originalTile = (
      moviesbyPersonIdResources.value() as MovieCast
    ).cast[0].original_title?.toString();
    
    expect(originalTile).toBe('Легенда о Коловрате');
  });

  it('should retrieves french as language on local storage', () => {
    const languageSignal = mockLocalStorage.getLanguage(); //retrieves language
    expect(languageSignal()).toBe('fr-FR');
  });

  it('should retrieve personId on url ', async() => {
    const location = TestBed.inject(Location);

    
    const harness = await RouterTestingHarness.create(); // initialize the route

    await  harness.navigateByUrl('movie/123');

    const component = harness.routeDebugElement?.componentInstance;
    // Que vérifies-tu ici ?
    const id = component.personId();
   
    expect(component).toBeTruthy();
    expect(parseInt(id)).toBe(123); 
  });

});


