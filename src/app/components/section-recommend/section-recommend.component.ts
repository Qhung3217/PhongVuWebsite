import { Category } from './../../core/models/category.model';
import { CategoryService } from './../../core/services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-recommend',
  templateUrl: './section-recommend.component.html',
  styleUrls: ['./section-recommend.component.scss'],
})
export class SectionRecommendComponent implements OnInit {
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

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    if (this.categories.length === 0)
      this.categoryService
        .fetchData()
        .subscribe((categories) => (this.categories = categories));
  }
}
