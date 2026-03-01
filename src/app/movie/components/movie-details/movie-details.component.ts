import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {MovieService} from '../../services/movie/movie.service';
import {CardModule} from 'primeng/card';
import {map, Observable, switchMap} from 'rxjs';
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
import {Movies} from '../../../movie-lists/models/movies';
import { TabContentComponent } from "../../../share-ui/tab-content/tab-content.component";
import { TabsModule } from 'primeng/tabs';
import { ImageModule} from 'primeng/image';
import {LocalStorageService} from '../../../core/services/local-storage/local-storage.service';
import {MoviesListService} from '../../../movie-lists/services/movies-list.service';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {CreditComponent} from '../credit/credit.component';
@Component({
  selector: 'app-movie-details',
  imports: [CardModule, AsyncPipe, CardModule, AnimateOnScrollModule,
    GalleriaModule, Button, DialogWidgetComponent, FormsModule,
    Rating, TabsModule, TabContentComponent, ImageModule, CreditComponent],
  templateUrl: './movie-details.component.html',
  standalone: true,
  styleUrl: './movie-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailsComponent implements OnInit{

  //inject services
  private activeRoute:ActivatedRoute = inject(ActivatedRoute);
  private    movieListService:MoviesListService = inject(MoviesListService);
  private  movieService: MovieService = inject(MovieService);
  private   localStorage:LocalStorageService = inject(LocalStorageService);

  //parameters
  language =this.localStorage.getLanguage();
  movieId: Signal<number> = computed(():number=>Number(this.activeRoute.snapshot.params['id']));


  movie$ !: Observable<MovieDetail>;
  video$ !: Observable<Video>;
  isDialogVisible:boolean = false;
  credits$!:Observable <Credits>;
  castings$!:Observable<Cast[]>;
  casts!:Observable<Cast[]>;
  similarMovies$!:Observable<Movies>;
  recommendedMovies$!:Observable<Movies>;
  public tabs: { title: string; value: number}[] = [];
  pageNumber:WritableSignal<number> = signal(1) ;


  includImageLang=signal('en,null');



  ngOnInit(): void {
    this.setTab();// for tab similars & recommandations movies
    console.log('🎬 Init - ID:', this.movieId(), 'Langue:', this.language());
    //this.showMoviesPicture(this.movieId,this.language(),this.includImageLang); //inject galleria
  }

  /*moviePicture:Signal<Images | undefined> = toSignal(
    this.movieListService.getMoviesImages(
      this.movieId(),
      this.includImageLang,
      this.language()
    )
  );*/
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
                return casting.slice(0, 3) // get first 9 castings
                }
              )
            )
          )
        )
     );

  getCredits(movieId:number,language:string){
    this.castings$ = this.movieService.fetchMovieCredit(movieId,language).pipe(
      map((data: Credits):Cast[] => {
        const casting:Cast[]= data.cast;
        return casting.slice(0, 8); // get first 9 castings
      }
      ));
  }

  menuItems = signal( [
    {
      label: 'Refresh',
      icon: 'pi pi-refresh'
    },
    {
      label: 'Search',
      icon: 'pi pi-search'
    },
    {
      separator: true
    },
    {
      label: 'Delete',
      icon: 'pi pi-times'
    }
  ]);
  //get movie details from movie id by url
  movieDetails = toSignal(
    toObservable(this.language).pipe(
      switchMap(lang =>
        this.movieService.fetchMovieDetails(this.movieId(), lang!)
      )
    )
  );

  ratings:Signal<number> = computed(()=> Number(this.movieDetails()!.vote_average) / 2);

  // get movie's video information  from youtube
  videos:Signal<Video|undefined> =  toSignal(
      toObservable(this.language).pipe(
        switchMap(lang =>
          this.movieService.fetchVideoInfos(this.movieId(),lang!)
        )
      )
  );

  // on show dialog
  showDialog() {
    this.isDialogVisible = true;
  }


   //similar movies
  similarMovies:Signal<Movies| undefined> = toSignal(
    this.movieService.fetchSimilarMovie(this.movieId(),this.language()??'en-US')
  )

  //get recommandation's movie
  recommendedMovies:Signal<Movies |undefined> = toSignal(
    this.movieListService.fetchRecommendedationsMovie(this.movieId(),this.language()??'en-US',this.pageNumber())
  );

  //inject similar & recommanded movies
  setTab() {
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
