import {ChangeDetectionStrategy, Component, inject, Signal, signal, WritableSignal} from '@angular/core';
import { MovieService } from '../../services/movie/movie.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { CardModule } from 'primeng/card';
import { GalleriaModule } from 'primeng/galleria';
import { TabsModule } from 'primeng/tabs';
import { ImageModule } from 'primeng/image';
import {Credits} from '../../../movie-lists/models/credits';

@Component({
  selector: 'app-credit',
  standalone:true,
  imports: [CardModule, CardModule, AnimateOnScrollModule,
      GalleriaModule, FormsModule,ImageModule,  TabsModule],
  templateUrl: './credit.component.html',
  styleUrl: './credit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditComponent {

  private movieService:MovieService = inject(MovieService);
  private route:ActivatedRoute = inject(ActivatedRoute);
  movieId :WritableSignal<number>= signal(this.route.snapshot.params['id']);
  credits:Signal<Credits| undefined> = toSignal(this.movieService.fetchMovieCredit(this.movieId(), 'fr-FR'));

}
