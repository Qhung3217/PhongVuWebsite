import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-hot-deal',
  templateUrl: './section-hot-deal.component.html',
  styleUrls: ['./scss/section-hot-deal.component.scss'],
})
export class SectionHotDealComponent implements OnInit {
  selected = 'gaming';
  backgroundUrl = 'url(assets/imgs/deals/25th.png)';
  constructor() {}

  ngOnInit(): void {}

  onClick(key) {
    this.selected = key;
    if (key === 'gaming')
      this.backgroundUrl = 'url(assets/imgs/deals/25th.png)';
    else this.backgroundUrl = 'url(assets/imgs/deals/25th-office.png)';
  }
}
