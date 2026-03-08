import {Component, computed, inject, input, InputSignal, Signal, signal, WritableSignal} from '@angular/core';
import {DatePipe, DecimalPipe} from '@angular/common';
import {Image} from 'primeng/image';
import {Tag} from 'primeng/tag';
import {Cast} from '../../movie/models/credits';
import {Button} from 'primeng/button';
import {Result} from '../../movie/models/movies';
import {Router} from '@angular/router';
import {VideoDialogComponent} from '../video-dialog/video.dialog.component';
import {Video} from '../../movie/models/video';

@Component({
  selector: 'app-details-page',
  imports: [
    DatePipe,
    Image,
    Tag,
    DecimalPipe,
    Button,
    VideoDialogComponent,
  ],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css',
})
export class DetailsPageComponent {
  title:InputSignal<string |undefined> =input<string>();
  synopsys:InputSignal<string |undefined> =input<string>();
  ratings:InputSignal<number |undefined> =input<number>();
  release_date:InputSignal<string |undefined> =input<string>();
  poster_path:InputSignal<string |undefined> =input<string|undefined>();
  genres:InputSignal<string[] |undefined> =input<string[]|undefined>();
  countries: InputSignal<string[] |undefined> =input<string[]|undefined>();
  production_compagnies: InputSignal<string[] |undefined> =input<string[]|undefined>();
  cast_rounded_images :  InputSignal<Cast[] |undefined> =input<Cast[] |undefined>();
  similars:  InputSignal<Result[] |undefined> =input<Result[] |undefined>();
  endpoint:InputSignal<string |undefined> =input<string>();

  router : Router = inject(Router);

  defaultPlaceholder: string = 'https://placehold.co/700x700';

  displayTitle: Signal<string> = computed(():string=> this.similars()!.length > 0 ? 'flex':'none');

  //naviger vers la page détaillées avec rafraichissement
  goToDetailsView(id:number) {
    this.router.navigateByUrl(
    `${this.endpoint()}/${id}/details`).then(
      ()=> {window.location.reload();}
      );
  }

  visible:WritableSignal <boolean> = signal(false);

  //show trailer video modal on youtube
  video : InputSignal<Video|undefined> = input<Video |undefined>();
  showYoutubeVideoModal() {
    this.visible.set(true);
  }

 //on close video modal
  protected closeVideoModal($event: boolean) {
    this.visible.set($event);
  }

  getRandomInt(max:number):number {
    return Math.floor(Math.random() * max);
  }

  posterPathStyle(){
    return ".poster-path {\n" +
      "  max-width: 350px;\n" +
      "  width: 100%;\n" +
      "  cursor: pointer;\n" +
      "}\n" +
      ".poster-path:hover{\n" +
      "  opacity: 0.8;\n" +
      "  transition: 20s opacity;\n" +
      "}";
  }
}
