import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Genre, GenreOptions} from '../../models/genre';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  http :HttpClient = inject(HttpClient);

  fetchGenres(type:string,langue:string):Observable<GenreOptions>{
    return this.http.get<GenreOptions>(`https://api.themoviedb.org/3/genre/${type}/list?language=${langue}`);
  }
}
