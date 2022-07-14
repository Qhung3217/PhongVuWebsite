import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.scss'],
})
export class NavbarMobileComponent implements OnInit {
  navItems: Category[];
  navItemSub: Subscription;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.categoryService.fetchData().subscribe((categories) => {
      this.navItems = categories;
    });
    this.productService.fetchData().subscribe();

    this.navItemSub = this.categoryService.categoriesChanged.subscribe(
      (categories) => (this.navItems = categories)
    );
  }
  ngOnDestroy(): void {
    this.navItemSub.unsubscribe();
  }
}
