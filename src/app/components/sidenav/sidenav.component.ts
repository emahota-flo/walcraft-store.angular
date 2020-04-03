import {Component, OnInit} from '@angular/core';
import {Category} from '../../models/category';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  categories: Category[];
  selectedCategory: Category;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.getSelectedCategory();
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  selectCategory(category: Category) {
    if (this.selectedCategory.id !== category.id) {
      this.selectedCategory = category;
      this.categoryService.selectCategory(category);
    }
  }

  getSelectedCategory() {
    this.selectedCategory = this.categoryService.selectedCategory;

    this.categoryService.selectedCategoryEvent
      .subscribe(category => {
        this.selectedCategory = category;
      });
  }

}
