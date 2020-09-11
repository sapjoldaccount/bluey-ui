import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  private activeRoute = new BehaviorSubject<string>(null);
  public activeRoute$ = this.activeRoute.asObservable();

  constructor(private router: Router) {
  }

  detectActiveRoute() {
    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd), distinctUntilChanged()).subscribe(activeRoute => {
      this.activeRoute.next(activeRoute.url);
    });
  }
}