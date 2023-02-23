import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthApiService, Session } from '@app/@core/auth/auth-api.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserContainerComponent {
  public session$: Observable<Session | null>;
  public isAuthenticated$: Observable<boolean> = of(false);
  public isAnonymous$: Observable<boolean>;

  constructor(private _authApiService: AuthApiService) {
    this.session$ = this._authApiService.getSession();
    this.isAuthenticated$ = this._authApiService.getIsAuthenticated();
    this.isAnonymous$ = this._authApiService.getIsAnonymous();
  }
}
