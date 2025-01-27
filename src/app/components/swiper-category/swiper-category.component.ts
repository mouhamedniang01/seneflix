import {Component, input, InputSignal, OnInit, signal, WritableSignal} from '@angular/core';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {MoviesListService} from '../../services/movies-list.service';
import {LoggingInterceptor} from '../../interceptors/logging.interceptor';
import {ImageModule} from 'primeng/image';
import {CardModule} from 'primeng/card';
import {Observable} from 'rxjs';
import {Movies} from '../../models/movies';
import {Router} from '@angular/router';
import { Credits } from '../../models/credits';
import { MovieService } from '../../services/movie/movie.service';

@Component({
  selector: 'app-swiper-category',
  imports: [ImageModule, SlickCarouselModule,CardModule],
  standalone:true,
  providers:[SlickCarouselModule,MoviesListService,LoggingInterceptor],
  templateUrl: './swiper-category.component.html',
  styleUrl: './swiper-category.component.css'
})
export class SwiperCategoryComponent implements  OnInit{
  categoryTitle :InputSignal<string> = input<string>('');
  iconName :InputSignal<string> = input<string>('');
  // params page & language
  pageNumber :WritableSignal<number> = signal<number>(1);
  language : WritableSignal<string> = signal<string>('fr-FR');
  movies$!: Observable<Movies>;

  credits$ !:Observable<Credits>;
  credits: InputSignal<undefined| Credits> = input<Credits>();
  movies:InputSignal<Movies| undefined> = input<Movies>();

  constructor(readonly movieListService:MoviesListService,
    readonly movieService:MovieService,
    readonly router:Router) {}

  ngOnInit(): void {
    this.getCredits();
    this.fetchIncomingMovies();
  }

  // get the credits
  getCredits(){return this.credits;}

  // get all informations on all incoming movies
  fetchIncomingMovies(){
    this.movies$ = this.movieListService
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
