import {inject, Injectable, InputSignal, ResourceRef, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable, of} from 'rxjs';
import {Person} from '../models/person';
import {rxResource} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  $HOST : string = 'https://api.themoviedb.org/3/person'
  http = inject(HttpClient);

  /**
   * récupérer les détails d'une personne
   * @param person_id number
   * @param langue fr| FR string
   * @param append_to_response string
   */
  fetchPeople(person_id:number,langue:string,append_to_response:string):Observable<Person>{
      return this.http
        .get<Person>(
          `https://api.themoviedb.org/3/person/${person_id}?language=${langue}&append_to_response=${append_to_response}
        `);
  }

  loadPersonResources(
    person_id: WritableSignal<number | null>,
    langue: WritableSignal<string |undefined> | InputSignal<string>,
    append_to_response: WritableSignal<string>
  ):ResourceRef<Person | undefined>{
    return rxResource({
      params: () =>( {
        id: person_id(),
        langue :langue(),
        append_to_response:append_to_response()
      }),
      stream:({params}):Observable<Person | undefined>=>{
        if (!params.id || !params.langue || !params.append_to_response) {
          return of(undefined);
        }
        return this.fetchPeople(params.id, params.langue, params.append_to_response)
      }
    })
  }

}
