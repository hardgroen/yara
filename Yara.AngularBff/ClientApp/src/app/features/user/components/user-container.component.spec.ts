import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthApiService } from '@app/@core/auth/auth-api.service';
import { SharedModule } from '@app/@shared';

import { UserContainerComponent } from './user-container.component';

describe('UserContainerComponent', () => {
  let component: UserContainerComponent;
  let fixture: ComponentFixture<UserContainerComponent>;
  let authApiService: jasmine.SpyObj<AuthApiService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule],
      declarations: [UserContainerComponent],
      providers: [
        {
          provide: AuthApiService,
          useValue: jasmine.createSpyObj('AuthApiService', [
            'getSession',
            'getIsAuthenticated',
            'getIsAnonymous',
          ]),
        },
      ],
    });

    authApiService = TestBed.inject(
      AuthApiService
    ) as jasmine.SpyObj<AuthApiService>;
    fixture = TestBed.createComponent(UserContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
