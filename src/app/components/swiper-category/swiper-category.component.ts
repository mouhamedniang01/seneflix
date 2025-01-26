import {Component, input, InputSignal, OnInit, signal, WritableSignal} from '@angular/core';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {MoviesListService} from '../../services/movies-list.service';
import {LoggingInterceptor} from '../../interceptors/logging.interceptor';
import {ImageModule} from 'primeng/image';
import {CardModule} from 'primeng/card';
import {Observable} from 'rxjs';
import {Movies} from '../../models/movies';
import {Router} from '@angular/router';

@Component({
  selector: 'app-swiper-category',
  imports: [ImageModule, SlickCarouselModule,CardModule],
  standalone:true,
  providers:[SlickCarouselModule,MoviesListService,LoggingInterceptor],
  templateUrl: './swiper-category.component.html',
  styleUrl: './swiper-category.component.css'
})
export class SwiperCategoryComponent implements  OnInit{
  categoryTitle :InputSignal<string> = input.required<string>();
  // params page & language
  pageNumber :WritableSignal<number> = signal<number>(1);
  language : WritableSignal<string> = signal<string>('fr-FR');
  movies$!: Observable<Movies>;
  movies:InputSignal<Movies> = input.required<Movies>();

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
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: true,
      dots:false,
      arrows: false,
      autoplaySpeed: 3000,
      draggable: true
    };
}
