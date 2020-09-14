import { Component, Input, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {
    this.imageSrc = this.imageBaseUrl + this.imagePathUrl;
  }
}
