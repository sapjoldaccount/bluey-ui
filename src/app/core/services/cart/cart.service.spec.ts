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

  it('should add item',
    async(
      inject([CartService], (service: CartService) => {
        service.addCart({ prop: 'test' });
        service.carts$.subscribe(carts => expect(carts.length).toBe(1));
      })
    )
  );
});
