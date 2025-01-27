import { Component, input, InputSignal } from '@angular/core';
import { Movies } from '../../models/movies';
import { Rating } from 'primeng/rating';
import {Image} from 'primeng/image';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 

@Component({
  selector: 'app-tab-content',
  imports: [ Rating, FormsModule, Image,CommonModule ],
  standalone:true,
  templateUrl: './tab-content.component.html',
  styleUrl: './tab-content.component.css'
})
export class TabContentComponent {
 // valueTab: InputSignal<any> = input.required<any>();
  content:InputSignal<Movies | undefined>= input<Movies>();
}
