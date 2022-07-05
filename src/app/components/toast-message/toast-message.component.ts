import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.scss'],
})
export class ToastMessageComponent implements OnChanges, OnInit {
  @Input() duration = 3000;
  @Input() toast: { type?: string; message: string } = {
    message: 'Congratulations!',
  };
  @Input() isAlert = false;
  @ViewChild('toast', { static: true }) toastElement: ElementRef;
  toastList = [];
  delay = (this.duration / 1000).toFixed(2);
  fadeOutDurationMiliseconds = 1000;
  fadeOutDurationSeconds = (this.fadeOutDurationMiliseconds / 1000).toFixed(2);
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges() {
    console.log('on changes');
    if (this.isAlert) {
      this.toastList.push(this.toast);
      setTimeout(
        () => this.toastList.shift(),
        this.duration + this.fadeOutDurationMiliseconds
      );
    }
  }
}
