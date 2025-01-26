import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import { DiscoveryService, Sort } from '../../services/discovery-service/discovery.service';
import { Observable } from 'rxjs';
import { Movies } from '../../models/movies';
import { AsyncPipe } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import {Router} from '@angular/router'; // carousel import prime ng
@Component({
  selector: 'app-movie-carousel',
  imports: [
    AsyncPipe,
    CarouselModule,
    SlickCarouselModule,
],
  providers:[DiscoveryService],
  standalone:true,
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.css'
})
export class MovieCarouselComponent implements OnInit{
  movies$ !: Observable<Movies>;
  autoplayInterval  :number = 3000; // in seconds
  constructor(readonly discoveryMovieService:DiscoveryService,readonly  router:Router) {}
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






}
