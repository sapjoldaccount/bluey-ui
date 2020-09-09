import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from 'src/app/shared/services/responsive/responsive.service';
import { ScreenSize } from 'src/app/shared/enums/screen-size.enum';

@Component({
  selector: 'app-landing-top-video',
  templateUrl: './landing-top-video.component.html',
  styleUrls: ['./landing-top-video.component.scss']
})
export class LandingTopVideoComponent implements OnInit {

  screenSize$ = this.responsiveService.screenSize$;
  screenSizes = ScreenSize;

  constructor(private responsiveService: ResponsiveService) { }

  ngOnInit(): void {
  }

}
