import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {Order} from '../../models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders: Order[];

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orderService.getOrders()
      .subscribe(orders => {
        this.orders = orders;
      });
  }

}
