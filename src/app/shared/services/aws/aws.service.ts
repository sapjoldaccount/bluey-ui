import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../error/error.service';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable({
  providedIn: 'root',
})

/* -------------------------------------------------------------------------- */
/*                                 AWS SERVICE                                */
/*                            HANDLES EMAIL SENDING                           */
/*                        TODO: HANDLE CDN STUFF HERE?                        */
/* -------------------------------------------------------------------------- */
export class AwsService {
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private spinnerService: SpinnerService,
    private errorService: ErrorService
  ) {}

  /**
   * Send email to blueyshop@gmail.com
   * @param data - user information
   */
  sendEmail(data: any): Observable<any> {
    const url = environment.awsUrl;

    this.spinnerService.updateSpinnerStatus('sendingEmail');
    this.spinner.show();

    return this.http
      .post<any>(url, JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        catchError(this.errorService.handleError),
        finalize(() => {
          this.spinner.hide();
        })
      );
  }
}
