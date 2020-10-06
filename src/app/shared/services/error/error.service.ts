import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  public handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error.message || 'server error.');
  }
}
