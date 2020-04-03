import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';

const Key = '8c9a2-ad787-0615e-57271-3ec59-5fcb5';
const Secret = 'f5a56-881b3-5ad95-ac681-eaeb6-f2faf';

const httpHeaders = {
  headers: new HttpHeaders({
    Accept: 'application/json',
    Authorization: 'Basic ' + btoa(Key + ':' + Secret)
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  constructor() {
  }

  getHeaders() {
    return httpHeaders;
  }

  handlerError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('client-side or network error');
    } else {
      console.log(error.status + ' ' + error.message);
    }

    console.log(error);
    return throwError('');
  }
}
