import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@app/@shared';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UserContainerComponent } from './user-container.component';
import { UserSessionComponent } from './user-session/user-session.component';

describe('UserContainerComponent', () => {
  let component: UserContainerComponent;
  let fixture: ComponentFixture<UserContainerComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule],
      declarations: [UserContainerComponent, UserSessionComponent],
      providers: [provideMockStore()],
    });

    fixture = TestBed.createComponent(UserContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
