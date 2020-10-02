import { Component, HostListener, OnInit } from '@angular/core';
import { ResponsiveService } from 'src/app/shared/services/responsive/responsive.service';
import { ScreenSize } from 'src/app/shared/enums/screen-size.enum';
import { CDN_BASE_URL, CDN_VIDEO_PATH } from '../../consts/cdn.consts';

@Component({
  selector: 'app-landing-top-video',
  templateUrl: './landing-top-video.component.html',
  styleUrls: ['./landing-top-video.component.scss'],
})
export class LandingTopVideoComponent implements OnInit {
  screenSize$ = this.responsiveService.screenSize$;
  screenSizes = ScreenSize;

  videoUrl = `${CDN_BASE_URL}${CDN_VIDEO_PATH}`;
  videoUrlMobile = `${CDN_BASE_URL}/mp4/skateboard_loop.mp4`;

  constructor(private responsiveService: ResponsiveService) {}

  /**
   * Document scroll listener
   * Used for shifting the opacity to black on scroll down of landing page
   * TODO: Make a directive for this
   */
  @HostListener('document:scroll', ['$event'])
  onScroll(event): void {
    const yPixelOffset = window.pageYOffset;
    document.getElementById('top').style.opacity = (
      0 +
      yPixelOffset / window.innerHeight
    ).toString();
  }

  ngOnInit(): void {}
}
