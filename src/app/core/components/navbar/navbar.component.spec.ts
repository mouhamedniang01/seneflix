import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { describe, beforeEach, it, expect, vitest, inject } from 'vitest';
import testProviders from '../../../../test-providers';  
import { mockedObjectMedia, MOVIES } from './data';
import { provideRouter, Router } from '@angular/router';
import { Location } from '@angular/common';
import { provideLocationMocks } from '@angular/common/testing';
import { MovieDetailsComponent } from '../../../movie/components/movie-details/movie-details.component'; 
import { of, observeOn, asapScheduler } from 'rxjs';
import { MovieService } from '../../../movie/services/movie/movie.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router; 
  
  const fakeService = {
    getMovies() {
      const moviesList = MOVIES.results;
      return of([...moviesList]).pipe(observeOn(asapScheduler));
    },
  } as Partial<MovieService>;

   

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, MovieDetailsComponent],
      providers: [
        { provide: MovieService, useValue: fakeService },
        testProviders,
        provideLocationMocks(), //  is the standalone version of RouterTestingModule
        provideRouter([
          { path: 'movies/:id/details', component: MovieDetailsComponent },
        ]),
      ],
    }).compileComponents();

    //mock windows.Media
    mockedObjectMedia;

    router = TestBed.inject(Router);
    

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   

  
  it('should create navbarcomponent', () => {
    expect(component).toBeTruthy();
  });

 
  it('should navigate on movies detail ', async () => {
    const location = TestBed.inject(Location);
    await router.navigateByUrl(`movies/123/details`); 
    fixture.detectChanges();
    expect(location.path()).toBe('/movies/123/details');
  });
});
