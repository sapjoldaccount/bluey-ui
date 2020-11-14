import { Component, HostListener, OnInit } from '@angular/core';
import { Orientation, ScreenSize } from 'src/app/shared/enums/screen-size.enum';
import { ResponsiveService } from 'src/app/shared/services/responsive/responsive.service';
import { environment } from 'src/environments/environment';
import { CDN_VIDEO_PATH } from '../../consts/cdn.consts';

@Component({
  selector: 'app-landing-top-video',
  templateUrl: './landing-top-video.component.html',
  styleUrls: ['./landing-top-video.component.scss'],
})

/* -------------------------------------------------------------------------- */
/*                              LANDING TOP VIDEO                             */
/* -------------------------------------------------------------------------- */
/*                         LANDING PAGE WITH VIDEO BG                         */
/* -------------------------------------------------------------------------- */
export class LandingTopVideoComponent implements OnInit {
  screenSize$ = this.responsiveService.screenSize$;
  screenSizes = ScreenSize;

  orientation$ = this.responsiveService.orientation$;
  orientations = Orientation;

  showMobileLayout$ = this.responsiveService.showMobileLayout$;

  /**
   * TODO: Flesh out this whole component
   */
  videoUrl = `${environment.cdnBaseUrl}${CDN_VIDEO_PATH}`;
  deckBgMobile = `${environment.cdnBaseUrl}/decks/mobile_bg.png`;

  constructor(private responsiveService: ResponsiveService) {}

  /**
   * Document scroll listener
   * Used for shifting the opacity to black on scroll down of landing page
   */
  @HostListener('document:scroll', ['$event'])
  onScroll(event): void {
    if (!document.getElementById('top')) return;
    const yPixelOffset = window.pageYOffset;
    document.getElementById('top').style.opacity = (
      0 +
      yPixelOffset / window.innerHeight
    ).toString();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.responsiveService.setOrientation(
      event.target.innerWidth,
      event.target.innerHeight
    );
  }

  ngOnInit(): void {}
}
