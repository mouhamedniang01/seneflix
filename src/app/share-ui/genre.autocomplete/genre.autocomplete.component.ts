import {
  Component,
  computed,
  inject,
  input,
  output,
  OutputEmitterRef,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import {AutoComplete, AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {Result} from '../../movie/models/movies';
import {PaginatorState} from 'primeng/paginator';
import {Genre, GenreOptions} from '../../core/models/genre';
import {GenreService} from '../../core/services/genre/genre.service';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {combineLatest, switchMap} from 'rxjs';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-genre-autocomplete',
  imports: [
    AutoComplete,
    FormsModule
  ],
  templateUrl: './genre.autocomplete.component.html',
  styleUrl: './genre.autocomplete.component.css',
})
export class GenreAutocompleteComponent {
  language = input.required<string>();
 type = input.required<string>();
  filteredGenres!:Genre[] ;
  onSelectedGenre:OutputEmitterRef<Genre[]> = output<Genre[]>();

  selectedGenre: WritableSignal<Genre[]> = signal([]);

  private genreService :GenreService= inject(GenreService);

  //movies genre filter
  genreOptions: Signal<GenreOptions | undefined> = toSignal(
    combineLatest(
      toObservable(
        this.language
      ),
      toObservable(
        this.type
      ),
    )
      .pipe(
        switchMap(([langue,type])=>
          this.genreService.fetchGenres(type,langue)
        )
      )
  );

  // Getter/setter pour le binding ngModel → WritableSignal
  get selectedGenreModel(): Genre[] {
    return this.selectedGenre();
  }
  set selectedGenreModel(value: Genre[]) {
    this.selectedGenre.set(value ?? []);
  }

  //filter par genre
  filterGenre(event: AutoCompleteCompleteEvent):void {
    let filtered: any[] = [];
    let query:string = event.query;

    for (let i:number = 0; i < (this.genreOptions()?.genres as any[]).length; i++) {
      let genre:Genre = (this.genreOptions()?.genres as Genre[])[i];
      if (genre.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(genre);
      }
    }
    this.filteredGenres = filtered;
  }


  //emit the genre on parent
  protected onChangeGenres():void {
    this.onSelectedGenre.emit(this.selectedGenreModel);
  }
}
