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
import {SelectButton} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [MovieCarouselComponent, SwiperCategoryComponent, AsyncPipe,  FormsModule],
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
  stateOptions: any[] = [{ label: 'Day', value: TimeWindowEnum.DAY },{ label: 'Week', value: TimeWindowEnum.WEEK }];

  value: TimeWindowEnum= TimeWindowEnum.DAY;

  constructor(
    readonly moviesListService:MoviesListService,
   public localStorageService:LocalStorageService
    , readonly router:Router) {}

  ngOnInit(): void {
    this.fetchIncomingMovies();
    this.fetchTrending(this.value);
  }
  ngAfterViewInit(): void {
    this.currentLanguage =this.localStorageService.getLanguage('language')!.toString();
//    alert(this.currentLanguage.toString());
  }



  // get all informations on all incoming movies
  fetchIncomingMovies():void{
    this.upcomingMovies$ = this.moviesListService.getUpcommingMovies('en-EN', this.pageNumber());
  }

  //get all information on trending

  fetchTrending(timeWindow:TimeWindowEnum):void{
    this.trending$ = this.moviesListService.getTrendingAll(timeWindow,'en-EN');
  }


}
