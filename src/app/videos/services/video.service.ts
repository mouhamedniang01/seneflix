import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../models/video';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  Host: string = 'https://api.themoviedb.org/3';
  
  constructor(readonly http: HttpClient) { }

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
}
