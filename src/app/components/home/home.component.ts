import { Component } from '@angular/core';
import {MovieCarouselComponent} from '../movie-carousel/movie-carousel.component';
import {UpcomingMoviesComponent} from '../upcoming-movies/upcoming-movies.component';

@Component({
  selector: 'app-home',
  imports: [MovieCarouselComponent,UpcomingMoviesComponent],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
