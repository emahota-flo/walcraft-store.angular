import {Injectable} from '@angular/core';
import {Order} from '../models/order';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {HttpHelperService} from './http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  clientId: string;

  constructor(private http: HttpClient,
              private httpHelper: HttpHelperService) {
    this.clientId = localStorage.getItem('clientId');
  }

  saveOrder(order: Order): Observable<Order> {
    order.clientId = this.clientId;
    const url = environment.apiUrl + '/api/orders';

    return this.http.post<Order>(url, order).pipe(
      map(response => {
        this.clientId = response.clientId;
        localStorage.setItem('clientId', response.clientId);
        return {...response};
      }),
      catchError(this.httpHelper.handlerError)
    );
  }

  getOrders(): Observable<Order[]> {
    const url = environment.apiUrl + '/api/orders/' + this.clientId;
    return this.http.get<Order[]>(url).pipe(
      catchError(this.httpHelper.handlerError)
    );
  }

}
