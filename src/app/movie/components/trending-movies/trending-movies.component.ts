import {Component, computed, inject, signal, Signal, WritableSignal} from '@angular/core';
import {LocalStorageService} from '../../../core/services/local-storage/local-storage.service';
import {Movies} from '../../models/movies';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {combineLatest, map, switchMap} from 'rxjs';
import {TimeWindowEnum} from '../../../core/enums/time-window.enum';
import {MovieCardComponent} from '../movie-card/movie-card.component';
import {MoviesListService} from '../../services/movie-list/movies-list.service';
import {Paginator, PaginatorState} from 'primeng/paginator';
import {LoadingSpinnerComponent} from '../../../share-ui/loading-spinner/loading-spinner.component';
import {GenreService} from '../../../core/services/genre/genre.service';
import {Genre} from '../../models/movie-detail';
import {FormsModule} from '@angular/forms';
import {SelectButton} from 'primeng/selectbutton';
import {GenreOptions} from '../../../core/models/genre';
import {JsonPipe} from '@angular/common';
import {Listbox} from 'primeng/listbox';

@Component({
  selector: 'app-movies-list',
  imports: [
    MovieCardComponent,
    Paginator,
    LoadingSpinnerComponent,
    FormsModule,
    Listbox,
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

  genreService :GenreService= inject(GenreService);
  type:string = 'movie';


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
    const page:number = (event.page ?? 0) + 1;
    this.first.set(event.first ?? 1);
      this.pageIndex.set(page) ;
  }

  //genre options filter
  genreOptions: Signal<GenreOptions | undefined> =  toSignal(
    toObservable(this.languageSignal)
      .pipe(
        switchMap((lang) =>
          this.genreService.fetchGenres(this.type, lang)
        ))
  );
  paymentOptions: any[]=[4,5,15]
  //value: WritableSignal<string> = signal('');
  filterOptions:any = computed(() => this.genreOptions()?.genres ??
    [{ name: 'Visa', id: 1 },
    { name: 'MasterCard', id: 2 },
    { name: 'Paypal', id: 3 }]);
  //value: Signal<number[]> = computed(():number[]=>this.genreOptions()?.genre.map(i=>i.id) ?? []);
  onGenreChange($event:Genre){
  }

  value: number[] = [];

}
