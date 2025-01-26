import { Injectable } from '@angular/core';
import {HttpClient, } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movies} from '../models/movies';
import {TimeWindowEnum} from '../enums/time-window.enum';

@Injectable({
  providedIn: 'root'
})
export class MoviesListService {

  constructor(private httpClient: HttpClient) { }
  Host:string = 'https://api.themoviedb.org/3';

  /**
   * Fetch upcoming movies
   * Get Methods
   * url => https://api.themoviedb.org/3/movie/upcoming?language={string}&page={number}
   */



  public getUpcommingMovies(language:string,pageNumber:number):Observable<Movies>{
    return this.httpClient
      .get<Movies>(
        `${this.Host}/movie/upcoming?language=${language}&page=${pageNumber}`,
      );
  }

  /**
   * Fetch all trending
   * Get Method
   * URL => https://api.themoviedb.org/3/trending/all/:{{time_window}}?language=en-US
   */
  public  getTrendingAll(time_window:TimeWindowEnum, language:string):Observable<Movies>{
    return this.httpClient
      .get<Movies>(`${this.Host}/trending/all/${time_window}?language=${language}`);
  }


}
