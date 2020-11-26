import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDeckModalComponent } from './custom-deck-modal.component';

describe('CustomDeckModalComponent', () => {
  let component: CustomDeckModalComponent;
  let fixture: ComponentFixture<CustomDeckModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDeckModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDeckModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
