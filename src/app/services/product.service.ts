import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {catchError, debounceTime, exhaustMap, map, switchMap} from 'rxjs/operators';
import {HttpHelperService} from './http-helper.service';

import {Product} from '../models/product';
import {ProductRequestParameters} from '../models/product-request-parameters';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  productsTermsForCategory: Subject<any> = new Subject();
  productsForCategory$: Observable<Product[]>;

  productsTermsForScroll: Subject<any> = new Subject();
  productsForScroll$: Observable<Product[]>;

  constructor(private http: HttpClient,
              private httpHelper: HttpHelperService) {

    this.productsForCategory$ = this.productsTermsForCategory.pipe(
      debounceTime(100),
      switchMap((requestParameters: ProductRequestParameters) => this.getProducts(requestParameters)),
      catchError(err => httpHelper.handlerError(err))
    );

    this.productsForScroll$ = this.productsTermsForScroll.pipe(
      exhaustMap((requestParameters: ProductRequestParameters) => this.getProducts(requestParameters)),
      catchError(err => httpHelper.handlerError(err))
    );
  }

  getProducts(requestParameters: ProductRequestParameters): Observable<Product[]> {
    const url = environment.apiUrl + '/api/product';
    const options = {
      params: new HttpParams()
        .set('category', requestParameters.categoryId.toString())
        .set('page', requestParameters.pageNumber.toString())
        .set('per_page', '20')
        .set('view', 'full')
        .set('query', requestParameters.keywords.slice(-1).join(' '))
    };

    return this.http.get(url, options).pipe(
      map(response => {
        let products: Product[] = [].slice.call(response['data']);
        return products.map((data: any) => {
          return {
            id: data.id,
            image: data.assets.preview.url,
            description: data.description,
            price: data.assets.preview.height,
            keywords: data.keywords
          };
        });
      })
    );
  }
}
