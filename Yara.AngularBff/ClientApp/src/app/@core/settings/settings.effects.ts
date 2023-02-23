import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { merge, of } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';
import { actionSettingsChangeTheme } from './settings.actions';
import { selectEffectiveTheme } from './settings.selectors';
import { State } from './settings.state';

export const SETTINGS_KEY = 'SETTINGS';

const INIT = of('yara-init-effect-trigger');

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private overlayContainer: OverlayContainer
  ) {}

  updateTheme = createEffect(
    () =>
      merge(INIT, this.actions$.pipe(ofType(actionSettingsChangeTheme))).pipe(
        withLatestFrom(this.store.pipe(select(selectEffectiveTheme))),
        tap(([action, effectiveTheme]) => {
          const classList =
            this.overlayContainer.getContainerElement().classList;
          const toRemove = Array.from(classList).filter((item: string) =>
            item.includes('-theme')
          );
          if (toRemove.length) {
            classList.remove(...toRemove);
          }
          classList.add(effectiveTheme);
        })
      ),
    { dispatch: false }
  );
}
