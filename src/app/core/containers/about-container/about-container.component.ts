import { Component, OnInit } from '@angular/core';
import { CDN_BASE_URL } from '../../consts/cdn.consts';

@Component({
  templateUrl: './about-container.component.html',
  styleUrls: ['./about-container.component.scss'],
})
export class AboutContainerComponent implements OnInit {
  cdnBaseUrl = CDN_BASE_URL;

  constructor() {}

  ngOnInit(): void {}
}
