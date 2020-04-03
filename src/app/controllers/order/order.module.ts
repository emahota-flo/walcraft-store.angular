import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {OrderComponent} from './order.component';
import {MaterialModule} from '../../material.module';


@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: OrderComponent}]),
    MaterialModule
  ]
})
export class OrderModule {
}
