import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {


  @Input() drawer: any;
  sumPriceProduct: number;

  shoppingCart$: any;

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit(): void {
    this.getShoppingCart();
  }

  ngOnDestroy(): void {
    this.shoppingCart$.unsubscribe();
  }

  getShoppingCart() {
    this.sumPriceProduct = this.shoppingCartService.getSumPriceProduct();
    this.shoppingCart$ = this.shoppingCartService.shoppingCartEvent
      .subscribe(cart => {
        this.sumPriceProduct = this.shoppingCartService.getSumPriceProduct();
      });
  }
}
