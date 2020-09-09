import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from 'src/app/shared/services/responsive/responsive.service';

@Component({
  selector: 'app-landing-top-video',
  templateUrl: './landing-top-video.component.html',
  styleUrls: ['./landing-top-video.component.scss']
})
export class LandingTopVideoComponent implements OnInit {

  screenSize$ = this.responsiveService.screenSize$;

  constructor(private responsiveService: ResponsiveService) { }

  ngOnInit(): void {
  }

}
