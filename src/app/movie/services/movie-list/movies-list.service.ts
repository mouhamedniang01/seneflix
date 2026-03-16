import {Injectable} from '@angular/core';
import {HttpClient, } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movies} from '../../models/movies';
import {Images} from '../../models/images';
import {TimeWindowEnum} from '../../../core/enums/time-window.enum';
import {environment} from '../../../../environments/environment';
import {Langue} from '../../../share-ui/language-selector/language-selector.component';

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
  public getUpcomingMovies(language:string, pageNumber:number):Observable<Movies>{
    return this.httpClient
      .get<Movies>(
        `${this.Host}/movie/upcoming?language=${language}&page=${pageNumber}`,
      );
  }

  /**
   *
   * @param language fr-FR
   * @param movieCategory upcoming | popular
   * @param pageNumber number
   */
  public getMovieByCategory(language:string,movieCategory:string, pageNumber:number):Observable<Movies>{
    return this.httpClient
      .get<Movies>(
        `${this.Host}/movie/${movieCategory}?language=${language}&page=${pageNumber}`,
      );
  }

  /**
   * récupérer les films populairs
   * @param langue fr-FR
   * @param pageNumber number
   * @param region string =>ex :ISO-3166-1 code
   */

  getPopularMovies(langue:string,pageNumber:number,region:string){
    return this.httpClient.
    get<Movies>(`${this.Host}/movie/popular?language=${langue}&page=${pageNumber}&region=${region}`)
  }
  /**
   * récupérer les films tendances
   * @param time_window day | week
   * @param langue fr-FR
   * @param pageNumber number
   */

  getTrendingMovies(time_window:TimeWindowEnum,langue:Langue |string,pageNumber:number):Observable<Movies>{
    return this.httpClient.get<Movies>(
      `https://api.themoviedb.org/3/trending/movie/${time_window}?language=${langue}&page=${pageNumber} `
    );
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

}
