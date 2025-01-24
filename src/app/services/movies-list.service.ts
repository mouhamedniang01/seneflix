import { Injectable } from '@angular/core';
import {HttpClient, } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesListService {

  constructor(private httpClient: HttpClient) { }
  Host:string = 'https://api.themoviedb.org/3/movie/upcoming';

  /**
   * Fetch upcoming movies
   * Get Methods
   * url => https://api.themoviedb.org/3/movie/upcoming?language={string}&page={number}
   */



  public getUpcommingMovies(language:string,pageNumber:number):Observable<Movie>{
    return this.httpClient
      .get<Movie>(
        `${this.Host}?language=${language}&page=${pageNumber}`,
      );
  }


}
