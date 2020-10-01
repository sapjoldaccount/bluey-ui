import { Injectable, OnDestroy } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { ScreenSize } from '../../enums/screen-size.enum';
import { LogService } from '../log/log.service';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService implements OnDestroy {
  private screenSize = new BehaviorSubject<string>('');
  public screenSize$ = this.screenSize.asObservable();

  /* Small/XSmall */
  public isSmall$ = this.screenSize$.pipe(
    map((size) => size.includes('Small'))
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
        this.log.logDebug(`Current screen size: ${this.screenSize.value}`);
      });
  }
}
