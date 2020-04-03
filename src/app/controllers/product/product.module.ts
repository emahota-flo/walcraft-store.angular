import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductComponent} from './product.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../material.module';
import {KeywordComponent} from '../../components/keyword/keyword.component';
import {KeywordPipe} from '../../pipes/keyword.pipe';


@NgModule({
  declarations: [
    ProductComponent,
    KeywordComponent,
    KeywordPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ProductComponent}]),
    MaterialModule
  ]
})
export class ProductModule {
}
