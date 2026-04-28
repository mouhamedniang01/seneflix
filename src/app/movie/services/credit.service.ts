import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credits } from '../models/credits';
import { MovieDetail } from '../models/movie-detail';

@Injectable({
  providedIn: 'root',
})
export class CreditService {
    Host:string = 'https://api.themoviedb.org/3';

  constructor(readonly http: HttpClient) { }


  /**
   * Fetch movie detail informations
   * GET METHOD
   * @Param movie_id
   * @Param language
   * @return Observable<MovieDetail>
   * URL => https://api.themoviedb.org/3/movie/:movie_id?language={language}&append_to_response={{append_to_response}}
   */



  fetchMovieDetails(movie_id: number, language: string): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(
      `${this.Host}/movie/${movie_id}?language=${language}&append_to_response=${language}`
    );
  }

 

  /**
   * Fetch movie's credit informations
   * GET METHOD
   * @Param movie_id
   * @Param language
   * @return Observable<Credits>
   * URL => https://api.themoviedb.org/3/movie/:movie_id/credits?language={language}
   */
  fetchMovieCredit(movie_id:number, language:string):Observable<Credits>{
    return  this.http
      .get<Credits>(`${this.Host}/movie/${movie_id}/credits?language=${language}`);
  }
}
