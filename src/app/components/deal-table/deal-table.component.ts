import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-deal-table',
  templateUrl: './deal-table.component.html',
  styleUrls: ['./deal-table.component.scss'],
})
export class DealTableComponent implements OnInit, OnDestroy {
  @Input() isCountdown = false;
  @Input() href = '#';
  @Input() title;
  hours = 24;
  minutes = 60;
  seconds = 60;
  interval;
  constructor() {}

  ngOnInit(): void {
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 2);
    countdownDate.setHours(23);
    countdownDate.setMinutes(59);
    countdownDate.setSeconds(59);
    this.interval = setInterval(() => {
      const distance = countdownDate.getTime() - new Date().getTime();
      this.hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000);
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
