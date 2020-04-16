import {EventEmitter, Injectable} from '@angular/core';
import {Product} from '../models/product';
import {Order} from '../models/order';
import {HttpHelperService} from './http-helper.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCartEvent: EventEmitter<Product[]> = new EventEmitter<Product[]>();
  shoppingCart: Product[] = [];

  order: Order = {
    clientId: null,
    date: null,
    products: [],
    fullPrice: 0,
    activatedPromotionalCode: false,
    promotionalCode: {
      code: '',
      discountPercentage: 0
    }
  };

  promotionalCode$: any;
  promotionalCodeTerms: Subject<string> = new Subject<string>();

  constructor(private httpHelper: HttpHelperService,
              private http: HttpClient) {
    const order = JSON.parse(localStorage.getItem('shoppingCart'));
    order ? this.order = order : this.order.products = [];

    this.promotionalCode$ = this.promotionalCodeTerms.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((code: string) => this.activatedPromotionalCode(code))
    );
  }

  addProductCart(product: Product) {
    if (this.order.activatedPromotionalCode) {
      product.price =
        Math.round(product.price - (product.price * this.order.promotionalCode.discountPercentage / 100));
    }

    this.order.products.push(product);
    this.saveShoppingCart();
  }

  deleteProductCart(product: Product) {
    this.order.products.splice(this.order.products.findIndex(x => +x.id === +product.id), 1);
    this.saveShoppingCart();
  }

  getSumPriceProduct(): number {
    return this.order.products.reduce((sum, value) => sum + value.price, 0);
  }

  clearShoppingCart() {
    this.order = {
      clientId: null,
      date: null,
      products: [],
      fullPrice: 0,
      activatedPromotionalCode: false,
      promotionalCode: {
        code: '',
        discountPercentage: 0
      }
    };
    this.order.products = [];
    this.saveShoppingCart();
  }

  saveShoppingCart() {
    this.shoppingCartEvent.emit(this.order.products);
    localStorage.removeItem('shoppingCart');
  }

  activatedPromotionalCode(code: string): Observable<any> {
    const url = environment.apiUrl + '/api/promotional-code/check';
    const headers = this.httpHelper.getHeaders();
    const options = {
      params: new HttpParams()
        .set('code', code),
      headers: headers.headers
    };

    return this.http.get<any>(url, options).pipe(
      map(response => {
        if (response.status === 1) {
          this.order.promotionalCode = response.data;
          this.order.activatedPromotionalCode = true;
          this.order.products.forEach((product) => {
            product.price =
              Math.round(product.price - (product.price * this.order.promotionalCode.discountPercentage / 100));
          });

          this.shoppingCartEvent.emit(this.order.products);
          localStorage.setItem('shoppingCart', JSON.stringify(this.order));
        }

        return response;
      }));
  }
}
