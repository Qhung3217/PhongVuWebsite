import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-model',
  templateUrl: './image-model.component.html',
  styleUrls: ['./image-model.component.scss'],
})
export class ImageModelComponent implements OnInit {
  @Input() slides;
  @Output() closeEvent = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}
  onClose() {
    this.closeEvent.emit(false);
  }
}
