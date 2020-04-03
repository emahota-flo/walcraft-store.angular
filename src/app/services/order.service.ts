import {EventEmitter, Injectable} from '@angular/core';
import {Order} from '../models/order';
import {ShoppingCartService} from './shopping-cart.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: Order[] = [];
  ordersEvent: EventEmitter<Order[]> = new EventEmitter<Order[]>();

  constructor(private shoppingCartService: ShoppingCartService,
              private router: Router) {
    if (localStorage.getItem('order')) {
      this.orders = JSON.parse(localStorage.getItem('order'));
    }
  }

  saveOrder(order: Order) {
    let newOrder: Order = {
      date: new Date(),
      products: order.products,
      activatedPromotionalCode: order.activatedPromotionalCode,
      promotionalCode: order.promotionalCode,
      fullPrice: order.fullPrice
    };

    let orders: Order[] = JSON.parse(localStorage.getItem('order')) || [];

    if (orders) {
      orders.push(newOrder);
      localStorage.setItem('order', JSON.stringify(orders));
    } else {
      orders.push(newOrder);
      localStorage.setItem('order', JSON.stringify(orders));
    }

    this.shoppingCartService.clearShoppingCart();

    this.orders.push(newOrder);
    this.ordersEvent.emit(this.orders);

    this.router.navigate(['order']);
  }

}
