import {Component, input, InputSignal, output, OutputEmitterRef, signal, WritableSignal} from '@angular/core';
import {Paginator, PaginatorState} from 'primeng/paginator';
import { Result} from '../../models/movies';
import {MovieCardComponent} from '../movie-card/movie-card.component';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-movie-list',
  imports: [Paginator, MovieCardComponent, FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent {
  moviesInputSignal: InputSignal<Result[] | []> = input<Result[] | []>([]);
  totalResults: InputSignal<number | undefined> = input<number | undefined>(
    undefined,
  );

  //paginator parameters
  first: WritableSignal<number> = signal(1);
  rows: WritableSignal<number> = signal(10);

  onPageUpdate: OutputEmitterRef<number> = output<number>();

  //change page parameters
  onPageChange(event: PaginatorState): void {
    const page: number = (event.page ?? 0) + 1;
    this.first.set(event.first ?? 1);
    this.onPageUpdate.emit(page);
  }
}
