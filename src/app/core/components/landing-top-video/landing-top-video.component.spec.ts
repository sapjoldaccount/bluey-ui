import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingTopVideoComponent } from './landing-top-video.component';

describe('LandingTopVideoComponent', () => {
  let component: LandingTopVideoComponent;
  let fixture: ComponentFixture<LandingTopVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingTopVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingTopVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
