import {Directive, ElementRef, inject, input, OnInit} from '@angular/core';

@Directive({
  selector: '[appTendances]',
  host: {
    '[style.maxHeight]': 'maxHeight() || defaultMaxHeight',
    '[style.boxShadow]': 'boxShadow() || defaultBoxShadow ',
    '[style.overflow]': 'overflow() || defaultOverflow',
    '[style.borderRadius]': 'borderRadius() || defaultBorderRadius',
  },
})
export class TendancesDirective {
  //defaults css values
  readonly defaultMaxHeight = '80%';
  readonly defaultBoxShadow = '0 20px 30px rgb(0 0 0 / 0.9)';
  readonly defaultOverflow = 'hidden';
  readonly defaultBorderRadius = '12px';

  //inputs parameters
  maxHeight = input<string>('');
  boxShadow = input<string>('');
  overflow = input<string>('');
  borderRadius = input<string>('');
}
