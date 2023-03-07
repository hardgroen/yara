import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  let authGuardService: AuthGuardService;
  let authApiService: jasmine.SpyObj<AuthApiService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const mockedAuthApiService = jasmine.createSpyObj('AuthApiService', [
      'getIsAuthenticated',
    ]);
    const mockedRouter = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        AuthGuardService,
        { provide: AuthApiService, useValue: mockedAuthApiService },
        { provide: Router, useValue: mockedRouter },
      ],
    });
    authGuardService = TestBed.inject(AuthGuardService);
    authApiService = TestBed.inject(
      AuthApiService
    ) as jasmine.SpyObj<AuthApiService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(authGuardService).toBeTruthy();
  });

  it('should return true when user is authenticated', () => {
    authApiService.getIsAuthenticated.and.returnValue(of(true));
    authGuardService.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBe(true);
    });
  });
  it('should return false when user is not authenticated', () => {
    authApiService.getIsAuthenticated.and.returnValue(of(false));
    authGuardService.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBe(false);
    });
  });
  it('should have called router.navigate when user is not authenticated', () => {
    authApiService.getIsAuthenticated.and.returnValue(of(false));
    authGuardService.canActivate().subscribe(() => {
      expect(router.navigate).toHaveBeenCalled();
    });
  });
});
