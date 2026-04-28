import {Component, input, InputSignal} from '@angular/core';
import { GalleriaModule} from 'primeng/galleria';
import {Images} from '../../movie/models/images';

@Component({
  selector: 'app-galeria-image',
  imports: [GalleriaModule],
  standalone: true,
  templateUrl: './galeria-image.component.html',
  styleUrl: './galeria-image.component.css',
})
export class GaleriaImageComponent {
  readonly images: InputSignal<Images | undefined> = input<Images | undefined>(
    undefined,
  );
  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
    },
  ];
}
