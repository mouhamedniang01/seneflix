import {Component, OnInit, signal, WritableSignal,} from '@angular/core';
import {MovieService} from '../../services/movie/movie.service';
import {CardModule} from 'primeng/card';
import {Observable} from 'rxjs';
import {MovieDetail} from '../../models/movie-detail';
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {LoggingInterceptor} from '../../interceptors/logging.interceptor';
import {GalleriaModule} from 'primeng/galleria';
import {Button} from 'primeng/button';
import {DialogWidgetComponent} from '../dialog-widget/dialog-widget.component';
import {Video} from '../../models/video';
import {FormsModule} from '@angular/forms';
import {Rating} from 'primeng/rating';
import { Credits} from '../../models/credits';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import {Carousel} from 'primeng/carousel';
import {Tag} from 'primeng/tag';
import {Skeleton} from 'primeng/skeleton';


@Component({
  selector: 'app-movie-details',
  imports: [CardModule, AsyncPipe, CardModule, AnimateOnScrollModule,
    GalleriaModule, Button, DialogWidgetComponent, FormsModule, Rating, Carousel,  Skeleton],
  templateUrl: './movie-details.component.html',
  standalone: true,
  providers: [MovieService,LoggingInterceptor],
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit{
  movie$ !: Observable<MovieDetail>;
  movieId: number = 0;
  language : string='en-EN';
  video$ !: Observable<Video>;
  isDialogVisible:boolean = false;
  credits$!:Observable <Credits>;
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

  constructor(private movieService: MovieService,readonly activeRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.movieId = this.activeRoute.snapshot.params['id'];
    this.getMovieDetail(this.movieId);
    this.getvideoInfos(this.movieId);
    this.getCredits(this.movieId);
  }
  //get current movie's credits
  getCredits(movieId:number){
    this.credits$  = this.movieService.fetchMovieCredit(movieId,this.language);
  }

  //get movie details from movie id by url
  getMovieDetail(movieId: number):void{
    this.movie$ = this.movieService.fetchMovieDetails(movieId,this.language);
  }

  // get movie's video information  from youtube
  getvideoInfos(movieId: number):void{
    this.video$ = this.movieService.fetchVideoInfos(movieId,this.language);
  }

  // on show dialog
  value: any;
  showDialog() {
    this.isDialogVisible = true;
  }


  //rate popularity
  getSeverity(status: number) {
    if(status >=60) {
      return 'success';
    }else if( status < 60 ) {
      return 'warn';
    }else {
        return 'danger';
    }
  }



}
