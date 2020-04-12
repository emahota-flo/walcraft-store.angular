import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ShoppingCartComponent} from './shopping-cart.component';
import {MaterialModule} from '../../material.module';
import {ModalComponent} from '../../components/modal/modal.component';
import {FormsModule} from '@angular/forms';
import {SnackBarComponent} from '../../components/snack-bar/snack-bar.component';


@NgModule({
  declarations: [
    ShoppingCartComponent,
    ModalComponent,
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ShoppingCartComponent}]),
    MaterialModule,
    FormsModule
  ],
  entryComponents: [ModalComponent]
})
export class ShoppingCartModule {
}
