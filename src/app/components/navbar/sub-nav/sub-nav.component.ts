import { Category } from 'src/app/core/models/category.model';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-nav',
  templateUrl: './sub-nav.component.html',
  styleUrls: ['./scss/sub-nav.component.scss'],
})
export class SubNavComponent implements OnInit, OnChanges {
  rangePrice: {
    low?: string;
    middle?: { upperBound: string; lowerBound: string };
    hight?: string;
  };
  @Input() navItem: Category;
  @Input() isMobile = false;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // console.log('init');
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getRangePrice();
    // console.log('onchange');
  }
  getRangePrice() {
    this.rangePrice = {};
    const products = this.productService.getProducts();
    if (products.length == 0) return;
    if (this.navItem === null) return;
    const productsInCategory = products.filter(
      (prod) => prod.category._id === this.navItem._id
    );

    productsInCategory.forEach((prod) => {
      if (prod.price < 1000)
        this.rangePrice = { ...this.rangePrice, low: '1000' };
      if (prod.price >= 1000 && prod.price <= 2000)
        this.rangePrice = {
          ...this.rangePrice,
          middle: { lowerBound: '1000', upperBound: '2000' },
        };
      if (prod.price > 2000)
        this.rangePrice = { ...this.rangePrice, hight: '2000' };
    });
    // console.log(
    //   products.filter((prod) => prod.category._id === this.navItem._id),
    //   products,
    //   this.rangePrice
    // );
  }
  // onHoverOut() {
  //   console.log('out');
  //   this.rangePrice = {};
  //   this.navItem = null;
  // }
}
