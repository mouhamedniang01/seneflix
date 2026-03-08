import { Component } from '@angular/core';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
  selector: 'app-loading-spinner',
  imports: [
    ProgressSpinner
  ],
  template: `
        <div class="card flex justify-center">
            <p-progress-spinner strokeWidth="8"
                                aria-label="Loading"
                                fill="transparent"
                                animationDuration=".5s"
                                [style]="{ width: '50px', height: '50px' }" />
        </div>
    `,
})
export class LoadingSpinnerComponent {

}
