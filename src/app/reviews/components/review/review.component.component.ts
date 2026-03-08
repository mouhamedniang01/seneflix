import {Component, computed, input, InputSignal, OnInit, Signal} from '@angular/core';
import {PanelModule} from 'primeng/panel';
import {ReviewInfo} from '../../models/review.info';
import {Avatar} from 'primeng/avatar';
import {Button, ButtonDirective} from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import {DecimalPipe} from '@angular/common';
@Component({
  selector: 'app-review',
  imports: [PanelModule, Avatar, Button, MenuModule, DecimalPipe, ButtonDirective],
  templateUrl: './review.component.component.html',
  styleUrl: './review.component.component.css',
})
export class ReviewComponentComponent implements OnInit{
  ngOnInit(): void {
      console.log(this.review().url);
  }

  review : InputSignal<ReviewInfo> = input.required<ReviewInfo>();

  lastModificationDate:Signal<string> = computed(():string=>
    this.getDateDiferencesFromNow()
  );

  urlLink:Signal<string> = computed(()=> this.review().url);

  convertStringToDate(stringDate:string){
    return Date.parse(stringDate);
  }

  getDateDiferencesFromNow() : string{
    let updatedDate:number = this.convertStringToDate(this.review().updated_at.trim());
    let differencesBySeconde :number = (Date.now() - updatedDate); // milliseconds
    let diffDays:number = Math.floor(differencesBySeconde / 86400000); // days
    let diffHrs:number = Math.floor((differencesBySeconde % 86400000) / 3600000); // hours
    let diffMins:number = Math.round(((differencesBySeconde % 86400000) % 3600000) / 60000); // minutes
    console.log(diffDays + " days, " + diffHrs + " hours, " + diffMins + "minutes");
    if(diffHrs < 24 && diffDays <= 0 ){
      return  diffHrs + " hours ago " ;
    }else if (diffHrs < 0 && diffDays < 0 ){
      return diffMins + "minutes ago";
    }
    return diffDays + " days";
  }

  protected imageUrl = computed(
    ()=>  this.review()!.author_details.avatar_path ?
      'https://image.tmdb.org/t/p/w500'+  this.review()!.author_details.avatar_path
      : 'https://placehold.co/700x700'
  );


}
