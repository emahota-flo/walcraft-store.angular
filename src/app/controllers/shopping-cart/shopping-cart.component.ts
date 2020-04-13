import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {Order} from '../../models/order';
import {Product} from '../../models/product';
import {MatDialog} from '@angular/material/dialog';
import {ModalComponent} from '../../components/modal/modal.component';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  order: Order;
  shoppingCart$: any;

  constructor(private shoppingCartService: ShoppingCartService,
              public dialog: MatDialog,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.order = this.shoppingCartService.order;
    this.order.fullPrice = this.shoppingCartService.getSumPriceProduct();

    this.getShoppingCart();
  }

  ngOnDestroy(): void {
    this.shoppingCart$.unsubscribe();
  }

  deleteProductToCart(product: Product) {
    this.shoppingCartService.deleteProductCart(product);
  }

  getShoppingCart() {
    this.shoppingCart$ = this.shoppingCartService.shoppingCartEvent
      .subscribe(products => {
        this.order.products = products;
        this.order.fullPrice = this.shoppingCartService.getSumPriceProduct();
      });
  }

  saveOrder() {
    const dialogRef = this.dialog.open(ModalComponent,
      {
        data: {title: 'Order', description: 'Order price $' + this.order.fullPrice + '.00. Do you want to pay for the order?'},
        width: '300px'
      });
    /**
     * else не обязателен
     */
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.saveOrder(this.order);
      } else {

      }
    });
  }

  inputCode(code: string) {
    if (!this.order.activatedPromotionalCode) {
      if (code === 'wl10') {
        this.order.activatedPromotionalCode = true;
        this.shoppingCartService.activatedPromotionalCode(code);
      }
    }
  }
}
