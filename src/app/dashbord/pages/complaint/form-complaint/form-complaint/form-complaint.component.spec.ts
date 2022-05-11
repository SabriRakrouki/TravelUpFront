import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComplaintComponent } from './form-complaint.component';

describe('FormComplaintComponent', () => {
  let component: FormComplaintComponent;
  let fixture: ComponentFixture<FormComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComplaintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
