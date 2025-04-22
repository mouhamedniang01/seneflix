import {Component, Input, input, InputSignal, model} from '@angular/core';
import { GalleriaModule} from 'primeng/galleria';
import {Images} from '../../movie-lists/models/images';
import {Image} from 'primeng/image';

@Component({
  selector: 'app-galeria-image',
  imports: [GalleriaModule],
  standalone:true,
  templateUrl: './galeria-image.component.html',
  styleUrl: './galeria-image.component.css'
})
export class GaleriaImageComponent {
  @Input() images!:Images ;
  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4
    },
    {
      breakpoint: '575px',
      numVisible: 1
    }
  ];
}
