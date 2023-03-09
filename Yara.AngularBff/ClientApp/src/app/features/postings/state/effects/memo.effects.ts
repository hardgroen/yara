import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, of, exhaustMap } from 'rxjs';
import { PostingsApiService } from '../../services/postings-api.service';
import { MemoApiActions, MemoPageActions } from '../actions';

@Injectable()
export class MemoEffects {
  constructor(
    private _actions$: Actions,
    private _postingsApiService: PostingsApiService
  ) {}

  loadMemos$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(MemoPageActions.loadMemos),
      exhaustMap(() =>
        this._postingsApiService.getRecentMemos().pipe(
          map((memos) => MemoApiActions.loadMemosSuccess({ memos })),
          catchError((error) => of(MemoApiActions.loadMemosFailure({ error })))
        )
      )
    );
  });
}
