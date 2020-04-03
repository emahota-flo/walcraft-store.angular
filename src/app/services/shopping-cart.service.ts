import {EventEmitter, Injectable} from '@angular/core';
import {Product} from '../models/product';
import {Order} from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCartEvent: EventEmitter<Product[]> = new EventEmitter<Product[]>();
  shoppingCart: Product[] = [];

  order: Order = new Order();

  constructor() {
    if (localStorage.getItem('shoppingCart')) {
      this.order = JSON.parse(localStorage.getItem('shoppingCart'));
    } else {
      this.order.products = [];
    }
  }

  addProductCart(product: Product) {
    if (this.order.activatedPromotionalCode) {
      product.price = Math.round(product.price * 0.9);
    }

    this.order.products.push(product);
    this.shoppingCartEvent.emit(this.order.products);
    localStorage.setItem('shoppingCart', JSON.stringify(this.order));

  }

  deleteProductCart(product: Product) {
    this.order.products.splice(this.order.products.findIndex(x => +x.id === +product.id), 1);
    this.shoppingCartEvent.emit(this.order.products);
    localStorage.setItem('shoppingCart', JSON.stringify(this.order));
  }

  getSumPriceProduct(): number {
    return this.order.products.reduce((sum, value) => sum + value.price, 0);
  }

  clearShoppingCart() {
    localStorage.removeItem('shoppingCart');
    this.order = new Order();
    this.order.products = [];
    this.shoppingCartEvent.emit(this.order.products);
  }

  activatedPromotionalCode(code: string) {
    if (code === 'wl10') {
      this.order.promotionalCode = code;
      this.order.activatedPromotionalCode = true;
      this.order.products.forEach((product) => {
        product.price = Math.round(product.price * 0.9);
      });

      localStorage.setItem('shoppingCart', JSON.stringify(this.order));
      this.shoppingCartEvent.emit(this.order.products);
    }
  }
}
