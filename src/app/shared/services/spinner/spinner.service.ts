import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

/* -------------------------------------------------------------------------- */
/*                           LOADING SPINNER SERVICE                          */
/* -------------------------------------------------------------------------- */
export class SpinnerService {
  spinnerAction = new BehaviorSubject<string>(null);
  spinnerAction$ = this.spinnerAction.asObservable();

  constructor() {}

  /**
   * Update text shown when spinner is fired
   * @param spinnerAction - text to show
   */
  updateSpinnerStatus(spinnerAction: string): void {
    this.spinnerAction.next(spinnerAction);
  }
}
