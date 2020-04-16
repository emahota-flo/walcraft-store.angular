import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../models/category';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {HttpHelperService} from './http-helper.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  selectedCategory: Category;
  selectedCategoryEvent: EventEmitter<Category> = new EventEmitter<Category>();

  constructor(private http: HttpClient,
              private httpHelper: HttpHelperService) {
    if (localStorage.getItem('category')) {
      this.selectedCategory = JSON.parse(localStorage.getItem('category'));
    }
  }


  getCategories(): Observable<Category[]> {
    const url = '/api/category';
    return this.http.get<any>(environment.apiUrl + url).pipe(
      map(response => {
        if (!localStorage.getItem('category')) {
          this.selectCategory(response.data[0]);
        }
        return response.data;
      }),
      catchError(this.httpHelper.handlerError)
    );
  }

  selectCategory(category: Category) {
    localStorage.setItem('category', JSON.stringify(category));
    this.selectedCategory = category;
    this.selectedCategoryEvent.emit(category);
  }

  getSelectedCategory(): Category {
    return this.selectedCategory;
  }
}
