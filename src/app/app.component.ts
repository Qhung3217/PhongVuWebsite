import { CategoryService } from './core/services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'phongvu';
  constructor(private categoryService: CategoryService) {}
  ngOnInit() {}
}
