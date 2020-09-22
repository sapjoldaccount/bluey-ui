import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  showAddedToCart(): void {
    this.toastr.success('Added item to cart', 'Success!');
  }
}
