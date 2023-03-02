import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthApiService, Session } from '@app/@core/auth/auth-api.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserContainerComponent {
  public session$: Observable<Session>;
  public isAuthenticated$ = this._authApiService.getIsAuthenticated();
  public isAnonymous$ = this._authApiService.getIsAnonymous();

  constructor(private _authApiService: AuthApiService) {
    // this.isAuthenticated$ = this._authApiService.getIsAuthenticated();
    // this.isAnonymous$ = this._authApiService.getIsAnonymous();
    this.session$ = this._authApiService.getSession();
  }
}
