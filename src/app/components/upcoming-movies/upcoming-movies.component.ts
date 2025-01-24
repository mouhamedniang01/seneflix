import {Component,  OnInit, signal, WritableSignal} from '@angular/core';

import {MovieCardComponent} from '../movie-card/movie-card.component';
import {MoviesListService} from '../../services/movies-list.service';
import {Observable} from 'rxjs';
import {Movie} from '../../models/movie';
import {AsyncPipe} from '@angular/common';
import {LoggingInterceptor} from '../../interceptors/logging.interceptor';
// Import your library
import { SlickCarouselModule} from 'ngx-slick-carousel'; 
import { ImageModule } from 'primeng/image';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-upcoming-movies',
  imports: [ImageModule, AsyncPipe,SlickCarouselModule,CardModule],
  templateUrl: './upcoming-movies.component.html',
  standalone: true,
  providers:[SlickCarouselModule,MoviesListService,LoggingInterceptor],
  styleUrl: './upcoming-movies.component.css'
})
export class UpcomingMoviesComponent  implements  OnInit{

  // params page & language
  pageNumber :WritableSignal<number> = signal<number>(1);
  language : WritableSignal<string> = signal<string>('fr-FR');
  movies$!: Observable<Movie>;
  posterWidth = signal('w300');
  constructor(readonly upComingMovieService:MoviesListService,readonly router:Router) {}

  ngOnInit(): void {
        this.fetchIncomingMovies();
  }


  // get all informations on all incoming movies
  fetchIncomingMovies(){
    this.movies$ = this.upComingMovieService
      .getUpcommingMovies(this.language(), this.pageNumber());
  }
  //navige to movie detail page
  //navigate to movie details page
  goToDetailPage(movieId:number) {
    this.router.navigateByUrl(`movies/details/${movieId}`).then();
  }

  // for slick carrousel slider
  slideConfig:{
    slidesToShow:number,slidesToScroll:number,
    autoplay:boolean,dots:boolean, arrows:boolean,
    autoplaySpeed:number, draggable:boolean} =
  {
    "slidesToShow": 4,
    "slidesToScroll": 4,
    autoplay: true,
    dots:false,
    arrows: false,
    autoplaySpeed: 3000,
    draggable: true
  };



}
