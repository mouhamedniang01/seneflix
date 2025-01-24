import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class DiscoveryService {

    constructor(private httpClient: HttpClient) { }
    Host:string = 'https://api.themoviedb.org/3/movie/upcoming';

    /**
     * Fetch discovery movies doc API V3
     * Get Methods
     * url => https://api.themoviedb.org/3/discover/movie?
     * language={value}&include_video={boolean}&page={number}
     * &sort_by={popularity.desc || popularity.asc}
     * Language fr-FR || en-EN || es-Es
     */
    fetchDiscoveryMovies(
      language:string,
      pageNumber:number,
      isIncludeVideo:boolean,
      sortByPopularity:Sort
    ):Observable<Movie>{
      return this.httpClient
      .get<Movie>(`
        https://api.themoviedb.org/3/discover/movie?language=${language}
        include_video=${isIncludeVideo}&page=1&sort_by=${sortByPopularity}`
      );
    }


}

export enum Sort {
  ASC='popularity.asc',
  DESC='popularity.desc'
}
