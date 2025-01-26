import {AfterViewInit, Component, OnInit, signal, WritableSignal} from '@angular/core';
import {MovieCarouselComponent} from '../movie-carousel/movie-carousel.component';
import {SwiperCategoryComponent} from '../swiper-category/swiper-category.component';
import {Observable} from 'rxjs';
import {Movies} from '../../models/movies';
import {MoviesListService} from '../../services/movies-list.service';
import {Router} from '@angular/router';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {LoggingInterceptor} from '../../interceptors/logging.interceptor';
import {AsyncPipe} from '@angular/common';
import {TimeWindowEnum} from '../../enums/time-window.enum';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-home',
  imports: [MovieCarouselComponent, SwiperCategoryComponent, AsyncPipe],
  templateUrl: './home.component.html',
  standalone: true,
  providers:[SlickCarouselModule,MoviesListService,LoggingInterceptor],
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,AfterViewInit{
  upcomingMovies$!: Observable<Movies>;
  trending$ !: Observable<Movies>;
  currentLanguage :string= 'en-EN';
  // params page & language
  pageNumber :WritableSignal<number> = signal<number>(1);


  constructor(
    readonly moviesListService:MoviesListService,
   public localStorageService:LocalStorageService
    , readonly router:Router) {}

  ngOnInit(): void {
    this.fetchIncomingMovies();
    this.fetchTrending();
  }
  ngAfterViewInit(): void {
    this.currentLanguage =this.localStorageService.getLanguage('language')!.toString();
    alert(this.currentLanguage.toString());
  }



  // get all informations on all incoming movies
  fetchIncomingMovies():void{
    this.upcomingMovies$ = this.moviesListService.getUpcommingMovies('en-EN', this.pageNumber());
  }

  //get all information on trending

  fetchTrending():void{
    this.trending$ = this.moviesListService.getTrendingAll(TimeWindowEnum.DAY,'en-EN');
  }


}
