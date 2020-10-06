import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './about-container.component.html',
  styleUrls: ['./about-container.component.scss'],
})

/* -------------------------------------------------------------------------- */
/*                                ABOUT US PAGE                               */
/* -------------------------------------------------------------------------- */
export class AboutContainerComponent implements OnInit {
  cdnBaseUrl = environment.cdnBaseUrl;

  constructor() {}

  ngOnInit(): void {}
}
