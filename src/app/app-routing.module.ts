import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'product'},
  {path: 'product', loadChildren: () => import('./controllers/product/product.module').then(m => m.ProductModule)},
  {path: 'shopping-cart', loadChildren: () => import('./controllers/shopping-cart/shopping-cart.module')
      .then(m => m.ShoppingCartModule) },
  {path: 'order', loadChildren: () => import('./controllers/order/order.module').then(m => m.OrderModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
