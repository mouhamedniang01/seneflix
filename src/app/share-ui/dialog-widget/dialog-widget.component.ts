import {Component,  EventEmitter, Input,   Output} from '@angular/core';
import {AvatarModule} from 'primeng/avatar';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {Video} from '../../movie-lists/models/video';
import {DatePipe} from '@angular/common';
import {YouTubePlayer} from '@angular/youtube-player';

@Component({
  selector: 'app-dialog-widget',
  standalone: true,
  imports: [Dialog, ButtonModule, InputTextModule, AvatarModule, DatePipe, YouTubePlayer],
  templateUrl: './dialog-widget.component.html',
  styleUrl: './dialog-widget.component.css'
})
export class DialogWidgetComponent {
  @Input() visible!: boolean;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() video!: Video ;

  onClose() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
