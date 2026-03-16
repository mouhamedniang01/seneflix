import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';

import {Movies} from '../../../movie/models/movies';
import {Router} from '@angular/router';
import {TimeWindowEnum} from '../../enums/time-window.enum';
import {SelectButtonModule} from 'primeng/selectbutton';
import {rxResource, toObservable, toSignal} from '@angular/core/rxjs-interop';
import {MovieCarouselComponent} from '../../../share-ui/movie-carousel/movie-carousel.component';
import {LoggingInterceptor} from '../../interceptors/logging.interceptor';
import {DiscoveryService} from '../../../discover/services/discovery/discovery.service';
import {TendancesDirective} from '../../directives/tendances.directive';
import {Sort} from '../../enums/Sort';
import {FormsModule} from '@angular/forms';
import {combineLatest, Observable, switchMap} from 'rxjs';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {LoadingSpinnerComponent} from '../../../share-ui/loading-spinner/loading-spinner.component';
import {MoviesListService} from '../../../movie/services/movie-list/movies-list.service';

@Component({
  selector: 'app-home',
  imports: [
    SelectButtonModule, MovieCarouselComponent, FormsModule, TendancesDirective, LoadingSpinnerComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  providers:[LoggingInterceptor],
  styleUrl: './home.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit{
  //inject services & routes
  private readonly moviesListService:MoviesListService= inject(MoviesListService);
  public readonly router:Router = inject(Router) ;
  private readonly discoveryMovieService:DiscoveryService= inject(DiscoveryService);
  private localStorage = inject(LocalStorageService);
  languageSignal : Signal<string> = this.localStorage.getLanguage();
  langue:WritableSignal<string> = signal(this.languageSignal());
  currentLanguage:Signal<string>  = computed(()=>this.languageSignal());
  // params page & language
  pageNumber :WritableSignal<number> = signal<number>(1 );
  stateOptions =signal([{ label: 'Day', value: TimeWindowEnum.DAY },{ label: 'Week', value: TimeWindowEnum.WEEK }]);

  x_small :string = 'w300';
  small:string ='w500';
  medium:string ='w780';
  protected original: string = 'original';


  currentTimeWindow :WritableSignal<TimeWindowEnum> = signal(TimeWindowEnum.DAY);

  // get all informations on all incoming movies
  upcomingMovies:Signal<Movies| undefined > =  toSignal(this.moviesListService.getUpcomingMovies(this.currentLanguage(), this.pageNumber()));

  //get all information on trending
  trending: Signal<Movies | undefined> = toSignal(
    combineLatest([
      toObservable(this.currentLanguage),
      toObservable(this.currentTimeWindow)
    ]).pipe(
      switchMap(([language, time]) =>
        this.moviesListService.getTrendingAll(time, language)
      )
    ),
    { initialValue: undefined }
  );

  ngOnInit(): void {

  }

  isIncludeVideo :WritableSignal<boolean> = signal(true);
  sortDiscoveryMovies:WritableSignal<Sort> = signal(Sort.DESC)
  //fetch movies for discovery movies
  discoveryMoviesRessource = rxResource({
      // Define a reactive computation.
      // The params value recomputes whenever any read signals change.
    params: ()=>({
      language:this.langue(),
      pageIndex: this.pageNumber(),
      includeVideo:this.isIncludeVideo(),
      sort:this.sortDiscoveryMovies()
    }),
    // Define an async loader that retrieves data.
    // The resource calls this function every time the `params` value changes.
    stream: ({params}):Observable<Movies> =>
      this.discoveryMovieService.fetchDiscoveryMovies(
        params.language, params.pageIndex, params.includeVideo, params.sort
      )}
    );
  // Create a computed signal based on the result of the resource's loader function.
  discoveryMovies: Signal<Movies| undefined> = computed(():Movies | undefined => {
    if (this.discoveryMoviesRessource.hasValue()) {
      // `hasValue` serves 2 purposes:
      // - It acts as type guard to strip `undefined` from the type
      // - If protects against reading a throwing `value` when the resource is in error state
      return this.discoveryMoviesRessource.value();
    }
    // fallback in case the resource value is `undefined` or if the resource is in error state
    return undefined;
  });

    /*toSignal(

      toObservable(this.currentLanguage).pipe(
      switchMap(([language]) =>
        this.discoveryMovieService.fetchDiscoveryMovies(
          language,this.pageNumber(),this.isIncludeVideo(),this.sortDiscoveryMovies(),)
      )
    ));*/

  protected change() {
    console.log(this.currentTimeWindow())
  }


  protected averageVote = computed(()=>this.upcomingMovies()?.results.map(i=>i.vote_average.toString()));
}
