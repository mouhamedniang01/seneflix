import {Component, effect, inject, Signal, signal, WritableSignal} from '@angular/core';
import {CastMovieService} from '../../../people/service/cast-movie/cast.movie.service';
import {ActivatedRoute} from '@angular/router';
import {LocalStorageService} from '../../../core/services/local-storage/local-storage.service';
import {MovieCardComponent} from '../movie-card/movie-card.component';
import { LoadingSpinnerComponent } from '../../../share-ui/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-movie.by.casting',
  imports: [
    MovieCardComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './movie.by.casting.component.html',
  styleUrl: './movie.by.casting.component.css',
})
export class MovieByCastingComponent {
  movieService:CastMovieService  = inject(CastMovieService);
  router:ActivatedRoute = inject(ActivatedRoute);
  personId:WritableSignal<number | undefined> = signal(undefined);
  langueSignal:Signal<string> = inject(LocalStorageService).getLanguage();
  langue:WritableSignal<string> = signal(this.langueSignal());
  constructor() {
    effect(():void => {
      this.personId.set(this.router.snapshot.params['id']);
    });
  }

  moviesbyPersonIdResources= this.movieService.loadMovieBypeopleId(this.personId,this.langue);
}
