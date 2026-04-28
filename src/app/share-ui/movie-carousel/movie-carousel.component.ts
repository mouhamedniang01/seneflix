import {Component, input, InputSignal, signal, WritableSignal} from '@angular/core';

import { CarouselModule } from 'primeng/carousel';
import {Router, RouterLink} from '@angular/router'; // carousel import prime ng
import { Movies } from '../../movie/models/movies';
import {Button} from 'primeng/button';
import {Tag} from 'primeng/tag';
import {DecimalPipe, NgStyle} from '@angular/common';
@Component({
  selector: 'app-movie-carousel',
  imports: [
    CarouselModule,
    Button,
    Tag,
    NgStyle,
    DecimalPipe,
    RouterLink
  ],
  standalone:true,
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.css'
})
export class MovieCarouselComponent {

  showPosterPath:InputSignal<boolean> = input<boolean>(false);
  movies:InputSignal<Movies| undefined>= input<Movies | undefined>(undefined);
  showNavigation:InputSignal<boolean> = input<boolean>(false);
  showIndicators :InputSignal<boolean>= input<boolean>(false);
  visibleAndScrollNumber:InputSignal<number>= input<number>(1);


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
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '1199px',
          numVisible: 2,
          numScroll: 2
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
  imageSize = input<string | null>();
  protected style: any = input<number | null>(null);
  readonly sectionTitle = input<string | null>(null);
  readonly height = input<any | null>(null);
  show_vote = input<boolean>(false);//tag
  viewAllRouteLink = input<string>('/');
}
