import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShopItem } from '../../models/Product';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-shop-item-card',
  templateUrl: './shop-item-card.component.html',
  styleUrls: ['./shop-item-card.component.scss'],
})
export class ShopItemCardComponent implements OnInit {
  @Input() productObject: ShopItem;

  @Input() title: string;
  @Input() price: string; // for now
  @Input() description: string;
  @Input() id: number;

  @Input() imageBaseUrl: string;
  @Input() imagePathUrl: string;

  imageSrc: string;

  isHoveringOverImage = new BehaviorSubject<boolean>(false);
  isHoveringOverImage$ = this.isHoveringOverImage.asObservable();

  isInCart = new BehaviorSubject(false);
  isInCart$ = this.isInCart.asObservable();

  constructor(private cart: CartService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.imageSrc = this.imageBaseUrl + this.imagePathUrl;
    this.cart.productsInCart$.subscribe((p) => {
      this.isInCart.next(p.map((p2) => p2.id)?.includes(this.id));
    });
  }

  /* ---------------------------- Cart interaction ---------------------------- */
  onAddCartClick(product: ShopItem): void {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.cart.addShopItem(product);
      location.reload();
    }, 1000);
  }

  mouseEnter(div: string) {
    this.isHoveringOverImage.next(true);
  }

  mouseLeave(div: string) {
    this.isHoveringOverImage.next(false);
  }
}
