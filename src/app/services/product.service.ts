import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {HttpHelperService} from './http-helper.service';

import {Product} from '../models/product';
import {ProductRequestParameters} from '../models/product-request-parameters';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  productsTerms: Subject<any> = new Subject();
  products$: Observable<Product[]>;

  constructor(private http: HttpClient,
              private httpHelper: HttpHelperService) {

    this.products$ = this.productsTerms.pipe(
      switchMap((requestParameters: ProductRequestParameters) => this.getProducts(requestParameters)),
      catchError(err => httpHelper.handlerError(err))
    );
  }

  getProducts(requestParameters: ProductRequestParameters): Observable<Product[]> {
    const url = '/v2/images/search';
    const headers = this.httpHelper.getHeaders();
    const options = {
      params: new HttpParams()
        .set('category', requestParameters.categoryId.toString())
        .set('page', requestParameters.pageNumber.toString())
        .set('per_page', '20')
        .set('view', 'full')
        .set('query', requestParameters.keywords.slice(-1).join(' ')),
      headers: headers.headers
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
