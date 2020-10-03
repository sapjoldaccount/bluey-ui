import { Component, Input, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ShopItem } from '../../models/Product';
import { ProductDetailModalComponent } from '../product-detail-modal/product-detail-modal.component';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss'],
})
export class ProductPreviewComponent implements OnInit {
  _name: string;
  get name(): string {
    return this._name;
  }
  @Input() set name(value: string) {
    this._name = value;
  }

  _productObject: ShopItem;
  get productObject(): ShopItem {
    return this._productObject;
  }
  @Input() set productObject(value: ShopItem) {
    this._productObject = value;
  }

  _id: number;
  get id(): number {
    return this._id;
  }
  @Input() set id(value: number) {
    this._id = value;
  }

  @Input() imgSrc: string;

  modalRef: MDBModalRef;

  constructor(private modalService: MDBModalService) {}

  ngOnInit(): void {}

  openItem(): void {
    const modalOptions = {
      data: {
        content: {
          title: this.name,
          id: this.id,
          productObject: this.productObject,
        },
      },
    };

    this.modalRef = this.modalService.show(
      ProductDetailModalComponent,
      modalOptions
    );
  }
}
