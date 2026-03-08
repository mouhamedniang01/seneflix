import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movies} from '../../movie/models/movies';
import {TimeWindowEnum} from '../../core/enums/time-window.enum';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SerieServiceService {
  http:HttpClient = inject(HttpClient);
  private HOST:string ='https://api.themoviedb.org/3/tv' ;

  /**
   * récupérer les séries en vogue suivant une période
   * @param langue fr-FR
   * @param pageNumber number
   * @param timeZone day | week
   */
  getAiringToday(langue:string,pageNumber:string,timeZone:TimeWindowEnum):Observable<Movies>{
    return this.http.get<Movies>(`${this.HOST}/airing_today?language=${langue}&page=${pageNumber}&timezone=${timeZone}`)
  }


  /**
   * récupérer les séries en vogue aujourd'hui
   * @param langue
   * @param pageNumber
   * @param timeZone
   */
  getOnTheAir(langue:string,pageNumber:string,timeZone:TimeWindowEnum):Observable<Movies>{
    return this.http.get<Movies>(`${this.HOST}/on_the_air?language=${langue}&page=${pageNumber}&timezone=${timeZone}`);
  }

  /**
   * récupérer les séries populaires
   * @param langue Langue fr-FR  en-US
   * @param pageNumber number
   */
  getPopularTvSeries(langue:string,pageNumber:string):Observable<Movies>{
    return this.http.get<Movies>(`${this.HOST}/popular?language=${langue}&page=${pageNumber}`);
  }

  getTopRatedTv(langue:string,pageNumber:string):Observable<Movies>{
    return this.http.get<Movies>(`${this.HOST}/top_rated?language=${langue}&page=${pageNumber}`);
  }
}
