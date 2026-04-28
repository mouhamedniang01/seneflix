import {inject, Injectable, ResourceRef, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MovieCast} from '../../models/movie.cast';
import {Observable, of} from 'rxjs';
import {rxResource} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CastMovieService {
  http:HttpClient = inject(HttpClient);

  /**
   * récupérer les films auxquels un acteur à pris part via son Id
   * @param personId number
   * @param language string fr-FR | en-US
   */
  fetchMovieBypeopleId(personId:number,language:string):Observable<MovieCast>{
    return this.http
      .get<MovieCast>(`https://api.themoviedb.org/3/person/${personId}/movie_credits?language=${language}`);
  }

  /**
   * charger les informations dans resource
   * @param personId number
   * @param language fr-FR |en-US string
   */
  loadMovieBypeopleId(
    personId: WritableSignal<undefined| number>, language: WritableSignal<string>
  ) : ResourceRef<MovieCast | undefined>{
    return rxResource({
      params:() =>({ langue:language(),id: personId()}),
      stream:({params}):Observable< MovieCast|undefined>=>{
       if (!params.id || !params.langue){
         return  of(undefined);
       }
        return this.fetchMovieBypeopleId(
          params?.id,
          params.langue
        );
      }
    })
  }
}
