import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthGuardService } from './auth-guard.service';
import { selectIsAuthenticated } from './auth.selectors';
import { AuthApiActions } from '.';

describe('AuthGuardService', () => {
  let authGuardService: AuthGuardService;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardService, provideMockStore()],
    });
    authGuardService = TestBed.inject(AuthGuardService);
    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(authGuardService).toBeTruthy();
  });

  it('should return true when user is authenticated', () => {
    store.overrideSelector(selectIsAuthenticated, true);
    authGuardService.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBe(true);
    });
  });

  it('should return false when user is not authenticated', () => {
    store.overrideSelector(selectIsAuthenticated, false);
    authGuardService.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBe(false);
    });
  });

  it('should dispatch auth guard login action when user is not authenticated', () => {
    dispatchSpy.calls.reset();
    store.overrideSelector(selectIsAuthenticated, false);
    authGuardService.canActivate().subscribe(() => {
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(AuthApiActions.authGuardlogin());
    });
  });
});
