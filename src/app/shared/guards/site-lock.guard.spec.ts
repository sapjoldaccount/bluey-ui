import { TestBed } from '@angular/core/testing';

import { SiteLockGuard } from './site-lock.guard';

describe('CanActivateGuard', () => {
  let guard: SiteLockGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SiteLockGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
