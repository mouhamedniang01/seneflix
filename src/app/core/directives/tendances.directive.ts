import {Directive, ElementRef, inject, OnInit} from '@angular/core';

@Directive({
    selector: '[appTendances]'
})
export class TendancesDirective implements OnInit {
  private el = inject(ElementRef<HTMLElement>);

  constructor() {
    const element = this.el.nativeElement;
    element.style.maxHeight = '80%';
   // element.style.boxShadow = '0 20px 30px rgb(0 0 0 / 0.9)';
    element.style.borderRadius = '12px';
    element.style.overflow = 'hidden';
    element.style.margin = '0 auto';
  }
  ngOnInit() {

  }
}
