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
    /**
     * TODO: обычно одинаковые вещи помещаются в переменную
     */
    const order = localStorage.getItem('order')
    if (order) {
      this.orders = JSON.parse(order);
    }
  }

  saveOrder(order: Order) {
    /**
     * можешь использовать деструктуризацию
     * {
     *   date: new Date(),
     *   ...order
     * }
     */
    let newOrder: Order = {
      date: new Date(),
      products: order.products,
      activatedPromotionalCode: order.activatedPromotionalCode,
      promotionalCode: order.promotionalCode,
      fullPrice: order.fullPrice
    };
    /**
     * TODO: зачем постоянно брать из ЛС, у тебя есть свойство класса
     * при его изменение просто перезаписываешь значение в ЛС
     * сейчас тут лишний коод
      */
    // let orders: Order[] = JSON.parse(localStorage.getItem('order')) || [];
    // // TODO: ????? тут ты всегда попадаешь в тру проверка не нужна
    // if (orders) {
    //   orders.push(newOrder);
    // } else {
    //   orders.push(newOrder);
    //   localStorage.setItem('order', JSON.stringify(orders));
    // }

    this.shoppingCartService.clearShoppingCart();

    this.orders.push(newOrder);
    localStorage.setItem('order', JSON.stringify(this.orders));
    this.ordersEvent.emit(this.orders);

    this.router.navigate(['order']);
  }

}
