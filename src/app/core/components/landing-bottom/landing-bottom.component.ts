import { Component, OnInit } from '@angular/core';
import { CDN_BASE_URL } from '../../consts/cdn.consts';

@Component({
  selector: 'app-landing-bottom',
  templateUrl: './landing-bottom.component.html',
  styleUrls: ['./landing-bottom.component.scss'],
})
export class LandingBottomComponent implements OnInit {
  cdnBaseUrl = CDN_BASE_URL;

  constructor() {}

  ngOnInit(): void {}
}
