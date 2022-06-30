import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowCatalog]',
})
export class ShowCatalogDirective {
  constructor(private eleRef: ElementRef, private renderer: Renderer2) {}
  @HostListener('click') toggleCatalog(event) {
    this.eleRef.nativeElement.classList.toggle('active');
  }
}
