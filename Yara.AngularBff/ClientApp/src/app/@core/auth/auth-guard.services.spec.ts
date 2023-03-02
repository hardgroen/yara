import { TestBed } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  let authGuardService: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardService],
    });
    authGuardService = TestBed.inject<AuthGuardService>(AuthGuardService);
  });

  it('should be created', () => {
    expect(authGuardService).toBeTruthy();
  });

  it('should return isAuthenticated from authState', () => {
    authGuardService.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBe(true);
    });
  });
});
