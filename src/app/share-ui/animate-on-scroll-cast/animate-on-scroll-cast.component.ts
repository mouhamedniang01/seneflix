import { Component } from '@angular/core';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-animate-on-scroll-cast',
  imports: [AvatarModule,AnimateOnScrollModule,ButtonModule ,CardModule],
  templateUrl: './animate-on-scroll-cast.component.html',
  styleUrl: './animate-on-scroll-cast.component.css'
})
export class AnimateOnScrollCastComponent {

}
