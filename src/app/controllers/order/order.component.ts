import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {Order} from '../../models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  orders: Order[];
  orders$: any;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orders = this.orderService.orders;

    this.orders$ = this.orderService.ordersEvent
      .subscribe(orders => {
        this.orders$ = orders;
      });
  }

  ngOnDestroy(): void {
    this.orders$.unsubscribe();
  }

}
