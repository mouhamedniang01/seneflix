import {ChangeDetectionStrategy, Component, input, InputSignal} from '@angular/core';
import { Router} from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TendancesDirective } from '../../../core/directives/tendances.directive';
@Component({
  selector: 'app-movie-card',
  imports: [
    CardModule,ButtonModule,TendancesDirective
  ],
  templateUrl: './movie-card.component.html',
  standalone: true,
  styleUrl: './movie-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent {
  // movies params
  name:InputSignal<string> = input<string>('');
  rating:InputSignal<number> = input(0) ;
  realese_date :InputSignal<Date> = input<Date>(new Date());
  poster_path: InputSignal<string> = input<string>('');
  poster_width:InputSignal<string> = input.required<string>();
  movieId : InputSignal<number> = input<number>(0);

  constructor(private readonly router: Router) { }


  //navigate to movie details page
  goToDetailPage(movieId:number) {
    this.router.navigateByUrl(`movies/details/${movieId}`).then();
  }
}
