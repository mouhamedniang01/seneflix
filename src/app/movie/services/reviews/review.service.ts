import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Review} from '../../../reviews/models/review';
@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  http:HttpClient = inject(HttpClient);
  $HOST: string ='https://api.themoviedb.org/3';

  /**
   * récupérer les détails d'un avis
   * @param review_id
   * @param langue
   */
  getDetailsByReviewId(review_id: number,langue:string):Observable<Review>{
    return this.http.get<Review>(`${this.$HOST}/review/${review_id}?language=${langue}&page=1`);
  }

  /**
   * récupérer l'avis d'une série
   * @param series_id
   * @param langue
   */
  getReviewsBySeriesTvId(series_id:number,langue:string):Observable<Review>{
    return this.http.get<Review>(`${this.$HOST}/tv/${series_id}/reviews?language=${langue}&page=1`)
  }

  getReviewsByMovieId(movie_id:number,langue:string):Observable<Review>{
    return this.http.get<Review>(`${this.$HOST}/movie/${movie_id}/reviews?language=${langue}&page=1`);
  }


}
