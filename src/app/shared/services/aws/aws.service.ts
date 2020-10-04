import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { LogService } from '../log/log.service';

@Injectable({
  providedIn: 'root',
})
export class AwsService {
  // TODO: put in env service
  awsUrl =
    'https://aa02894q8a.execute-api.us-east-1.amazonaws.com/contact/submit';

  constructor(
    private http: HttpClient,
    private log: LogService,
    private cart: CartService,
    private spinner: NgxSpinnerService
  ) {}

  /**
   * Send email to blueyshop@gmail.com
   * @param data - user information
   */
  sendEmail(data: any): Observable<any> {
    const url = this.awsUrl;
    this.cart.updateSpinnerStatus('sendingEmail');
    this.spinner.show();
    return this.http
      .post<any>(url, JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        catchError((err) => {
          this.log.logError('sending email', 'sendEmail()');
          return of(null);
        }),
        tap((resp) => {}),
        finalize(() => {
          this.spinner.hide();

          // TODO: toast
        })
      );
  }
}
