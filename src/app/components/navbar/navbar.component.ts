import { CategoryService } from './../../core/services/category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  navItems: Category[];
  navItemSub: Subscription;
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.fetchData().subscribe((categories) => {
      this.navItems = categories;
    });

    this.navItemSub = this.categoryService.categoriesChanged.subscribe(
      (categories) => (this.navItems = categories)
    );
  }
  ngOnDestroy(): void {
    this.navItemSub.unsubscribe();
  }
}
