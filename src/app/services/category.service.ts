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
    /**
     * TODO: для ситуаций когда ты используешь одни и теже хедеры для запросов
     * ты можешь создать сервис для запрсоов в котором ты объявляешь один раз хедеры
     * и используешь их в каждом запросе
     * ЛИБО ты можешь использовать HttpInterceptor который позволяет изменять исходящие запроосы
     */
    const headers = this.httpHelper.getHeaders();
    return this.http.get<Category[]>(environment.apiUrl + url, headers).pipe(
      map(response => {
        if (!localStorage.getItem('category')) {
          // TODO: чтобы не использовать конструцию obj['prop'] добавь интерфейс для ответа на запрос
          this.selectCategory(response['data'][0]);
        }
        // TODO: это бесполезная операция. на выходе тот же массив
        let categories = [].slice.call(response['data']);
        return categories.map(function(data: any) {
          return {
            id: data.id,
            name: data.name
          };
        });
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
