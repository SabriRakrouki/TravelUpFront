import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUSerComponent } from './profile-user.component';

describe('ProfileUSerComponent', () => {
  let component: ProfileUSerComponent;
  let fixture: ComponentFixture<ProfileUSerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUSerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
