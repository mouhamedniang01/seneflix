import {Component, computed,input, InputSignal} from '@angular/core';
import { Movies } from '../../movie-lists/models/movies';
import {Image} from 'primeng/image';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';
import {Rating} from 'primeng/rating';


@Component({
  selector: 'app-tab-content',
  imports: [FormsModule, Image, CommonModule, Rating,],
  standalone:true,
  templateUrl: './tab-content.component.html',
  styleUrl: './tab-content.component.css'
})
export class TabContentComponent {
 // valueTab: InputSignal<any> = input.required<any>();
  content:InputSignal<Movies | undefined>= input<Movies>();

  constructor(private router: Router) {}


  moviesWithRating = computed(() => {
    const data: Movies| undefined = this.content();
    if (!data) return [];

    return data.results.map(movie => ({
      ...movie,
      vote_average: movie.vote_average / 2
    }));
  });



  //naviger vers la page détaillées avec rafraichissement
  goToDetailsView(movieId:number) {
    this.router.navigateByUrl(`movies/${movieId}/details`).then(
      ()=> {window.location.reload();}
    );
  }
}
