import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  constructor(public modalRef: MDBModalRef) {}

  ngOnInit(): void {}
}
