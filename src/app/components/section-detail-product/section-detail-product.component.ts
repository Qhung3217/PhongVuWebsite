import { Product } from './../../core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-detail-product',
  templateUrl: './section-detail-product.component.html',
  styleUrls: ['./section-detail-product.component.scss'],
})
export class SectionDetailProductComponent implements OnInit {
  product: Product = null;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const slug = params['slug'];
      this.product = this.productService.getProductBySlug(slug);
    });
  }
}
