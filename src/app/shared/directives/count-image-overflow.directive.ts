import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCountImageOverflow]',
})
export class CountImageOverflowDirective implements AfterViewInit {
  constructor(private eleRef: ElementRef, private renderer: Renderer2) {
    // const elWidth;
  }
  ngAfterViewInit() {
    const el = this.eleRef.nativeElement;
    const elChild = el.children;
    const elWidth = elChild[1].offsetLeft - elChild[0].offsetLeft;
    if (elWidth * elChild.length > el.offsetWidth)
      this.renderer.setAttribute(
        el,
        'data-overflow-img',
        '+' + Math.ceil(el.offsetWidth / (elWidth * elChild.length))
      );

    // console.log(
    //   'asx',
    //   el.offsetWidth,
    //   elWidth * elChild.length,
    //   this.eleRef,
    //   el.offsetWidth / elWidth
    // );
  }
}
