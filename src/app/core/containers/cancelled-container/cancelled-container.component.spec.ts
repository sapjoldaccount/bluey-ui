import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledContainerComponent } from './cancelled-container.component';

describe('CancelledContainerComponent', () => {
  let component: CancelledContainerComponent;
  let fixture: ComponentFixture<CancelledContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelledContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
