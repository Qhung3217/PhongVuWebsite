import { Component, OnInit, ViewChild } from '@angular/core';
import { SliderComponent } from 'src/app/shared/slider/slider.component';

@Component({
  selector: 'app-section-hero',
  templateUrl: './section-hero.component.html',
  styleUrls: ['./section-hero.component.scss'],
})
export class SectionHeroComponent implements OnInit {
  screenWidth = window.innerWidth;

  @ViewChild(SliderComponent) slider;
  constructor() {}

  ngOnInit(): void {}
  onNextSlide() {
    this.slider.nextSlide();
  }
  onPreviousSlide() {
    this.slider.prevSlide();
  }
}
