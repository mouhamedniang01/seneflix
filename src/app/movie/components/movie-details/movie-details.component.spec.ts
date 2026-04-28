import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { inject, provideZonelessChangeDetection } from '@angular/core';
import { MovieService } from '../../services/movie/movie.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { credit, mockedVideo, mockMovie, mockReviews, similarMovies } from './mocked.data';
import { LoggingInterceptor } from '../../../core/interceptors/logging.interceptor';
import { of, Subject } from 'rxjs';
import { MovieDetail } from '../../models/movie-detail';
describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let service: MovieService;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([
          {
            path: ':id', component: MovieDetailsComponent,title:'details'
          }
        ]
        ),
      ],
      providers: [ 
        provideHttpClient(),
        provideZonelessChangeDetection(),
        LoggingInterceptor, // inject interceptors for toke,
        provideHttpClientTesting(),
        { 
          provide: ActivatedRoute,
          useValue: {
            snapshot: {params: {id: 1523145}}
          }
        }
      ]
    })
      .compileComponents();
    
    const movieId: number = 1523145;
    
    const mockService = {
      fetchMovieDetails: vi.fn().mockReturnValue(
        of(mockMovie)
      ),
      
      fetchSimilarMovie: vi.fn().mockReturnValue(
        of(similarMovies)
      ),
        
      fetchMovieCredit: vi.fn().mockReturnValue(
        of(credit) //mocked credit
      ),
      fetchVideoMovie: vi.fn().mockReturnValue(
         of(mockedVideo)
      ),
      getDetailsByReviewId: vi.fn().mockReturnValue(
        of(mockReviews)
      )
    };
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    
 //   service = TestBed.inject(MovieService);
    //httpTestingController = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });



  it('should create movie details component', () => {
    expect(component).toBeTruthy();
  });

  const language = 'en-US';

  

/*  it('should retrieve movie details information', () => {
    const allGetRequests = httpTestingController.match({method: 'GET'});
    for (const req of allGetRequests) {
      // Handle responding to each request.
      expect(req.request.method).toBe('GET');
    }
   
    
    const Host: string = 'https://api.themoviedb.org/3';
    
  const req = httpTestingController.expectOne( `${Host}/movie/${movieId}?language=${language}&append_to_response=${language}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockMovie); 
  });  afterEach(() => {
    httpTestingController.verify();
  });
*/
});

 