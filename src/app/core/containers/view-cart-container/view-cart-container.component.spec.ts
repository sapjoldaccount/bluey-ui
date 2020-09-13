import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCartContainerComponent } from './view-cart-container.component';

describe('ViewCartContainerComponent', () => {
  let component: ViewCartContainerComponent;
  let fixture: ComponentFixture<ViewCartContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCartContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCartContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
