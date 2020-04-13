import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHelperService } from './http-helper.service';

@Injectable({
  providedIn: 'root',
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
    const url = '/v2/images/categories';
    /**
     * TODO: для ситуаций когда ты используешь одни и теже хедеры для запросов
     * ты можешь создать сервис для запрсоов в котором ты объявляешь один раз хедеры
     * и используешь их в каждом запросе
     * ЛИБО ты можешь использовать HttpInterceptor который позволяет изменять исходящие запроосы
     */
    const headers = this.httpHelper.getHeaders();
    return this.http.get(url, headers).pipe(
      map(response => {
        if (!localStorage.getItem('category')) {
          this.selectCategory(response['data'][0]);
        }
        // TODO: это бесполезная операция. на выходе тот же массив
        let categories = [].slice.call(response['data']);
        // TODO:
        return categories.map((data: any) => {
          return {
            id: data.id,
            name: data.name,
          };
        });
      }),
      /**
       * TODO: это скрее всего работать не будет
       * в стрелочной функции то просто возвращаешь метод
       * чтобы это работало используй либо:
       * catchError(err => this.httpHelper.handlerError(err))
       * это вернет результат выполнения handlerError
       * либо:
       * catchError(this.httpHelper.handlerError)
       * тут в качестве коллбека будет использован метод handlerError
       * простой пример для понимая:
       * Если есть метод
       *
       *   и мы используем его вот так
       *   catchError(this.handlerError);
       *   будет равно этому:
       *   catchError((error)=> {
       *     console.error(error)
       *   })
       */
      catchError((err) => this.httpHelper.handlerError),
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
function handlerError(error) {
  console.error(error);
}
