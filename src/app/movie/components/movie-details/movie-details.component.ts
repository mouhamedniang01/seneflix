import { Component, OnInit, signal, WritableSignal,} from '@angular/core';
import {MovieService} from '../../services/movie/movie.service';
import {CardModule} from 'primeng/card';
import {  map, Observable} from 'rxjs';
import {MovieDetail} from '../../../movie-lists/models/movie-detail';
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {GalleriaModule} from 'primeng/galleria';
import {Button} from 'primeng/button';
import {DialogWidgetComponent} from '../../../share-ui/dialog-widget/dialog-widget.component';
import {Video} from '../../../movie-lists/models/video';
import { FormsModule} from '@angular/forms';
import {Rating} from 'primeng/rating';
import { Cast, Credits} from '../../../movie-lists/models/credits';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import {Carousel} from 'primeng/carousel';
import {Movies} from '../../../movie-lists/models/movies';
import { TabContentComponent } from "../../../share-ui/tab-content/tab-content.component";
import { TabsModule } from 'primeng/tabs';
import {Image, ImageModule} from 'primeng/image';
import {LocalStorageService} from '../../../core/services/local-storage/local-storage.service';
import {Images} from '../../../movie-lists/models/images';
import {MoviesListService} from '../../../movie-lists/services/movies-list.service';
import {GaleriaImageComponent} from '../../../share-ui/galeria-image/galeria-image.component';
import { AnimateOnScrollCastComponent } from "../../../share-ui/animate-on-scroll-cast/animate-on-scroll-cast.component";

@Component({
  selector: 'app-movie-details',
  imports: [CardModule, AsyncPipe, CardModule, AnimateOnScrollModule,
    GalleriaModule, Button, DialogWidgetComponent, FormsModule,
    Rating, TabsModule, TabContentComponent, ImageModule,],
  templateUrl: './movie-details.component.html',
  standalone: true,
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit{
  movie$ !: Observable<MovieDetail>;
  movieId: number = 0;
  language : WritableSignal<string>=signal('');
  video$ !: Observable<Video>;
  isDialogVisible:boolean = false;
  credits$!:Observable <Credits>;
  castings$!:Observable<Cast[]>;
  casts!:Observable<Cast[]>;
  similarMovies$!:Observable<Movies>;
  recommendedMovies$!:Observable<Movies>;
  public tabs: { title: string; value: number}[] = [];
  pageNumber:number = 1 ;
  images$!: Observable<Images>;

  includImageLang='en,null';

  constructor(readonly movieService: MovieService,readonly activeRoute: ActivatedRoute,
  private readonly  localStorage:LocalStorageService,private  readonly  movieListService:MoviesListService) { }

  ngOnInit(): void {
    this.movieId = this.activeRoute.snapshot.params['id'];
    this.language.set( this.localStorage.getLanguage('language')!);
    this.getMovieDetail(this.movieId,this.language());
    this.getvideoInfos(this.movieId,this.language());
    this.getCredits(this.movieId,this.language());
    this.setTab();// for tab similars & recommandations movies
    this.showMoviesPicture(this.movieId,this.language(),this.includImageLang); //inject galleria
  }

  // show galleries image
  showMoviesPicture(idMovie:number,language:string,includeImageLanguage:string){
    this.images$ = this.movieListService.getMoviesImages(idMovie,includeImageLanguage,language);
  }


  //get current movie's credits
  getCredits(movieId:number,language:string){
    this.castings$ = this.movieService.fetchMovieCredit(movieId,language).pipe(
      map((data: Credits):Cast[] => {
        const casting:Cast[]= data.cast;
        return casting.slice(0, 8); // get first 9 castings
      }
      ));
  }

  //get movie details from movie id by url
  getMovieDetail(movieId: number,langue:string):void{
    this.movie$ = this.movieService.fetchMovieDetails(movieId,langue);
  }

  // get movie's video information  from youtube
  getvideoInfos(movieId:number,language:string):void{
    this.video$ = this.movieService.fetchVideoInfos(movieId,language);
  }

  // on show dialog
  showDialog() {
    this.isDialogVisible = true;
  }


   //similar movies
  getSimilar(movieId:number,language:string):void{
    this.similarMovies$ = this.movieService.fetchSimilarMovie(movieId,language);
  }
  //get recommandation's movie
  getRecommandation(movieId:number,language:string,pageNumber:number):void{
    this.recommendedMovies$ = this.movieListService.fetchRecommendedationsMovie(movieId,language,pageNumber);
  }

  //inject similar & recommanded movies
  setTab() {
    this.getSimilar(this.movieId,this.language());
    this.getRecommandation(this.movieId,this.language(),this.pageNumber);
    this.tabs = [
      { title: 'Similaries', value: 0 },
      { title: 'Recommandation ', value: 1}
  ];
  }


  //responsive carousel options
  responsiveOptions:WritableSignal<any[] | undefined> = signal(
    [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
      }
    ]
  );
}
