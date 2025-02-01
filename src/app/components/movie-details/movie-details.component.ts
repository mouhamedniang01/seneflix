import { Component, OnInit, signal, WritableSignal,} from '@angular/core';
import {MovieService} from '../../services/movie/movie.service';
import {CardModule} from 'primeng/card';
import {  Observable} from 'rxjs';
import {MovieDetail} from '../../models/movie-detail';
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {LoggingInterceptor} from '../../interceptors/logging.interceptor';
import {GalleriaModule} from 'primeng/galleria';
import {Button} from 'primeng/button';
import {DialogWidgetComponent} from '../dialog-widget/dialog-widget.component';
import {Video} from '../../models/video';
import { FormsModule} from '@angular/forms';
import {Rating} from 'primeng/rating';
import { Credits} from '../../models/credits';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import {Carousel} from 'primeng/carousel';
import {Movies} from '../../models/movies';
import { TabContentComponent } from "../tab-content/tab-content.component";
import { TabsModule } from 'primeng/tabs';
import {Image} from 'primeng/image';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-movie-details',
  imports: [CardModule, AsyncPipe, CardModule, AnimateOnScrollModule,
    GalleriaModule, Button, DialogWidgetComponent, FormsModule,
    Rating, Carousel, TabsModule, TabContentComponent, Image],
  templateUrl: './movie-details.component.html',
  standalone: true,
  providers: [MovieService,LoggingInterceptor],
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit{
  movie$ !: Observable<MovieDetail>;
  movieId: number = 0;
  language : WritableSignal<string>=signal('');
  video$ !: Observable<Video>;
  isDialogVisible:boolean = false;
  credits$!:Observable <Credits>;
  similarMovies$!:Observable<Movies>;
  recommendedMovies$!:Observable<Movies>;
  tabs: { title: string; value: number}[] = [];
  pageNumber:number = 1 ;

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

  constructor(readonly movieService: MovieService,readonly activeRoute: ActivatedRoute,
  private  localStorage:LocalStorageService) { }

  ngOnInit(): void {
    this.movieId = this.activeRoute.snapshot.params['id'];
    this.language.set( this.localStorage.getLanguage('language')!);
    this.getMovieDetail(this.movieId,this.language());
    this.getvideoInfos(this.movieId,this.language());
    this.getCredits(this.movieId,this.language());
    this.getSimilar(this.movieId,this.language())
    this.setTab();
    this.getRecommandation(this.movieId,this.language(),this.pageNumber);
  }




  //get current movie's credits
  getCredits(movieId:number,language:string){
    this.credits$  = this.movieService.fetchMovieCredit(movieId,language);
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
    this.recommendedMovies$ = this.movieService.fetchRecommendedationsMovie(movieId,language,pageNumber);
  }

  //set tab
  setTab() {
    this.tabs = [
      { title: 'Similaries', value: 0 },
      { title: 'Recommandation ', value: 1}
  ];
  }
}
