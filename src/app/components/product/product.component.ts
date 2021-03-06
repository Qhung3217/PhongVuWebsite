import { Product } from './../../core/models/product.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./scss/product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Input() isSale = false;
  constructor() {}

  ngOnInit(): void {}
}
