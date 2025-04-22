import {Injectable} from '@angular/core';
import {HttpClient, } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movies} from '../models/movies';
import {TimeWindowEnum} from '../../enums/time-window.enum';
import {Images} from '../models/images';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MoviesListService {

  constructor(private readonly httpClient: HttpClient) { }
  Host:string =environment.host;

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
   * @Param time_window
   * @Param language
   * @return Observable<Movies>
   * URL => https://api.themoviedb.org/3/trending/all/:{{time_window}}?language=en-US
   */
  public  getTrendingAll(time_window:TimeWindowEnum, language:string):Observable<Movies>{
    return this.httpClient
      .get<Movies>(`${this.Host}/trending/all/${time_window}?language=${language}`);
  }


  /**
   * Fetch all images
   * GET METHOD
   * @Param include_image_language
   * @Param language type string en-EN
   * @Param movie_id
   * @return Observable<Images>
   * url https://api.themoviedb.org/3/movie/:movie_id/images?include_image_language={{include_image_language}}&language={{language}}
   */
  public  getMoviesImages(movie_id:number,include_image_language:any,language:string):Observable<Images>{
    return this.httpClient
      .get<Images>(
        `${this.Host}/movie/${movie_id}/images?include_image_language=${include_image_language}&language=${language}`
      );
  }

  
    /**
     * Fetch movie's credit informations
     * GET METHOD
     * @Param pageNumber number
     * @Param movie_id number
     * @Param language string
     * @return Observable<Movies>
     * URL => https://api.themoviedb.org/3/movie/:movie_id/similar?language={language}
     */
    fetchRecommendedationsMovie(movie_id:number, language:string,pageNumber:number):Observable<Movies>{
      return  this.httpClient
      .get<Movies>(`${this.Host}/movie/${movie_id}/recommendations?language=en-US&page=${pageNumber}`);
    }



}
