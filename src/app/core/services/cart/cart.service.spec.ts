import { TestBed, inject, async } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created',
    inject([CartService], (service: CartService) => {
      expect(service).toBeTruthy();
    })
  );
});
