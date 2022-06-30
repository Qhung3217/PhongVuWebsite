import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Event } from '@angular/router';

@Directive({
  selector: '[appStickyHeader]',
})
export class StickyHeaderDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {}
  @HostListener('window:scroll') onScroll(event: Event) {
    // console.log(this.elRef.nativeElement.offsetTop, window.pageYOffset);
    if (window.pageYOffset >= this.elRef.nativeElement.offsetTop) {
      this.renderer.addClass(this.elRef.nativeElement, 'sticky');
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, 'sticky');
    }
  }
}
