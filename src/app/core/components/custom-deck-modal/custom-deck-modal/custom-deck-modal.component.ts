import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { ColorEvent } from 'ngx-color';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import {
  COLOR_HEX_TO_NAME_DICT,
  COLOR_ROWS,
} from 'src/app/core/consts/colors.consts';
import { ShopItem } from 'src/app/core/models/ShopItem';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { FirestoreService } from 'src/app/shared/services/firestore/firestore.service';
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

  customDeckItem$ = this.firestoreService.customDeckItem;

  colorRows = COLOR_ROWS;

  selectedColors = [];

  // TODO: INPUT PRODUCT

  getDeckNamErrorMsg(): string {
    if (this.deckTitle.hasError('required')) {
      return 'You must enter a name for your deck';
    }
  }

  constructor(
    public modalRef: MDBModalRef,
    private spinnerService: SpinnerService,
    private spinner: NgxSpinnerService,
    private cart: CartService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit(): void {}

  handleActionButton(customDeck: ShopItem): void {
    if (!this.viewingSummary.value) {
      this.spinnerService.updateSpinnerStatus('loadingSummary');
      this.spinner.show();

      setTimeout(() => {
        this.spinner.hide();
        this.viewingSummary.next(true);
      }, 500);
    } else {
      // TOOD: Build product item, pass in from HTML observable and adjust details
      // make extended class for additional info
      // pass to stripe to have data for success url call
      customDeck.title = this.deckTitle?.value?.toUpperCase();

      const colorsForDescr = this.selectedColors.map(
        (c) => COLOR_HEX_TO_NAME_DICT[c?.toUpperCase()]
      );

      customDeck.description = colorsForDescr.join(', ');

      this.cart.addShopItem(customDeck);
      this.modalRef.hide();
    }
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

    const color = event.color.hex;

    // Already selected
    if (this.selectedColors.includes(color)) {
      target.style['box-shadow'] = `${color} 0px 0px 0px 14px inset`;
      this.selectedColors = this.selectedColors.filter((c) => c !== color);

      // Mark as selected
    } else {
      this.selectedColors.push(color);
      target.style[
        'box-shadow'
      ] = `${color}  0px 0px 0px 3px inset, ${color}  0px 0px 5px`;
    }

    console.log(this.selectedColors);
  }
}
