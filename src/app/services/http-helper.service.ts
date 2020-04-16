import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  constructor() {
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
  // TODO ????????
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
