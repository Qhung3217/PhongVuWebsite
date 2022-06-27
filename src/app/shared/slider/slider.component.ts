import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() slides: [{ img: string }];
  @Input() classObj;
  @Input() slideConfig: { any: any };
  // slides = [
  //   { img: 'https://picsum.photos/350?random=1' },
  //   { img: 'https://picsum.photos/350?random=2' },
  //   { img: 'https://picsum.photos/350?random=3' },
  //   { img: 'https://picsum.photos/350?random=4' },
  // ];

  constructor() {}

  ngOnInit(): void {}
}
