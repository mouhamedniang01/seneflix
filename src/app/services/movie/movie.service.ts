import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MovieDetail} from '../../movie-lists/models/movie-detail';
import {Observable} from 'rxjs';
import {Video} from '../../movie-lists/models/video';
import {Credits} from '../../movie-lists/models/credits';
import {Movies} from '../../movie-lists/models/movies';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  Host:string = 'https://api.themoviedb.org/3';

  constructor(readonly http: HttpClient) { }


  /**
   * Fetch movie detail informations
   * GET METHOD
   * @Param movie_id
   * @Param language
   * @return Observable<MovieDetail>
   * URL => https://api.themoviedb.org/3/movie/:movie_id?language={language}
   */

  fetchMovieDetails(movie_id:number, language:string):Observable<MovieDetail>{
    return this.http
      .get<MovieDetail>(`${this.Host}/movie/${movie_id}?language=${language}`,)

  }

  /**
   * Fetch video detail informations
   * GET METHOD
   * @Param movie_id
   * @Param language
   * @return Observable<Video>
   * URL => https://api.themoviedb.org/3/movie/:movie_id/videos?languages={language}
   */
  fetchVideoInfos(movie_id:number, language:string):Observable<Video>{
    return  this.http
      .get<Video>(`${this.Host}/movie/${movie_id}/videos?languages=${language}`);
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


   /**
     * Fetch movie's credit informations
     * GET METHOD
     * @Param movie_id number
     * @Param language string
     * @return Observable<Movies>
     * URL => https://api.themoviedb.org/3/movie/:movie_id/similar?language={language}
     */
    fetchSimilarMovie(movie_id:number, language:string):Observable<Movies>{
    return  this.http
      .get<Movies>(`${this.Host}/movie/${movie_id}/similar?language=${language}&page=1`);
  }


}
