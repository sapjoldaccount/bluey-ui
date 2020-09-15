import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-shop-item-card',
  templateUrl: './shop-item-card.component.html',
  styleUrls: ['./shop-item-card.component.scss'],
})
export class ShopItemCardComponent implements OnInit {
  @Input() title: string;
  @Input() price: string; // for now
  @Input() description: string;

  @Input() imageBaseUrl: string;
  @Input() imagePathUrl: string;

  imageSrc: string;

  isHoveringOverImage = new BehaviorSubject<boolean>(false);
  isHoveringOverImage$ = this.isHoveringOverImage.asObservable();

  constructor() {}

  ngOnInit(): void {
    this.imageSrc = this.imageBaseUrl + this.imagePathUrl;
  }

  mouseEnter(div: string) {
    console.log('mouse enter : ' + div);
    this.isHoveringOverImage.next(true);
  }

  mouseLeave(div: string) {
    console.log('mouse leave :' + div);
    this.isHoveringOverImage.next(false);
  }
}
