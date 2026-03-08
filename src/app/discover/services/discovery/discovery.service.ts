import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movies } from '../../../movie/models/movies';
import {Sort} from '../../../core/enums/Sort';

@Injectable({
  providedIn: 'root'
})
export class DiscoveryService {

    constructor(private httpClient: HttpClient) { }
    //Host:string = 'https://api.themoviedb.org/3/movie/upcoming';

    /**
     * Fetch discovery movies doc API V3
     * Get Methods
     * @Param language
     * @Param isIncludeVideo
     * @Param pageNumber
     * @Param sortByPopularity
     * @return  Observable<Movies>
     * url => https://api.themoviedb.org/3/discover/movie?language={value}&include_video={boolean}&page={number}  &sort_by={popularity.desc || popularity.asc}
     * Language fr-FR || en-EN || es-Es
     */
    fetchDiscoveryMovies(
      language:string,
      pageNumber:number,
      isIncludeVideo:boolean,
      sortByPopularity:Sort
    ):Observable<Movies>{
      return this.httpClient
      .get<Movies>(`
        https://api.themoviedb.org/3/discover/movie?language=${language}
        include_video=${isIncludeVideo}&page=${pageNumber}&sort_by=${sortByPopularity}`
      );
    }


}

