import { Component, input, InputSignal } from '@angular/core';
import { Movies } from '../../models/movies';
import {Image} from 'primeng/image';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';


@Component({
  selector: 'app-tab-content',
  imports: [  FormsModule, Image,CommonModule ],
  standalone:true,
  templateUrl: './tab-content.component.html',
  styleUrl: './tab-content.component.css'
})
export class TabContentComponent {
 // valueTab: InputSignal<any> = input.required<any>();
  content:InputSignal<Movies | undefined>= input<Movies>();

  constructor(private router: Router) {
  }


  goToDetailsView(movieId:number) {
    this.router.navigateByUrl(`movies/details/${movieId}`).then(
      value => {window.location.reload();}
    );
  }
}
