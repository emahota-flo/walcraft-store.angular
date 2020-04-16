import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {Order} from '../../models/order';
import {Product} from '../../models/product';
import {MatDialog} from '@angular/material/dialog';
import {ModalComponent} from '../../components/modal/modal.component';
import {OrderService} from '../../services/order.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarComponent} from '../../components/snack-bar/snack-bar.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  order: Order;
  shoppingCart$: any;

  promotionalCode$: any;

  constructor(private shoppingCartService: ShoppingCartService,
              private router: Router,
              public dialog: MatDialog,
              private orderService: OrderService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getShoppingCart();
    this.getPromotionalCode();
  }

  ngOnDestroy(): void {
    this.shoppingCart$.unsubscribe();
    this.promotionalCode$.unsubscribe();
  }

  getShoppingCart() {
    this.order = this.shoppingCartService.order;
    this.order.fullPrice = this.shoppingCartService.getSumPriceProduct();

    this.shoppingCart$ = this.shoppingCartService.shoppingCartEvent
      .subscribe(products => {
        this.order.products = products;
        this.order.fullPrice = this.shoppingCartService.getSumPriceProduct();
      });
  }

  deleteProductToCart(product: Product) {
    this.shoppingCartService.deleteProductCart(product);
  }

  getPromotionalCode() {
    this.promotionalCode$ = this.shoppingCartService.promotionalCode$
      .subscribe(response => {
        if (response.status === 1) {
          this.order.activatedPromotionalCode = true;
          this.order.promotionalCode = this.shoppingCartService.order.promotionalCode;
        } else {
          if (this.order.promotionalCode.code) {
            this._snackBar.openFromComponent(SnackBarComponent, {
              duration: 2000,
              data: {
                message: 'Promotional code does not exist!'
              }
            });
          }
        }
      });
  }

  inputCode(code: string) {
    if (!this.order.activatedPromotionalCode) {
      this.shoppingCartService.promotionalCodeTerms.next(code);
    }
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
        this.orderService.saveOrder(this.order)
          .subscribe(response => {
            if (response.clientId) {
              this.shoppingCartService.clearShoppingCart();
              this.router.navigate(['order']);
            }
          });
      } else {
        this._snackBar.openFromComponent(SnackBarComponent, {
          duration: 2000,
          data: {
            message: 'Click "Yes"'
          }
        });
      }
    });
  }
}
