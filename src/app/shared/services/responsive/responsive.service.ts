import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Orientation, ScreenSize } from '../../enums/screen-size.enum';
import { LogService } from '../log/log.service';

@Injectable({
  providedIn: 'root',
})
/* -------------------------------------------------------------------------- */
/*                             RESPONSIVE SERVICE                             */
/* -------------------------------------------------------------------------- */
export class ResponsiveService implements OnDestroy {
  private screenSize = new BehaviorSubject<string>('');
  public screenSize$ = this.screenSize.asObservable();

  private orientation = new BehaviorSubject<string>('');
  public orientation$ = this.orientation.asObservable();

  public showMobileLayout$ = combineLatest(
    this.orientation$,
    this.screenSize$
  ).pipe(
    map(([ori, screenSize]) => {
      if (
        ori === Orientation.Landscape &&
        (screenSize === ScreenSize.Small || screenSize === ScreenSize.XSmall)
      ) {
        return true;
      }

      if (screenSize === ScreenSize.XSmall) {
        return true;
      }

      return false;
    })
  );

  private ngUnsub = new Subject();

  constructor(
    private bpObserver: BreakpointObserver,
    private log: LogService
  ) {}

  ngOnDestroy(): void {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }

  /**
   * Sets orientation observable based on window size
   * @param width - window width
   * @param height - window height
   */
  setOrientation(width: number, height: number): void {
    if (width < height) {
      this.orientation.next(Orientation.Portrait);
    } else {
      this.orientation.next(Orientation.Landscape);
    }
  }

  detectScreenSizeChange(): void {
    this.bpObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.ngUnsub))
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints[Breakpoints.XSmall]) {
          this.screenSize.next(ScreenSize.XSmall);
        }
        if (state.breakpoints[Breakpoints.Small]) {
          this.screenSize.next(ScreenSize.Small);
        }
        if (state.breakpoints[Breakpoints.Medium]) {
          this.screenSize.next(ScreenSize.Medium);
        }
        if (state.breakpoints[Breakpoints.Large]) {
          this.screenSize.next(ScreenSize.Large);
        }
        if (state.breakpoints[Breakpoints.XLarge]) {
          this.screenSize.next(ScreenSize.XLarge);
        }
        // this.log.logDebug(`Current screen size: ${this.screenSize.value}`);
      });
  }
}
