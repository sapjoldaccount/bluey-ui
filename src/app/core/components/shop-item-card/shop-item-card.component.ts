import { Component, Input, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShopItem } from '../../models/Product';
import { CartService } from '../../services/cart/cart.service';
import { ProductDetailModalComponent } from '../product-detail-modal/product-detail-modal.component';

@Component({
  selector: 'app-shop-item-card',
  templateUrl: './shop-item-card.component.html',
  styleUrls: ['./shop-item-card.component.scss'],
})
export class ShopItemCardComponent implements OnInit {
  /* ----------------------- Product information inputs ----------------------- */
  _title: string;
  get title(): string {
    return this._title;
  }
  @Input() set title(value: string) {
    this._title = value;
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

  @Input() price: string; // for now
  @Input() description: string;

  // TODO: put these in global config
  @Input() imageBaseUrl: string;
  @Input() imagePathUrl: string;

  imageSrc: string;

  isHoveringOverImage = new BehaviorSubject<boolean>(false);
  isHoveringOverImage$ = this.isHoveringOverImage.asObservable();

  isHoveringCartButton = new BehaviorSubject<boolean>(false);
  isHoveringCartButton$ = this.isHoveringCartButton.asObservable();

  isInCart = new BehaviorSubject(false);
  isInCart$ = this.isInCart.asObservable();

  modalRef: MDBModalRef;

  constructor(
    private cart: CartService,
    private spinner: NgxSpinnerService,
    private modalService: MDBModalService
  ) {}

  ngOnInit(): void {
    this.imageSrc = this.imageBaseUrl + this.imagePathUrl;
    this.cart.productsInCart$.subscribe((products) => {
      this.isInCart.next(this.cart.itemIsInCart(this.productObject, products));
    });
  }

  /* ---------------------------- Cart interaction ---------------------------- */
  onAddCartClick(product: ShopItem): void {
    this.isInCart.value
      ? this.cart.updateSpinnerStatus('removing')
      : this.cart.updateSpinnerStatus('adding');

    this.isInCart.value
      ? this.cart.removeShopItemFromCart(product.id)
      : this.cart.addShopItem(product);
  }

  mouseEnter(div: string) {
    switch (div) {
      case 'deck-img':
        this.isHoveringOverImage.next(true);
        break;
      case 'add-cart':
        this.isHoveringCartButton.next(true);
        break;
    }
  }

  mouseLeave(div: string) {
    switch (div) {
      case 'deck-img':
        this.isHoveringOverImage.next(false);
        break;
      case 'add-cart':
        this.isHoveringCartButton.next(false);
        break;
    }
  }

  openDetailModal() {
    const modalOptions = {
      data: {
        content: {
          title: this.title, // TODO pass data here
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
