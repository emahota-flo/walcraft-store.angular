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
    const url = environment.apiUrl + '/api/order';
    const body = JSON.stringify(order);
    const headers = this.httpHelper.getHeaders();

    return this.http.post<Order>(url, body, headers).pipe(
      map(response => {
        this.clientId = response.clientId;
        localStorage.setItem('clientId', response.clientId);
        return {...response};
      }),
      catchError(this.httpHelper.handlerError)
    );
  }

  getOrder(): Observable<Order[]> {
    const url = environment.apiUrl + '/api/order/' + this.clientId;
    const headers = this.httpHelper.getHeaders();
    return this.http.get<Order[]>(url, headers).pipe(
      catchError(this.httpHelper.handlerError)
    );
  }

}
