/**
 * @last modification: 16-04-2026
 * 
 */
import { Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import {LocalStorageService} from '../../../core/services/local-storage/local-storage.service';
import {Movies, Result} from '../../models/movies';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {combineLatest, switchMap} from 'rxjs';
import {TimeWindowEnum} from '../../../core/enums/time-window.enum';
import {MovieCardComponent} from '../movie-card/movie-card.component';
import {MoviesListService} from '../../services/movie-list/movies-list.service';
import {Paginator, PaginatorState} from 'primeng/paginator';
import {LoadingSpinnerComponent} from '../../../share-ui/loading-spinner/loading-spinner.component';
import {Genre} from '../../models/movie-detail';
import {FormsModule} from '@angular/forms';
import {GenreAutocompleteComponent} from '../genre.autocomplete/genre.autocomplete.component';

@Component({
  selector: 'app-movies-list',
  imports: [
    MovieCardComponent,
    Paginator,
    LoadingSpinnerComponent,
    FormsModule,
    GenreAutocompleteComponent,
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
  selectedGenre : WritableSignal<Genre[]> = signal([]);

  //get all information on trending
  trendingMoviesSignal: Signal<Movies | undefined> = toSignal(
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

  type: WritableSignal<string>  =signal('movie');



  trendingMovies: Signal<Result[] | undefined> = computed(
    ()=> this.filterMoviesByGenre(this.trendingMoviesSignal()?.results)
  );

  private filterMoviesByGenre(results: Result[] | undefined): Result[] | undefined {
    const genres = this.selectedGenre();
    if (!genres.length || !genres) return results;
    return results?.filter(movie =>
      movie.genre_ids?.some(id => genres.some(g => g.id === id))
    );
  }

  //paginator parameters
  first: WritableSignal<number> = signal(1);
  rows:WritableSignal <number> = signal(10);
  total_results:Signal <number | undefined> = computed(():number | undefined => this.trendingMoviesSignal()?.total_results);


  //change page parameters
  onPageChange(event: PaginatorState) {
    const page:number = (event.page ?? 0) + 1;
    this.first.set(event.first ?? 1);
      this.pageIndex.set(page) ;
  }


  //change genre on auto complete
  protected handleGenreChange($event: Genre[]) {
    this.selectedGenre.set($event);
    console.log($event)
  }

}
