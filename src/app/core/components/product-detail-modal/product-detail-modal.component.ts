import { Component, Input, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { CDN_BASE_URL } from '../../consts/cdn.consts';

@Component({
  selector: 'app-product-detail-modal',
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.scss'],
})
export class ProductDetailModalComponent implements OnInit {
  cdnBaseUrl = CDN_BASE_URL;

  content: {
    title: string;
    id: number;
  };

  constructor(public modalRef: MDBModalRef) {}

  ngOnInit(): void {}
}
