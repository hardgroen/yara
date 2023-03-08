import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Memo } from '../../services/models/memo';
import { PostingsApiService } from '../../services/postings-api.service';
import { MemoPageActions } from '../../state/actions';
import { State } from '../../state/postings.state';
import { getMemos } from '../../state/selectors/memo.selectors';

@Component({
  selector: 'app-memo-list',
  templateUrl: './memo-list.component.html',
  styleUrls: ['./memo-list.component.scss'],
})
export class MemoListComponent implements OnInit {
  memos$: Observable<Memo[]>;
  isLoading = false;

  constructor(private _store: Store<State>) {
    this.memos$ = this._store.select(getMemos);
  }

  ngOnInit() {
    this._store.dispatch(MemoPageActions.loadMemos());
  }
}
