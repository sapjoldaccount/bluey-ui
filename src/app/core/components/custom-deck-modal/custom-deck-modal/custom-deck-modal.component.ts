import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { ColorEvent } from 'ngx-color';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { COLOR_ROWS } from 'src/app/core/consts/colors.consts';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';

@Component({
  selector: 'app-custom-deck-modal',
  templateUrl: './custom-deck-modal.component.html',
  styleUrls: ['./custom-deck-modal.component.scss'],
})
export class CustomDeckModalComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  /*                                 FORM SETUP                                 */
  /* -------------------------------------------------------------------------- */
  deckTitle = new FormControl('', [Validators.required]);
  deckDescr = new FormControl('');

  customDeckForm: FormGroup = new FormGroup({
    deckTitle: this.deckTitle,
    deckDescr: this.deckDescr,
  });

  viewingSummary = new BehaviorSubject<boolean>(false);
  viewingSummary$ = this.viewingSummary.asObservable();

  colorRows = COLOR_ROWS;

  selectedColors = [];

  getDeckNamErrorMsg(): string {
    if (this.deckTitle.hasError('required')) {
      return 'You must enter a name for your deck';
    }
  }

  constructor(
    public modalRef: MDBModalRef,
    private spinnerService: SpinnerService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  handleActionButton(): void {
    this.spinnerService.updateSpinnerStatus('loadingSummary');
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.viewingSummary.next(true);
    }, 500);
  }

  onBack(): void {
    this.viewingSummary.next(false);
  }

  /**
   * Handle toggling colors
   * @param event - contains color item and js event
   */
  handleChange(event): void {
    const target =
      event.$event.target ||
      event.$event.srcElement ||
      event.$event.currentTarget;
    if (this.selectedColors.includes(event.color.hex)) {
      target.style['box-shadow'] = `${event.color.hex} 0px 0px 0px 14px inset`;
      this.selectedColors = this.selectedColors.filter(
        (c) => c !== event.color.hex
      );
    } else {
      this.selectedColors.push(event.color.hex);
      target.style[
        'box-shadow'
      ] = `${event.color.hex}  0px 0px 0px 3px inset, ${event.color.hex}  0px 0px 5px`;
    }

    console.log(this.selectedColors);
  }
}
