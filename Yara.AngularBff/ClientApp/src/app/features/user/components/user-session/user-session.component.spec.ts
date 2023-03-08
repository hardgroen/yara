import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSessionComponent } from './user-session.component';

describe('UserSessionComponent', () => {
  let component: UserSessionComponent;
  let fixture: ComponentFixture<UserSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSessionComponent],
    });

    fixture = TestBed.createComponent(UserSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
