import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss'],
})
export class PromotionListComponent implements OnInit {
  @Input() classNameCol = 'l-2';
  @Input() isFullScreen = true;
  @Input() promotionList: [{ img: string; title?: string }];
  constructor() {}

  ngOnInit(): void {}
}
