import { Injectable, OnDestroy } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { ScreenSize } from '../../enums/screen-size.enum';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService implements OnDestroy {
  private screenSize = new BehaviorSubject<string>('');
  public screenSize$ = this.screenSize.asObservable();

  /* Small/XSmall */
  public isSmall$ = this.screenSize$.pipe(
    map((size) => size.includes('Small')),
    tap((x) => console.log(x))
  );

  private ngUnsub = new Subject();

  constructor(private bpObserver: BreakpointObserver) {}

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
        console.log(this.screenSize.value);
      });
  }
}
