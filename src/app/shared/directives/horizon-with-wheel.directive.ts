import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHorizonWithWheel]',
})
export class HorizonWithWheelDirective {
  @HostListener('wheel', ['$event']) horizontalWheel(event: WheelEvent) {
    event.preventDefault();
    this.elRef.nativeElement.scrollLeft += event.deltaY;
  }
  constructor(private elRef: ElementRef) {}
}
