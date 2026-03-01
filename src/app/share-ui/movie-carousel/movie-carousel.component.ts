import {Component, input, InputSignal, signal, WritableSignal} from '@angular/core';

import { CarouselModule } from 'primeng/carousel';
import {Router} from '@angular/router'; // carousel import prime ng
import { Movies } from '../../movie-lists/models/movies';
@Component({
  selector: 'app-movie-carousel',
  imports: [
    CarouselModule
],
  standalone:true,
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.css'
})
export class MovieCarouselComponent {

  showPosterPath:InputSignal<boolean> = input.required<boolean>();
  movies:InputSignal<Movies| undefined>= input.required<Movies | undefined>();
  showNavigation:InputSignal<boolean| undefined> = input<boolean>();
  showIndicators :InputSignal<boolean | undefined>= input<boolean>();
  visibleAndScrollNumber:InputSignal<number>= input.required<number>();


  autoplayInterval  : number = 3000; // in seconds
  constructor(readonly  router:Router) {}


  navigateToDetailsPage(movieId:number){
    this.router.navigateByUrl(`movies/${movieId}/details`).then();
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
