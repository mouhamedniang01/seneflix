/**
 * @last modification : 17-04-2026
 * Modification: clean
 */
import {
  ChangeDetectionStrategy,
  Component, inject,
  input,
  InputSignal, ViewChild,
} from '@angular/core';

import {ImportModule} from '../../../share-ui/import';
import {Router} from '@angular/router';
import {Cast} from '../../../people/models/cast';
@Component({
  selector: 'app-credit',
  standalone:true,
  imports: [ImportModule],
  templateUrl: './credit.component.html',
  styleUrl: './credit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditComponent {

  actors:InputSignal<Cast[]| []> = input<Cast[]| []>([]);

  selectedActor: Cast | null = null;
   @ViewChild('op') private op!: CreditComponent;
  private router: Router = inject(Router);




  selectActor(actor:Cast) {
    this.selectedActor = actor;
   this.op.hide();
  }

  toggle($event: MouseEvent) {
    this.op.toggle($event);
  }

  private hide() {
    this.router.navigate(['/actors/:id'])
  }
}
