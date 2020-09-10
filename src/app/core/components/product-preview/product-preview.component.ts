import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss']
})
export class ProductPreviewComponent implements OnInit {

  @Input() name: string;
  @Input() hoverText: string;
  @Input() image: string; // TODO: image input

  constructor() { }

  ngOnInit(): void {
  }

}
