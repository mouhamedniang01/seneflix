import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReviewServiceService {
  http:HttpClient = inject(HttpClient);
  HOST: string ='https://api.themoviedb.org/3/tv';

  getReviewDetails(reviewId: number){
    return this.http.get(`{this.HOST}/3/review/${reviewId}`);
  }

  getMovieReviews(series_id:number){
    return this.http.get(`${this.HOST}/${series_id}/reviews`)
  }
}
