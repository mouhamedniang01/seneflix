import {Component,  inject, signal, Signal, WritableSignal} from '@angular/core';
import {LocalStorageService} from '../../../core/services/local-storage/local-storage.service';
import {Movies} from '../../models/movies';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {combineLatest, switchMap} from 'rxjs';
import {TimeWindowEnum} from '../../../core/enums/time-window.enum';
import {MovieCardComponent} from '../movie-card/movie-card.component';
import {MoviesListService} from '../../services/movie-list/movies-list.service';
import {Paginator, PaginatorState} from 'primeng/paginator';

@Component({
  selector: 'app-movies-list',
  imports: [
    MovieCardComponent,
    Paginator,
    // JsonPipe
  ],
  templateUrl: './trending-movies.component.html',
  styleUrl: './trending-movies.component.css',
})
export class TrendingMoviesComponent {
  private readonly moviesListService:MoviesListService= inject(MoviesListService);

  private localStorage = inject(LocalStorageService);
  languageSignal : Signal<string> = this.localStorage.getLanguage();
  pageIndex :WritableSignal<number> = signal(1);
  currentTimeWindow :WritableSignal<TimeWindowEnum> = signal(TimeWindowEnum.DAY);


  x_small :string = 'w300';
  small:string ='w500';
  medium:string ='w780';
  protected original: string = 'original';


  //get all information on trending
  trendingMovies: Signal<Movies | undefined> = toSignal(
    combineLatest([
      toObservable(this.languageSignal),
      toObservable(this.currentTimeWindow),
      toObservable(this.pageIndex)
    ]).pipe(
      switchMap(([language, time,index]:[string,TimeWindowEnum,number]) =>
        this.moviesListService.getTrendingMovies(time, language,index)
      )
    ),
    { initialValue: undefined }
  );

  //paginator parameters
  first: WritableSignal<number> = signal(1);
  rows:WritableSignal <number> = signal(10);

  //change page parameters
  onPageChange(event: PaginatorState) {
    const page = (event.page ?? 0) + 1;
    this.first.set(event.first ?? 1);
      this.pageIndex.set(page ) ;
    this.rows.set(event.rows ?? 5);
    console.log(this.pageIndex(), event.page);
  }

 paginatorOptions:WritableSignal<number[]> =signal([3,5, 10, 20]);
}
