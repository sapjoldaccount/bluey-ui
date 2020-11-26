import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FirestoreService } from 'src/app/shared/services/firestore/firestore.service';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';
import { ShopItem } from '../../models/ShopItem';
import { CartService } from '../../services/cart/cart.service';
import { CustomDeckModalComponent } from '../custom-deck-modal/custom-deck-modal/custom-deck-modal.component';
import { ProductDetailModalComponent } from '../product-detail-modal/product-detail-modal.component';

@Component({
  selector: 'app-shop-item-card',
  templateUrl: './shop-item-card.component.html',
  styleUrls: ['./shop-item-card.component.scss'],
})

/* -------------------------------------------------------------------------- */
/*                               SHOP ITEM CARD                               */
/* -------------------------------------------------------------------------- */
/*                             SHOWN ON SHOP PAGE                             */
/* -------------------------------------------------------------------------- */
export class ShopItemCardComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  /*                             PRODUCT INFO INPUTS                            */
  /* -------------------------------------------------------------------------- */

  // Personalized deck
  isSpecial: boolean;

  // Product title
  // tslint:disable-next-line: variable-name
  _title: string;
  get title(): string {
    return this._title;
  }
  @Input() set title(value: string) {
    this._title = value;
  }

  // Product itself
  _productObject: ShopItem;
  get productObject(): ShopItem {
    return this._productObject;
  }
  @Input() set productObject(value: ShopItem) {
    this.isSpecial = value.id === 999;
    this._productObject = value;
  }

  // Product id
  _id: number;
  get id(): number {
    return this._id;
  }
  @Input() set id(value: number) {
    this._id = value;
  }

  @Input() price: string;
  @Input() description: string;
  @Input() actionButtonText: string;
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

  ngUnsub = new Subject();

  customDeckRemainingCount$ = this.firestoreService.customDeckRemainingCount;

  constructor(
    private cart: CartService,
    private spinner: NgxSpinnerService,
    private spinnerService: SpinnerService,
    private modalService: MDBModalService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit(): void {
    this.imageSrc = this.imageBaseUrl + this.imagePathUrl;
    this.cart.productsInCart$
      .pipe(takeUntil(this.ngUnsub))
      .subscribe((products) => {
        this.isInCart.next(
          this.cart.itemIsInCart(this.productObject, products)
        );
      });
  }

  ngOnDestroy(): void {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }

  /* -------------------------------------------------------------------------- */
  /*                              SHOP ITEM ACTIONS                             */
  /* -------------------------------------------------------------------------- */
  actionButtonHandler(event, product: ShopItem): void {
    if (this.isSpecial) {
      this.openDetailModal();
    } else {
      this.isInCart.value
        ? this.cart.removeShopItemFromCart(product.id)
        : this.cart.addShopItem(product);
    }
  }

  mouseEnter(div: string): void {
    switch (div) {
      case 'deck-img':
        this.isHoveringOverImage.next(true);
        break;
      case 'add-cart':
        this.isHoveringCartButton.next(true);
        break;
    }
  }

  mouseLeave(div: string): void {
    switch (div) {
      case 'deck-img':
        this.isHoveringOverImage.next(false);
        break;
      case 'add-cart':
        this.isHoveringCartButton.next(false);
        break;
    }
  }

  /**
   * Open slideshow modal component
   */
  openDetailModal(): void {
    if (this.isSpecial) {
      this.modalRef = this.modalService.show(CustomDeckModalComponent);
    } else {
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
}
