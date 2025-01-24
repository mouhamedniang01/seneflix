import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[appTendances]'
})
export class TendancesDirective {
  @Input() appTendances = '';
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.maxWidth = '260px';
  }

}
