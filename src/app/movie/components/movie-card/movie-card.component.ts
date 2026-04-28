import {ChangeDetectionStrategy, Component, input, InputSignal} from '@angular/core';
import { Router} from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {DecimalPipe} from '@angular/common';
@Component({
  selector: 'app-movie-card',
  imports: [
    CardModule, ButtonModule, DecimalPipe
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent {
  // movies params
  name:InputSignal<string |undefined> = input<string|undefined>(undefined);
  rating:InputSignal<number> = input(0) ;
  realese_date :InputSignal<Date | undefined> = input<Date | undefined>(undefined);
  poster_path: InputSignal<string|undefined> = input<string|undefined>(undefined);
  //poster_width:InputSignal<string> = input.required<string>();
  movieId : InputSignal<number |undefined> = input<number |undefined>(undefined);
  popularity : InputSignal<number|undefined> = input<number| undefined>();
  synopsis :InputSignal<string |undefined> = input<string |undefined>();
  constructor(private readonly router: Router) { }


  //navigate to movie details page
  protected height: InputSignal<number | undefined> = input<number | undefined>();
  goToDetailPage(movieId:number) {
    this.router.navigateByUrl(`movies/${movieId}/details`).then();
  }

}
