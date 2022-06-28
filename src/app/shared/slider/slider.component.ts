import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, OnChanges {
  @Input() slides: [{ img: string }];
  @Input() classObj;
  @Input() slideConfig: { any: any };
  @Input() isNext = false;
  @Input() isPrevious = false;
  @Output() isChangeSlideComplete = new EventEmitter();
  @ViewChild('slickModal', { static: true }) slickModal: SlickCarouselComponent;
  // slides = [
  //   { img: 'https://picsum.photos/350?random=1' },
  //   { img: 'https://picsum.photos/350?random=2' },
  //   { img: 'https://picsum.photos/350?random=3' },
  //   { img: 'https://picsum.photos/350?random=4' },
  // ];

  constructor() {}

  ngOnInit(): void {}
  ngOnChanges() {
    if (this.isNext) this.nextSlide();
    if (this.isPrevious) this.prevSlide();
  }
  nextSlide() {
    this.slickModal.slickNext();
    this.isChangeSlideComplete.emit(null);
  }
  prevSlide() {
    this.slickModal.slickPrev();
    this.isChangeSlideComplete.emit(null);
  }
}
