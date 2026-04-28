import {Component, computed, input, InputSignal, output, OutputEmitterRef, Signal} from '@angular/core';
import {AvatarModule} from 'primeng/avatar';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {Video} from '../../../videos/models/video';
import {YouTubePlayer} from '@angular/youtube-player';
import { LoadingSpinnerComponent } from '../../../share-ui/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-video-dialog',
  standalone: true,
  imports: [Dialog, ButtonModule, InputTextModule,LoadingSpinnerComponent, AvatarModule,  YouTubePlayer],
  templateUrl: './video.dialog.component.html',
  styleUrl: './video.dialog.component.css'
})
export class VideoDialogComponent {
  readonly visible:InputSignal<boolean>  = input.required<boolean>();
  readonly onCloseModal :OutputEmitterRef<boolean> = output<boolean>();
  readonly video:InputSignal<Video | undefined> = input<Video | undefined>();
  protected title:Signal<string> = computed(():string=>
    this.video()!.results.map(
      i=> i.name
    ).join('\t')
      .replaceAll(',', '\t')
  );

  onClose() {
    this.onCloseModal.emit(false);
  }
}
