import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})

/* -------------------------------------------------------------------------- */
/*                                ALERT POPUPS                                */
/* -------------------------------------------------------------------------- */
export class ToastService {
  constructor(private toastr: ToastrService) {}

  showSuccess(text: string): void {
    this.toastr.success(text, 'Success!', {
      timeOut: 5000,
    });
  }

  showError(text: string): void {
    this.toastr.error(text, 'Error', {
      timeOut: 5000,
    });
  }
}
