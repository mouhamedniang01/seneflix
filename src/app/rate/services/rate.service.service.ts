import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Rate} from '../models/rate';

@Injectable({
  providedIn: 'root',
})
export class RateServiceService {
    http:HttpClient = inject(HttpClient);
    HOST : string ='https://api.themoviedb.org/3/tv';

  /**
   * noter une série
   * @param series_id
   * @param session_id
   * @param rating
   * @param guest_session_id
   */
    addRatingSeries(series_id:number,session_id:string,rating:number,guest_session_id:string):Observable<Rate>{
      return this.http.post<Rate>(`${this.HOST}/${series_id}/rating?guest_session_id=${guest_session_id}&session_id=${session_id}`,{
       rating: rating
      });
    }

  /**
   * noter un film
   * @param series_id
   * @param session_id
   * @param rating
   * @param guest_session_id
   */
  addRatingMovies(series_id:number,session_id:string,rating:number,guest_session_id:string):Observable<Rate>{
    return this.http.post<Rate>(`${this.HOST}/${series_id}/rating?guest_session_id=${guest_session_id}&session_id=${session_id}`,{
      rating: rating
    });
  }

  /**
   * ajouter une note sur un épisode de série
   * @param series_id number
   * @param season_number number
   * @param rating number
   * @param episode_number number
   */
  addRatingTvEpisode(
    series_id:number,
    season_number: number,
    rating:number,
    episode_number:number
  ):Observable<Rate>{
    return this.http.post<Rate>(
      `${this.HOST}/${series_id}/season/${season_number}/episode/${episode_number}/rating`
      ,{
      rating: rating
    });
  }





}
