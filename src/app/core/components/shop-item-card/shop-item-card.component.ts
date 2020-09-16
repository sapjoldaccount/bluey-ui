import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
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

  constructor(private spinner: NgxSpinnerService, private cart: CartService) {}

  ngOnInit(): void {
    this.imageSrc = this.imageBaseUrl + this.imagePathUrl;
    console.log(this.imageSrc);
  }

  /* ---------------------------- Cart interaction ---------------------------- */
  onAddCartClick(product: ShopItem): void {
    console.log(product);
    this.cart.addShopItem(product);
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 700);
  }

  mouseEnter(div: string) {
    this.isHoveringOverImage.next(true);
  }

  mouseLeave(div: string) {
    this.isHoveringOverImage.next(false);
  }
}
