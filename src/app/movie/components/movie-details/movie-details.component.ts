import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {MovieService} from '../../services/movie/movie.service';
import {CardModule} from 'primeng/card';
import {combineLatest,  map,  Observable, switchMap} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {GalleriaModule} from 'primeng/galleria';
import {Video} from '../../models/video';
import { FormsModule} from '@angular/forms';
import { Cast, Credits} from '../../models/credits';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import {Movies, Result} from '../../models/movies';
import { TabsModule } from 'primeng/tabs';
import { ImageModule} from 'primeng/image';
import {LocalStorageService} from '../../../core/services/local-storage/local-storage.service';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {DetailsPageComponent} from '../../../share-ui/details-page/details-page.component';
import {ReviewComponentComponent} from '../../../reviews/components/review/review.component.component';
import {ReviewService} from '../../../services/reviews/review.service';
import {Review} from '../../../reviews/models/review';
import {MovieDetail} from '../../models/movie-detail';
import {MoviesListService} from '../../services/movie-list/movies-list.service';
@Component({
  selector: 'app-movie-details',
  imports: [CardModule, CardModule, AnimateOnScrollModule,
    GalleriaModule, FormsModule,
   TabsModule,  ImageModule, DetailsPageComponent,ReviewComponentComponent],
  templateUrl: './movie-details.component.html',
  standalone: true,
  styleUrl: './movie-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailsComponent{

  //inject services
  private activeRoute:ActivatedRoute = inject(ActivatedRoute);
  private    movieListService:MoviesListService = inject(MoviesListService);
  private  movieService: MovieService = inject(MovieService);
  private   localStorage:LocalStorageService = inject(LocalStorageService);

  //parameters
  endpoint :string = 'movies';
  language:Signal<string> = this.localStorage.getLanguage();
  movieId: Signal<number> = computed(():number=>Number(this.activeRoute.snapshot.params['id']));
  pageNumber:WritableSignal<number> = signal(1) ;

  // show galleries image
  /*showMoviesPicture(idMovie:number,language:string,includeImageLanguage:string){
    this.images$ = this.movieListService.getMoviesImages(idMovie,includeImageLanguage,language);
  }*/



  //get current movie's credits
     credits:Signal<Cast[]|undefined> = toSignal(
        toObservable(this.language).pipe(
        switchMap(lang =>
          this.movieService.fetchMovieCredit(this.movieId(), lang!)
            .pipe(
              map(
                (data: Credits):Cast[] => {
                const casting:Cast[]= data.cast;
                return casting.slice(0, 6) // get first 9 castings
                }
              )
            )
          )
        )
     );




  //get movie details from movie id by url
  movieDetails:Signal<MovieDetail | undefined> = toSignal(
    toObservable(this.language).pipe(
      switchMap(lang =>
        this.movieService.fetchMovieDetails(this.movieId(), lang!)
      )
    )
  );


  // get movie's video information  from youtube
  videos:Signal<Video|undefined> =  toSignal(
      toObservable(this.language).pipe(
        switchMap(lang =>
          this.movieService.fetchVideoInfos(this.movieId(),lang!)
        )
      )
  );


   //similar movies
  similarMovies:Signal<Result[]| undefined> = toSignal(
    this.movieService.fetchSimilarMovie(this.movieId(),this.language()??'en-US')
      .pipe(map((m)=> m?.results.slice(0,4)))
  );

  //get recommandation's movie
  recommendedMovies:Signal<Movies |undefined> = toSignal(
    this.movieListService.fetchRecommendedationsMovie(this.movieId(),this.language()??'en-US',this.pageNumber())
  );


  //inject reviews service
  reviewService:ReviewService = inject(ReviewService);
  reviewSignal = toSignal(
    combineLatest([
        toObservable(this.movieId),
        toObservable(this.language)
    ]).pipe(
        switchMap(([id,lang]:[number,string]):
        Observable<Review>=>this.reviewService.getReviewsByMovieId(id,lang)
      )
    )
  );



  genres:Signal<string[]|undefined> = computed(():string[]|undefined=> this.movieDetails()?.genres.map(m=>m.name));
  productions_compagnies:Signal<string[]|undefined> = computed(():string[]|undefined=>this.movieDetails()?.production_companies.map(
    m=>m.name
  ));
  cast  = computed(()=>this.credits());
  protected readonly playing_characters =computed(()=> this.credits()?.map(c=>c.character));
  protected readonly actor_names =computed(()=> this.credits()?.map(c=>c.name));


  reviewDisplay():string {
   return  this.reviewSignal()!.total_results!= 0 ? 'flex': 'none';
  };

  marginBottom = '1.25rem';

}
