import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-custom-deck-modal',
  templateUrl: './custom-deck-modal.component.html',
  styleUrls: ['./custom-deck-modal.component.scss'],
})
export class CustomDeckModalComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  /*                                 FORM SETUP                                 */
  /* -------------------------------------------------------------------------- */
  deckTitle = new FormControl('');
  deckDescr = new FormControl('');

  customDeckForm: FormGroup = new FormGroup({
    deckTitle: this.deckTitle,
    deckDescr: this.deckDescr,
  });

  /* --------------------------- FORM ERROR MESSAGES -------------------------- */
  /* --------------------------- TODO: MAKE DYNAMIC --------------------------- */

  test1 = ['#f44336', '#e91e63', '#9c27b0'];

  test2 = ['#673ab7', '#3f51b5', '#2196f3'];

  test3 = ['#03a9f4', '#00bcd4', '#009688'];

  test4 = ['#4caf50', '#8bc34a', '#cddc39'];

  test5 = ['#ffeb3b', '#ffc107', '#ff9800'];

  constructor(public modalRef: MDBModalRef) {}

  ngOnInit(): void {}

  handleChangeComplete(event) {}
}
