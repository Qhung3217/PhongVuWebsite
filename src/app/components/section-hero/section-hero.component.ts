import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-hero',
  templateUrl: './section-hero.component.html',
  styleUrls: ['./section-hero.component.scss'],
})
export class SectionHeroComponent implements OnInit {
  screenWidth = window.innerWidth;
  isNextSlide = false;
  isPreviousSlide = false;
  constructor() {}

  ngOnInit(): void {}
  onNextSlide() {
    this.isNextSlide = true;
  }
  onPreviousSlide() {
    this.isPreviousSlide = true;
  }
  onCompleteChangeSlide() {
    this.isNextSlide = false;
    this.isPreviousSlide = false;
  }
}
