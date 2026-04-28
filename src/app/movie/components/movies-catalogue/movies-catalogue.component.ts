import {Component, computed, inject, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {MovieListComponent} from '../movie-list/movie-list.component';
import {LoadingSpinnerComponent} from '../../../share-ui/loading-spinner/loading-spinner.component';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {combineLatest, Observable, switchMap} from 'rxjs';
import {LocalStorageService} from '../../../core/services/local-storage/local-storage.service';
import {Movies, Result} from '../../models/movies';
import {MoviesListService} from '../../services/movie-list/movies-list.service';
import {SelectButton} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';
import {MovieTypeEnum} from '../../enums/MovieTypeEnum';
import { AutoCompleteModule} from 'primeng/autocomplete';
import {GenreService} from '../../../core/services/genre/genre.service';
import {GenreOptions} from '../../../core/models/genre';
import {Genre} from '../../models/movie-detail';
import {GenreAutocompleteComponent} from '../genre.autocomplete/genre.autocomplete.component';

@Component({
  selector: 'app-popular-movie',
  imports: [
    MovieListComponent,
    LoadingSpinnerComponent,
    SelectButton,
    FormsModule,
    AutoCompleteModule,
    GenreAutocompleteComponent,
  ], 
  templateUrl: './movies-catalogue.component.html',
  styleUrl: './movies-catalogue.component.css',
})
export class MoviesCatalogueComponent implements OnInit {
  private movieService: MoviesListService = inject(MoviesListService);
  private localStorage: LocalStorageService = inject(LocalStorageService);
  private readonly moviesListService: MoviesListService =
    inject(MoviesListService);
  private readonly genreService: GenreService = inject(GenreService);

  langueSignal: Signal<string> = this.localStorage.getLanguage();
  pageNumber: WritableSignal<number> = signal(1);
  region: WritableSignal<string> = signal('ISO-3166-1 code');

  //movies type selector
  moviesOptions = [
    { label: 'Popular', value: 'popular' },
    { label: 'Upcoming', value: 'upcoming' },
  ];
  selectedMovieType: string = 'popular';

  protected readonly MovieTypeEnum: typeof MovieTypeEnum = MovieTypeEnum;

  type: WritableSignal<string> = signal('movie');

  //movies genre filter
  genreOptions: Signal<GenreOptions | undefined> = toSignal(
    combineLatest(
      toObservable(this.langueSignal),
      toObservable(this.type),
    ).pipe(
      switchMap(([langue, type]) =>
        this.genreService.fetchGenres(type, langue),
      ),
    ),
  );

  selectedGenre: WritableSignal<Genre[]> = signal([]);
  filteredGenres!: Genre[];

  ngOnInit(): void {
    this.filteredGenres = this.genreOptions()?.genres as any[];
  }

  popularMoviesSignal: Signal<Movies | undefined> = toSignal(
    combineLatest([
      toObservable(this.langueSignal),
      toObservable(this.pageNumber),
      toObservable(this.region),
    ]).pipe(
      switchMap(
        ([langue, index, region]: [
          string,
          number,
          string,
        ]): Observable<Movies> =>
          this.movieService.getPopularMovies(langue, index, region),
      ),
    ),
  );

  // Mettre à jour le computed de populars pour lire le signal
  populars: Signal<Result[] | undefined> = computed(() =>
    this.filterMoviesByGenre(this.popularMoviesSignal()?.results),
  );

  popularTotalResults: Signal<number | undefined> = computed(
    (): number | undefined => this.popularMoviesSignal()?.total_results,
  );

  upcomingTotalResults: Signal<number | undefined> = computed(
    (): number | undefined => this.upcomingMoviesSignal()?.total_results,
  );

  upcomingMovies: Signal<Result[] | undefined> = computed(() =>
    this.filterMoviesByGenre(this.upcomingMoviesSignal()?.results),
  );

  //change genre on auto complete
  protected handleGenreChange($event: Genre[]) {
    this.selectedGenre.set($event);
    console.log($event);
  }

  //get all information on upcoming movies
  upcomingMoviesSignal: Signal<Movies | undefined> = toSignal(
    combineLatest([
      toObservable(this.langueSignal),
      toObservable(this.pageNumber),
    ]).pipe(
      switchMap(
        ([language, index]: [string, number]): Observable<Movies> =>
          this.moviesListService.getUpcomingMovies(language, index),
      ),
    ),
    { initialValue: undefined },
  );

  protected handlePageChange($event: number): void {
    this.pageNumber.set($event);
  }

  //filter par genre
  private filterMoviesByGenre(
    results: Result[] | undefined,
  ): Result[] | undefined {
    const genres = this.selectedGenre();
    if (!genres.length || !genres) return results;
    return results?.filter((movie) =>
      movie.genre_ids?.some((id) => genres.some((g) => g.id === id)),
    );
  }
}
