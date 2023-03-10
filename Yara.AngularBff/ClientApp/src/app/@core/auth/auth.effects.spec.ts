import { Router } from '@angular/router';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { AuthApiActions } from '.';
import { AuthApiService } from './auth-api.service';
import { AuthEffects } from './auth.effects';
import { AuthState } from './auth.state';

const scheduler = new TestScheduler((actual, expected) => {
  actual.toEqual(expected);
});

describe('AuthEffects', () => {
  let authApiService: jasmine.SpyObj<AuthApiService>;
  let router: jasmine.SpyObj<Router>;
  let store: jasmine.SpyObj<Store<AuthState>>;
  // let dispatchSpy: jasmine.Spy;

  beforeEach(() => {
    authApiService = jasmine.createSpyObj('AuthApiService', ['getAuthModel']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    store = jasmine.createSpyObj('store', ['pipe']);
    // dispatchSpy = spyOn(store, 'dispatch');
  });

  describe('login', () => {
    it('should not dispatch any action', () => {
      const actions = new Actions(EMPTY);
      const effect = new AuthEffects(actions, authApiService, router, store);
      const metadata = getEffectsMetadata(effect);

      expect(metadata.login$?.dispatch).toEqual(false);
    });

    it('should navigate to login url via externalredirect', () => {
      scheduler.run((helpers) => {
        const { cold } = helpers;
        const loginAction = AuthApiActions.manualLogin();
        const source = cold('a', { a: loginAction });
        const actions = new Actions(source);
        const effect = new AuthEffects(actions, authApiService, router, store);

        effect.login$.subscribe(() => {
          expect(router.navigate).toHaveBeenCalled();
        });
      });
    });
  });

  describe('logout', () => {
    it('should not dispatch any action', () => {
      const actions = new Actions(EMPTY);
      const effect = new AuthEffects(actions, authApiService, router, store);
      const metadata = getEffectsMetadata(effect);

      expect(metadata.logout$?.dispatch).toEqual(false);
    });

    it('should navigate to logout url via externalredirect', () => {
      scheduler.run((helpers) => {
        store.pipe.and.returnValue(of('logouturl'));
        const { cold } = helpers;
        const logoutAction = AuthApiActions.manualLogout();
        const source = cold('a', { a: logoutAction });
        const actions = new Actions(source);
        const effect = new AuthEffects(actions, authApiService, router, store);

        effect.logout$.subscribe(() => {
          expect(router.navigate).toHaveBeenCalled();
        });
      });
    });
  });
});
