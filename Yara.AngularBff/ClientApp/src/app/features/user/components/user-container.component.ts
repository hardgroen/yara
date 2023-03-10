import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppState } from '@app/@core';
import { Claim } from '@app/@core/auth/auth.model';
import {
  selectClaims,
  selectIsAuthenticated,
} from '@app/@core/auth/auth.selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserContainerComponent {
  public isAuthenticated$: Observable<boolean>;
  public claims$: Observable<Claim[]>;

  constructor(private _store: Store<AppState>) {
    this.isAuthenticated$ = this._store.pipe(select(selectIsAuthenticated));
    this.claims$ = this._store.pipe(select(selectClaims));
  }
}
