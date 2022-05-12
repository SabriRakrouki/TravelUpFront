import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripFrontComponent } from './trip-front.component';

describe('TripFrontComponent', () => {
  let component: TripFrontComponent;
  let fixture: ComponentFixture<TripFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripFrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
