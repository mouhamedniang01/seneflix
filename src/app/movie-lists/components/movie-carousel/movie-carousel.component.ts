import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import { Observable } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import {Router} from '@angular/router'; // carousel import prime ng
import { Movies } from '../../models/movies';
import { DiscoveryService, Sort } from '../../../discover/services/discovery/discovery.service';
@Component({
  selector: 'app-movie-carousel',
  imports: [
    AsyncPipe,
    CarouselModule,
    SlickCarouselModule,
],
  standalone:true,
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.css'
})
export class MovieCarouselComponent implements OnInit{
  movies$ !: Observable<Movies>;
  autoplayInterval  : number = 3000; // in seconds
  constructor(readonly discoveryMovieService:DiscoveryService,readonly  router:Router) {}


  ngOnInit(): void {
      this.getDiscoveryMovies();
  }

  //fetch movies for discovery movies
  getDiscoveryMovies(){
    this.movies$ = this.discoveryMovieService.fetchDiscoveryMovies(
      'fr-FR',1,true,Sort.DESC
    );
  }

  navigateToDetailsPage(movieId:number){
    this.router.navigateByUrl(`movies/details/${movieId}`).then();
  }



  /**
   * for PRIME NG carrousel slider
   */
  responsiveOptions:WritableSignal<any[] | undefined> = signal(
    [
      {
          breakpoint: '1400px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '575px',
          numVisible: 1,
          numScroll: 1
      }
  ]
  );


}
