import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  constructor() {
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
