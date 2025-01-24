import { Component, OnInit, signal, WritableSignal } from '@angular/core'; 
import {SlickCarouselModule} from 'ngx-slick-carousel';
import { DiscoveryService, Sort } from '../../services/discovery.service';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';
import { AsyncPipe } from '@angular/common';
import { CarouselModule } from 'primeng/carousel'; // carousel import prime ng
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
  movies$ !: Observable<Movie>;
  autoplayInterval  :number = 3000; // in seconds
  constructor(readonly discoveryMovieService:DiscoveryService) {}
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

    

    


}
