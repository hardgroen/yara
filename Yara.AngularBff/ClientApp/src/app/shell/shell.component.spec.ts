import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthApiService } from '@app/@core/auth/auth-api.service';
import { SharedModule } from '@app/@shared';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HeaderComponent } from './header/header.component';
import { ShellComponent } from './shell.component';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;
  let store: MockStore;
  let authApiService: jasmine.SpyObj<AuthApiService>;

  beforeEach(() => {
    const mockedAuthApiService = jasmine.createSpyObj('AuthApiSevice', [
      'getLogoutUrl',
      'getUsername',
      'getIsAuthenticated',
      'getIsAnonymous',
    ]);
    TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule, RouterTestingModule],
      declarations: [ShellComponent, HeaderComponent],
      providers: [
        provideMockStore(),
        { provide: AuthApiService, useValue: mockedAuthApiService },
      ],
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
