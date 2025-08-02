import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[appTendances]'
})
export class TendancesDirective {
  @Input() appTendances = '';
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.maxWidth = '580px';
    this.el.nativeElement.style.boxShadow= ' box-shadow: 0 20px 30px rgb(0 0 0 / 0.9)';
    this.el.nativeElement.style.borderRadius = '12px';
    this.el.nativeElement.style.overflow = 'hidden';
    this.el.nativeElement.style.margin = '0 auto';
  }

}
