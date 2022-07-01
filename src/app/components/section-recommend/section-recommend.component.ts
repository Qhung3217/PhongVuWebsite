import { Subscription } from 'rxjs';
import { Category } from './../../core/models/category.model';
import { CategoryService } from './../../core/services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-section-recommend',
  templateUrl: './section-recommend.component.html',
  styleUrls: ['./section-recommend.component.scss'],
})
export class SectionRecommendComponent implements OnInit, OnDestroy {
  branchList = [
    {
      img: 'assets/imgs/promotion/popular-branch/asus.webp',
      title: 'Asus',
    },
    {
      img: 'assets/imgs/promotion/popular-branch/microsoft.webp',
      title: 'Microsoft',
    },
    {
      img: 'assets/imgs/promotion/popular-branch/hp.webp',
      title: 'HP',
    },
    {
      img: 'assets/imgs/promotion/popular-branch/lenovo.webp',
      title: 'Lenovo',
    },
  ];
  categories: Category[] = [];
  categorySub: Subscription;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    this.categorySub = this.categoryService.categoriesChanged.subscribe(
      (categories) => (this.categories = categories)
    );
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }
}
