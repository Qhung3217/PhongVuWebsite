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
    // console.log(
    //   window.pageYOffset,
    //   this.elRef.nativeElement.offsetTop,
    //   document.documentElement.scrollTop,
    //   this.elRef.nativeElement.offsetTop + 10
    // );
    // let nextSib = this.elRef.nativeElement.nextSibling;
    if (
      document.documentElement.scrollTop >= this.elRef.nativeElement.offsetTop
    ) {
      this.renderer.addClass(this.elRef.nativeElement, 'sticky');
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, 'sticky');
    }
    // fix bug while change height
    if (
      document.documentElement.scrollTop + 10 >=
      this.elRef.nativeElement.offsetTop
    )
      this.elRef.nativeElement.style.height = '7.2rem';
    else this.elRef.nativeElement.style.height = '8.8rem';
  }
}
