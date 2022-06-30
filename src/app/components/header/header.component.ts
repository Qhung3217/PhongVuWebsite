import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // @ViewChild('header', { static: true }) headerEl: ElementRef;
  constructor() {}

  ngOnInit(): void {
    // console.log(this.headerEl.nativeElement);
  }
}
