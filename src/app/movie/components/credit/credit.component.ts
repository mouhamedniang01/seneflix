import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MovieService } from '../../services/movie/movie.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { CardModule } from 'primeng/card';
import { GalleriaModule } from 'primeng/galleria';
import { TabsModule } from 'primeng/tabs';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-credit',
  standalone:true,
  imports: [CardModule, CardModule, AnimateOnScrollModule,
      GalleriaModule, FormsModule,ImageModule,  TabsModule],
  templateUrl: './credit.component.html',
  styleUrl: './credit.component.css'
})
export class CreditComponent {

  movieService = inject(MovieService);
  route = inject(ActivatedRoute);
  movieId :WritableSignal<number>= signal(this.route.snapshot.params['id']);
  credits = toSignal(this.movieService.fetchMovieCredit(this.movieId(), 'fr-FR'));

}
